import "./table.scss";
import Swal from 'sweetalert2'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { getUsers ,searchUser} from "../../utils/Constants";
import Button from '@mui/material/Button';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector ,useDispatch} from "react-redux";
import { setAllUsers} from '../../Redux/store';
import SingleRow from "./SingleRow";


const List = () => {
  // const allUsers = useSelector(state => state.allUsers);
  const [users, setUsers] = useState([]);
  const dispatch=useDispatch()
  const [state, setState] = useState([]);
  const [block, setBlock] = useState(false)

  const searchBy = (e) => {
    let key = e.target.value;
    if (!key) {
      getUsersList();
    } else {
      axios
        .get(`${searchUser}/${key}`)
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const navigate = useNavigate();


  useEffect((key) => {
    getUsersList();
  }, [block]);

  const getUsersList = () => {
    axios
      .get(getUsers)
      .then((response) => {
        setUsers(response.data);
        dispatch(setAllUsers({ allUsers: response.data }))
      })
      .catch((error) => {
        console.log("inside catch");
        console.log(error);
      });
  };
 
  
  const blockUser = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to block this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block User!'
    }).then(async (result) => {

      try{
        const response = await axios.patch(`api/admin/blockUser/${id}`)
        
        console.log('3hjeheh')
        console.log(response);
        if (response.status===200 && result.isConfirmed) {
          Swal.fire(
            'Blocked!',
            'The user has been Blocked',
            'success'
          )
        }else{
          Swal.fire(
            'Failed',
            'Failed to Block the user',
            'error'
          )
        }

      }catch(error){
        console.log('blockUser error => ',error);
      }
    })
    };
  
    const unblockUser = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to unBlock this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unBlock User!'
      }).then(async (result) => {
  
        try{
          const response = await axios.patch(`api/admin/unblockUser/${id}`)
          
          if (response.status===200 && result.isConfirmed) {
            Swal.fire(
              'unBlocked!',
              'The user has been unBlocked',
              'success'
            )
          }else{
            Swal.fire(
              'Failed',
              'Failed to unBlock the user',
              'error'
            )
          }
  
        }catch(error){
          console.log('blockUser error => ',error);
        }
      })
    };
  



  return (
    <div className="tablemain">
    <div className="search shadow-lg">
          <input type="text" name="query" placeholder="Search..." onChange={searchBy}/>
          <SearchOutlinedIcon  />
    </div>
    <TableContainer component={Paper} className="table shadow">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell className="tableCell">No</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email ID</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <SingleRow user={user} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default List;
