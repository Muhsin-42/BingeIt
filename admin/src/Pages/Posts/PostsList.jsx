import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PostSingleCard from "../../components/PostSingleCard/PostSingleCard";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect } from "react";
import axios from "../../utils/axios";
import TablePagination from "@mui/material/TablePagination";
function PostsList() {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [index, setIndex] = useState(0);

  const getAllPosts = async () => {
    axios
      .get("api/post/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setPosts({ posts: response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  //

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);
  //

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="postMain p-5">
          <span className="fs-1 text-secondary">POSTS</span>
          <TableContainer component={Paper} className="table shadow p-3">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">No</TableCell>
                  <TableCell className="tableCell">Username</TableCell>
                  <TableCell className="tableCell">Content</TableCell>
                  <TableCell className="tableCell">Image</TableCell>
                  <TableCell className="tableCell">action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts
                  ?.filter((post) => !post.isDelete)
                  .map((post, i) => (
                    <PostSingleCard post={post} index={i} />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default PostsList;
