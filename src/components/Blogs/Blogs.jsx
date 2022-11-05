import React, { useRef } from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  Container,
  VStack,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import { deleteBlog, getDetails, showblogById, showblogs, showComments, updateblog } from '../api/Allapi';
import { useState } from 'react';
import { useEffect } from 'react';
import {BsPlusCircle} from "react-icons/bs"
import { Navigate, useNavigate } from 'react-router-dom';
import Comment from './Comment';




const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};



export const BlogAuthor = (props) => {


  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Blogs = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [data , setData] = useState([]);
  const [email,setEmail] = useState("")
  const [modal , setModal] = useState(false)
  const [comments, setComments] = useState([]);
  const [id , setId] = useState("")
  const [state , setState] = useState(false)
  const [tosend , setTosend] = useState("")
  useEffect(()=>{
    showblogs().then((res)=>{
      setData(res.data.data)
    })
    getDetails(token).then((res)=>{
      setEmail(res.data.email)
    }) 
  },[state])


  const addBlog=()=>{

    navigate("/writeblog")

  }

  const handleModal =(id)=>{
    showComments(id).then((res)=>{
        setComments(res.data)
    })
    showblogById(id).then((res)=>{
      console.log(res)
      setTosend(res.data.user.email)
    })
    setModal(true)
    setId(id)
  }


  const refreshState =()=>{
    showComments(id).then((res)=>{
      setComments(res.data)
    })
  }

  const handleDeleteBlog =(id)=>{
    deleteBlog(id).then((res)=>{
      console.log(res)
      setState(!state)
    })
  }
  

  return (
    <>
    <Container maxW={'7xl'} p="12">
      <Box m="auto" display="flex"justifyContent="center">
        <BsPlusCircle  fontSize="130px" cursor={"pointer"} onClick={addBlog}/>
      </Box>
      <Text fontSize={"3xl"}>Write Your Blog...</Text>
      <Divider marginTop="10" />
      {/* <SimpleGrid columns={3} spacing={10}> */}
      <Wrap spacing="30px" marginTop="5" columnGap={"10px"}>
      {data.map((e)=>{
        return(
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={`https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80`}
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <BlogTags tags={['New', 'Trending']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  {e.title}
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2" overflow={"hidden"} h="250px">
                  {e.content}
              </Text>
              <BlogAuthor marginTop="10px"
                name={e.user.name}
                date={new Date()}
              />
              <ButtonGroup marginTop={"10px"}>
              {e.user.email === email ?<Button onClick={()=>navigate(`/updateblog/${e._id}`)}>Edit</Button>: ""}
              <Button onClick={()=>{handleModal(e._id)}}>Comment</Button>
              {e.user.email === email ? <Button onClick={()=>{handleDeleteBlog(e._id)}}>Delete</Button> : ""}
              </ButtonGroup>
            </Box> 
          </WrapItem>
        )
      })}
      </Wrap>
      {/* </SimpleGrid> */}

      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
    <Comment modal={modal} setModal={setModal} comments={comments} id={id} refreshState={refreshState} emailAdmin={tosend}/>
    </>
  );
};

export default Blogs;