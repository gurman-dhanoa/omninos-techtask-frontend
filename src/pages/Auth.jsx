import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { login, logout } from '../store/authSlice';
import { userLogin, userRegister } from '../store/userActions';
import { useForm } from 'react-hook-form';

const Auth = () => {
  const [loginState, setloginState] = useState(true)
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [show, setShow] = React.useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  const {
    handleSubmit,
    register,
  } = useForm();

  const handleClick = () => setShow(!show)

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === 'avatar') {
      setAvatar(file);
    } else if (type === 'coverImage') {
      setCoverImage(file);
    }
  };

  const loginHandler = async (data) => {
    setLoading(true);
    try {
      const userData = await dispatch(userLogin(data));
      const user = userData?.payload?.data?.user;
      if (user) {
        dispatch(login({ user }));
        toast({
          title: `Welcome, ${user.fullName}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  const registerHandler = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('username', data.username);
      formData.append('password', data.password);
      formData.append('fullName', data.fullName);
      formData.append('avatar', avatar);
      formData.append('coverImage', coverImage);
      const userData = await dispatch(userRegister(formData));
      const user = userData?.payload?.data;
      if (user) {
        dispatch(login({ user }));
        toast({
          title: `Welcome, ${user.fullName}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } else {
        dispatch(logout());
        toast({
          description: 'Kindly join the website',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  return (
    <Box fontFamily={"Outfit"} px={8} pt={2} py={8} borderRadius={5} mx={"auto"} maxW={"500px"} my={5} boxShadow={"rgba(0, 0, 0, 0.1) 0px 10px 50px"}>
      <Heading as={"h4"} mb={6} display={"block"} textAlign={"center"}>{loginState ? "Login" : "Register"}</Heading>
      <form onSubmit={handleSubmit(loginState ? loginHandler : registerHandler)}>
        <Flex flexDir={"column"} gap={5}>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type='email' {...register("email")} />
          </FormControl>
          {!loginState && <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input type='text' {...register("fullName")} />
          </FormControl>}
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text' {...register("username")} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                {...register("password")}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {!loginState &&
            <>
              <FormControl isRequired>
                <FormLabel>Avatar</FormLabel>
                <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} />
              </FormControl>
              {avatar && <Image src={URL.createObjectURL(avatar)} />}
              <FormControl isRequired>
                <FormLabel>Cover Image</FormLabel>
                <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'coverImage')} />
              </FormControl>
              {coverImage && <Image src={URL.createObjectURL(coverImage)} />}
            </>
          }
          <Button bg={"#6610f2"} color={"white"} fontWeight={300} isDisabled={loading} type='submit'>Submit</Button>
          {loginState
            ? <Text align={"center"}>Don't have account? <span style={{ cursor: "pointer", color: "#6610f2" }} onClick={() => { setloginState(false) }}>Sign Up</span></Text>
            : <Text align={"center"}>Already have account? <span style={{ cursor: "pointer", color: "#6610f2" }} onClick={() => { setloginState(true) }}>Login</span></Text>
          }
        </Flex>
      </form>

    </Box>
  )
}

export default Auth