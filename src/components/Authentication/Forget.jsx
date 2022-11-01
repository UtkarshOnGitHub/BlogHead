
import React from "react"
import { Field, Form, Formik } from 'formik';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { forgetPass } from "../api/Allapi";
import { Navigate, useNavigate } from "react-router-dom";

function Forget() {
    const navigate = useNavigate()
    const [email ,setEmail] = useState("");
    const handleSubmit =()=>{
        forgetPass(email).then((res)=>{
            console.log(res)
        })
        navigate("/reset")
    }
    return (
      <Formik
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Text fontSize="3xl" marginTop={"50px"}>Forget Your Password</Text>
                <FormControl w="70%" margin="auto" marginTop={"10px"} >
                  <FormLabel>Enter Your Email</FormLabel>
                  <Input  placeholder='xyz@gmail.com' value ={email} onChange={(e)=>(setEmail(e.target.value))}/>
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    )
  }

  export default Forget