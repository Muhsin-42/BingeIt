import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material';
import Add from '@mui/icons-material/Add';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDropzone } from "react-dropzone";
import axios from '../../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from '../../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { setPosts } from '../../Redux/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4} from 'uuid'


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
});

const AddPost = () => {
    const [open, setOpen] = useState(false);
    const [image, setImgae] = useState(false);
    const [files, setFiles] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    // const [posts, setPosts] = useState([])
    const dispatch = useDispatch();
    const [imageUpload, setImageUpload] = useState(null);
    const notifyMinimun = () => toast.warn("Caption should be atleast 10 characters.", {
        position: toast.POSITION.TOP_RIGHT
    });
    const notifySuccess = () => toast.success("Post added successfully", {
        position: toast.POSITION.TOP_RIGHT
    });



    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        multiple: false,
        onDrop: acceptedFiles => {
            setImgae(false)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const user = useSelector(state => state.user);



    // ********************
      
  const handleSubmitMe = (event) => {

    if(postContent.trim().length<5){
        notifyMinimun();
        return;
    }
    
    if(!files[0]){
        uploadPost('');
        return;
    }
    
    setLoading(true);
    const file = files[0];
    setImageUpload(prev=> file);
  };

    useEffect(() => {
        if (imageUpload) {
            const fileExtension = files[0].type.split('/').pop(); 
            const uploadImageName = `${v4()}.${fileExtension}`;

            const imageRef = ref(storage, `posts/${uploadImageName}`)
            uploadBytes(imageRef, imageUpload).then((response) => {
                getDownloadURL(imageRef).then((url) => {
                    uploadPost(url);
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            })
        }
    }, [imageUpload]);




    const uploadPost = async (uploadImageName) => {
        console.log('url => ',uploadImageName)
        try {
            const result = await axios.post(`api/post/post/${currentUser._id}`, { data: uploadImageName, content: postContent }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(' ss post ',result.data)
            notifySuccess();
            dispatch(setPosts({ posts: [result.data, ...posts] }));
            
            setLoading(false);
            setOpen(false);
            setFiles([]);
            setPostContent("");
        } catch (error) {
        }
    }
    // ********************


    return (
        <>
         <ToastContainer autoClose={1300} />
            <Tooltip onClick={e => setOpen(true)} title="Addpost" sx={{ position: "fixed",  bottom: 20, right: { xs: "calc(50% - 25px)", md: 30 } }}>
                <Fab color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open} onClose={e => { setOpen(false); setFiles([]) }} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Box width={400} height={image || files[0] ? 450 : 320} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>

                    <Typography variant="h6" color="gray" textAlign="center"> Create Post </Typography>
                    
                    <UserBox>
                        <Avatar src={currentUser?.profilePicture} sx={{ width: 30, height: 30 }} />
                        <Typography fontFamily={500} variant="span">{user?.username}</Typography>
                    </UserBox>

                    <TextField onChange={(e) => setPostContent(e.target.value)} sx={{ width: "100%" }} id="standard-multiline-static" multiline rows={3} variant="standard" placeholder="Write your caption!  (Note : post related to movies only)"  />
                    {
                        !files[0] &&
                        <Box {...getRootProps({ className: 'dropzone' })}
                            sx={{
                                ...(image === false && { display: "none" }),
                                ...(image === true && { display: "flex" }),
                            }}>

                            <input {...getInputProps()} />

                            <Box
                                border={"2px dashed "}
                                sx={{ padding: "3rem", marginTop: "1rem", textAlign: "center", "&:hover": { cursor: "pointer" } }}>
                                <p>Add Picture Here</p>
                            </Box>

                        </Box>
                    }

                    {
                        files[0] &&
                        <Box>
                            <img src={files[0]?.preview} alt='' style={{  width: "10rem",  height: "10rem",  objectFit: "cover" }}
                                onLoad={() => { URL.revokeObjectURL(files[0]?.preview) }} />
                        </Box>
                    }
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <ImageIcon onClick={e => setImgae(!image)} color="secondary" />
                    </Stack>
                    <LoadingButton size="small" fullWidth onClick={handleSubmitMe} loading={loading} variant="contained" style={{ backgroundColor:'black', padding: '5px'}} >
                        <span className='font-weight-bold'>Post</span>
                    </LoadingButton>
                </Box>
            </StyledModal>
        </>
    );
};

export default AddPost

