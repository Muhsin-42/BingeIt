import React, { useEffect, useState } from 'react'
import { setPosts } from '../../Redux/store'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import PostCard from './PostCard';

function Posts() {

    const dispatch = useDispatch();
    const postsRedux = useSelector(state => state.posts)
    const token = useSelector(state => state.token)

    const getAllPosts = async () =>{
        try{
            const response = await axios.get('api/post/posts',{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" :  `Bearer ${token}`
                }
            });
            dispatch(setPosts({posts:response.data}));
        }catch(error){
            console.log('getAllPosts Error => ',error);
        }
    }

    useEffect(()=>{
        getAllPosts();
    },[])

  return (
    <div className='postsMain'> 
        {
            postsRedux?.map((post)=>{
                return (
                    !post.isDelete && <PostCard getAllPosts={getAllPosts}  key={post._id} post={post}/>
                )
            })
        }
    </div>
  )
}

export default Posts