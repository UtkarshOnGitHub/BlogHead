import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useDisclosure,
  Box,
  Avatar,
  Badge,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { deleteComment, getDetails, showblogById, showComments } from "../api/Allapi";
import  io  from "socket.io-client"
import {MdDelete} from "react-icons/md"
import {AiFillLike , AiFillDislike} from "react-icons/ai"



const socket = io.connect("http://localhost:8080")


function Comment({ modal, setModal ,comments , id , refreshState , emailAdmin}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text , setText] = useState("");
  const [email ,setEmail] = useState("")

  const token = localStorage.getItem("token")
  useEffect(()=>{
    getDetails(token).then((res)=>{
        console.log(res)
        setEmail(res.data.email)
    })
  },[])

  console.log(emailAdmin)
  let tokenId = localStorage.getItem("token");
  const arrDate = new Date().toString().split(" ")
  const date = `${arrDate[2]}/${arrDate[1]}/${arrDate[3]}`
  const handleComment =()=>{
    socket.emit("comment" , {comment:text ,date:date, blogId:id , userId:tokenId})
    setTimeout(()=>{
        refreshState();
    },100)
  }

  const handleDelete=(id)=>{
    console.log(id)
    deleteComment(id).then((res)=>{
      console.log(res)
      refreshState()
    })
  }


  console.log(comments)
  
  
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={modal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments Section</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setModal(false);
            }}
          />
          <ModalBody>
            <Box>
                <Input placeholder="Write Your Comment.."  onChange={(e)=>{setText(e.target.value)}}/>
            </Box>
            <Text fontWeight="bold" mb="1rem">
              Comments:
            </Text>
              {comments.length===0 ? <Text as="em">No Comments Yet! ...</Text> : comments.map((e) => {
                return <Box key={e.id} marginTop={"20px"}>
                        <Flex>
                            <Avatar src="https://bit.ly/sage-adebayo" />
                            <Box ml="3">
                                <Text fontWeight="bold">{e.comment}</Text>
                                <Text fontSize="15px">{e.user.name}  __ {e.date}</Text>
                            </Box>
                            <Flex marginLeft={"30px"} gap={"30PX"}>
                                {e.user.email=== email || emailAdmin === email ? <Box fontSize="25px" onClick={()=>{handleDelete(e._id)}} cursor="pointer"><MdDelete/></Box> : null}
                                <Box fontSize="25px"><AiFillLike/></Box>
                                <Box fontSize="25px"><AiFillDislike/></Box>
                            </Flex>
                        </Flex>
                    </Box> 
              })}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleComment}
            >
              Post Comment
            </Button>
            <Button variant="ghost" onClick={() => {
                setModal(false);
              }}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Comment;
