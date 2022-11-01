import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Center,
  Link,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { LoginApi } from "../api/Allapi";
import {useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const toast = useToast()
  const handleChange =(e)=>{
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    LoginApi(form).then((e) => {
      if(e.data.token){
        localStorage.setItem("token",e.data.token)
        navigate("/blogs")
        toast({
          title: 'Login Successfull',
          description: "Welcome Back",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }else{
        toast({
          title: 'Wrong Credential',
          description: "Try Login Again.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
      
    });
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        marginTop={"-100px"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            LogIn
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
          <Link href="/forget" color={"blue.400"}>
            Forgot password?
          </Link>
            <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
              {/* Github */}
              <a href="https://github.com/login/oauth/authorize?client_id=0881f934d6c4884a60e4">
                <Button colorScheme={"facebook"} leftIcon={<FaGithub />}>
                  <Center>
                    <Text>Continue with GitHub</Text>
                  </Center>
                </Button>
              </a>

              {/* Google */}
              <a href="http://localhost:8080/auth/google?client_id=424848718490-3namg0mu2sha1947e1oidunj982rsur1.apps.googleusercontent.com">
                <Button variant={"outline"} leftIcon={<FcGoogle />}>
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </a>
            </Stack>
        </Stack>
      </Flex>
    </>
  );
}
