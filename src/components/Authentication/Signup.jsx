import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { SignupApi } from "../api/Allapi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type == "number" ? Number(value) : value;
    setFormData({ ...formData, [name]: val });
  };
  console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      SignupApi(formData)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          navigate("/login")
        }else{
          alert("Inavlid Credentials")
        }
      })
    }catch(e){
      alert("Invalid Credential")
        console.log(e)
    }

  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Enter Your Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="age">
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select placeholder="Select Your Role" name="role" value ={formData.role} onChange={handleChange}>
                  <option value="Writer">Writer</option>
                  <option value="Explorer">Explorer</option>
                </Select>
              </FormControl>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
