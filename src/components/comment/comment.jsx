import React, { useEffect, useState } from 'react'
import {Input ,Button , Box , Text} from '@chakra-ui/react';
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080")
const Comment = () => {
    const [text , setText] = useState("")
    const [data1 , setData] = useState([])
    const sendComment =()=>{
        socket.emit("send_message" , {message:text})
    }

    useEffect(()=>{
        socket.on("receive_messgae" , (data)=>{
            setData([...data1 , data.message])
        })
    },[socket])

    console.log(data1)

  return (
    <div>
        <Box>
            {data1.map((e)=>{
                return(
                    <Text>{e}</Text>
                )
            })}
        </Box>
        <Input placeholder='Message...' w="50%" value={text} onChange={(e)=>{setText(e.target.value)}}></Input>
        <Button onClick={sendComment} >Comment</Button>
    </div>
  )
}

export default Comment
