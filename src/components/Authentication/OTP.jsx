import React, { useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    PinInput,
    PinInputField,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
import { resetPass } from "../api/Allapi";
import { useNavigate } from "react-router-dom";
  
export default function OTP(){
    const [pin , setPin] = useState(0)
    const [formData , setFormData] = useState({})
    const navigate = useNavigate()
    const handleChange =(e)=>{
        const { name, value, type } = e.target;
        const val = type == "number" ? Number(value) : value;
        setFormData({ ...formData, [name]: val,otp:pin });
    }
    console.log(formData)
    const handleSubmit=()=>{
        resetPass(formData).then((res)=>{
            let data = res.data
            if(data == "Invalid OTP"){
                alert("Invalid OTP")
            }else{
                alert("Password Has Been Updated")
                navigate("/login")
            }
        })
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Reset new password
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Enter Your OTP</FormLabel>
            <HStack w="80%" m="auto">
                <PinInput type="alphanumeric" mask onChange={(e)=>(setPin(e))}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Enter Your Email To Confirm</FormLabel>
            <Input type="email" placeholder="xyz@gmail.com" name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Enter Your New Password</FormLabel>
            <Input type="password" name="newPass" value={formData.newPass} onChange={handleChange}/>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }

