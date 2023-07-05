import Swal from 'sweetalert2'
import { TableCell, TableRow, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../utils/axios';
import { setPosts } from '../../Redux/store';

function PostSingleCard({ post, index }) {

  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  const getAllPosts = () => {
    axios.get('api/post/posts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
        dispatch(setPosts({ posts: response.data }))
    })
    .catch((error) => {
      console.log(error);
    });
  };


  const deletePost = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete the post!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`api/post/post/${post._id}`,
            {
              adminRequest: true,
              headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${token}`
              }
            })

          getAllPosts();
          if (response.status === 200) {
            Swal.fire(
              'Deleted',
              'The Post is deleted',
              'success'
            )
          } else {
            Swal.fire(
              'Failed',
              'Failed to delete the post',
              'error'
            )
          }

        } catch (error) {
          console.log('blockUser error => ', error);
        }
      }
    })
  }


  return (
    <>
      <TableRow key={index + 1}>
        <TableCell className="tableCell">{index + 1}</TableCell>
        <TableCell className="tableCell">{post.author.username}</TableCell>
        <TableCell className="tableCell">{post.content}</TableCell>
        <TableCell className="tableCell">
          {
            post.image !== '' ? <img height={'50px'} widget={'50px'} src={post.image} alt="" />
              : 'No Image'
          }
        </TableCell>
        <TableCell align="left">
          {
            <Button
              className="btn btn-outline-danger"
              onClick={deletePost}  variant="outlined"  color="error"
            >DELETE</Button>
          }
        </TableCell>
      </TableRow>
    </>
  )
}

export default PostSingleCard