import React from "react";
import {
  Box,
  Input,
  Text,
  Textarea,
  Button
} from '@chakra-ui/react'

import { useState } from "react";
import { findblogs, updateblog, writeblogs } from "../api/Allapi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";


function UpdateBlog() {
    const redirect = useNavigate();
    const {id} = useParams();
    console.log(id)
  const token  = localStorage.getItem("token")
  const [title , setTitle] = useState("");
  const [content , setContent] = useState("")
  const handleUpload =()=>{
    let data ={
      title:title,
      content:content
    }
    updateblog(data,id).then((res)=>{
      console.log(res)
    }).then(res=>{
        redirect('/blogs')
    })
  }
  useEffect(()=>{
    findblogs(id).then((res)=>{
        console.log(res)
        setTitle(res.data.title)
        setContent(res.data.content)
    })
  },[])
  console.log(title)
  return (
    <Box w="60%" m="auto">
      <Text fontSize="4xl">Update Your Blog</Text>
      <Input placeholder="Add Your Title Here..."
       marginTop={"20px"} 
      textAlign="center"
      value={title} 
      onChange={(e)=>{setTitle(e.target.value)}}></Input>
      <Textarea placeholder='Write Your Blog Here ...' marginTop={"20px"} value={content} onChange={(e)=>{setContent(e.target.value)}}/>
      <Button onClick={handleUpload}>Update</Button>
    </Box>
  )
}

export default UpdateBlog;
