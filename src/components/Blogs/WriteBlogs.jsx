import React from "react";
import {
  Box,
  Input,
  Text,
  Textarea,
  Button,
  Toast,
  useToast
} from '@chakra-ui/react'

import { useState } from "react";
import { writeblogs } from "../api/Allapi";
import { Navigate, useNavigate } from "react-router-dom";
function WriteBlogs() {
  const token  = localStorage.getItem("token")
  const [title , setTitle] = useState("");
  const [content , setContent] = useState("")
  const [image ,setImage] = useState("")
  const navigate = useNavigate()
  const toast = useToast()
  const handleUpload =()=>{
    let data ={
      title:title,
      image:image,
      content:content
    }
    writeblogs(data,token).then((res)=>{
      console.log(res)
      toast({
        title: 'Blog created.',
        description: "Blog Created Successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate("/blogs")
    }).catch((err)=>{
      if(err.response.data==="You Are Not Authorized"){
        toast({
          title: 'You Are Not Authorized.',
          description: "Blog Not Created! Change Your Role To Writer",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        navigate("/blogs")
      }else{
        toast({
          title: 'Something Went Wrong',
          description: "Error",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }
  console.log(image)
  return (
    <Box w="60%" m="auto">
      <Text fontSize="4xl">Write Your Blog</Text>
      <Input placeholder="Add Your Title Here..."
       marginTop={"20px"} 
      textAlign="center"
      value={title} 
      h={"50px"}
      onChange={(e)=>{setTitle(e.target.value)}}></Input>
      <Textarea placeholder='Write Your Blog Here ...' h="400px" marginTop={"20px"} value={content} onChange={(e)=>{setContent(e.target.value)}}/>
      <Input type="file" onChange={(e)=>{setImage(e.target.value)}}/>
      <Button onClick={handleUpload} marginTop={"20px"} marginBottom={"20px"}>Upload</Button>
    </Box>
  )
}

export default WriteBlogs;
