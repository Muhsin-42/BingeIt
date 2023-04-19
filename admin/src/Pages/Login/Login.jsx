import { useState } from "react";
import axios from "../../utils/axios";
import { Link,useNavigate } from "react-router-dom";
import styles from './styles.module.scss'
import { loginPost } from "../../utils/Constants";
import { setLogin } from "../../Redux/store";
import { useDispatch } from "react-redux";

const Login = () => {
	const [datas, setDatas] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const handleChange = ({ currentTarget: input }) => {
		setDatas({ ...datas, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = loginPost;
			const { data } = await axios.post(url, datas);
			dispatch(setLogin({admin: data.admin, token: data.token}))
			navigate('/')
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>LOGIN TO ADMIN!</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={datas.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={datas.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Login
						</button>
					</form>
					
				</div>
				<div className={styles.right}>
					<h1 >Binge!</h1>
					
				</div >
			</div>
		</div>
	);
};

export default Login;
