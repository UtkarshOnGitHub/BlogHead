import React from "react";
import {
  Box,
  Input,
  Text,
  Textarea,
  Button
} from '@chakra-ui/react'

import { useState } from "react";
import { writeblogs } from "../api/Allapi";
function WriteBlogs() {
  const token  = localStorage.getItem("token")
  const [title , setTitle] = useState("");
  const [content , setContent] = useState("")
  const handleUpload =()=>{
    let data ={
      title:title,
      content:content
    }
    writeblogs(data,token).then((res)=>{
      console.log(res)
    })
  }
  return (
    <Box w="60%" m="auto">
      <Text fontSize="4xl">Write Your Blog</Text>
      <Input placeholder="Add Your Title Here..."
       marginTop={"20px"} 
      textAlign="center"
      value={title} 
      onChange={(e)=>{setTitle(e.target.value)}}></Input>
      <Textarea placeholder='Write Your Blog Here ...' marginTop={"20px"} value={content} onChange={(e)=>{setContent(e.target.value)}}/>
      <Button onClick={handleUpload}>Upload</Button>
    </Box>
  )
}

export default WriteBlogs;
