import { Avatar, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react'
import Logo from "./../images/logo.png"
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/userActions'
import {logout} from "./../store/authSlice"
import CreatePost from './CreatePost'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  
  return (
    <Flex justify={"space-between"} py={2} px={5} bg={"#6610f2"} align={"center"}>
      <Link to={"/"}><Image src={Logo} alt="Omninos Technologies" h={"40px"} /></Link>
      {!authStatus && <Link to={"/auth"}><Text fontFamily={"Outfit"} fontWeight={600} color={"white"} fontSize={"lg"} border={"2px solid white"} px={3} py={1} borderRadius={"50px"}>Join</Text></Link>}
      {authStatus && <UserMenu/>}
    </Flex>
  )
}

export default Header

const UserMenu = () => {
  const user = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch();
  const toast = useToast()
  const logoutHandler = async() => {
    try {
      const userData = await dispatch(logoutUser());
      const user = userData?.payload?.data?.success;
      if (user) {
        dispatch(logout());
        toast({
          description: `Logout successfully`,
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  return (
    <Menu>
      <MenuButton>
        <Avatar src={user?.avatar} name={user?.fullName} />
      </MenuButton>
      
      <MenuList>
        <Link to={"/profile"}><MenuItem>Profile</MenuItem></Link>
        <CreatePost/>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}