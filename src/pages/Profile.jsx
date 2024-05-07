import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { fetchUserPosts, getUser } from '../store/userActions';
import { login, logout } from '../store/authSlice';
import { updatePosts } from '../store/postsSlice';
import LoadingPage from './LoadingPage';
import PostCard from './../components/PostCard'

const Profile = () => {
    const user = useSelector((state) => state.auth.userData);
    const posts = useSelector((state) => state.posts.posts)
    const [loadingPost, setLoadingPost] = useState(false)
    const dispatch = useDispatch()
    const fetchData = async () => {
        try {
            const userData = await dispatch(getUser());
            const user = userData?.payload?.data;
            if (user) {
                dispatch(login({ user }));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchPosts = async () => {
        setLoadingPost(true);
        try {
            const postsData = await dispatch(fetchUserPosts());
            const posts = postsData?.payload?.data;
            if (posts) {
                dispatch(updatePosts({ posts }));
            }
        } catch (error) {
            console.error("Error fetching posts data:", error);
        }
        setLoadingPost(false);
    };

    useEffect(() => {
        fetchData();
        fetchPosts();
    }, [dispatch]);

    return (
        !user ? <LoadingPage /> : <Flex flexDir={"column"} w={"70%"} mx={"auto"} my={7} wrap={"wrap"} fontFamily={"Outfit"}>
            {user?.coverImage && <Image src={user.coverImage} alt={`${user.fullName}`} w={"100%"} h={"250px"} fit={"cover"} borderRadius={8} />}
            <Flex flexDir={"column"} pos={"relative"} w={"90%"} mx={"auto"} bottom={"50px"}>
                <Flex justify={"space-between"} align={"flex-start"} mx={"auto"} w={"100%"}>
                    <Image src={user?.avatar} alt={`${user.fullName}`} boxSize={"180px"} fit={"cover"} borderRadius={"100%"} border={"4px solid white"} />
                    <Flex gap={3} mt={"60px"} textTransform={"capitalize"}>
                    </Flex>
                </Flex>
                <Box textTransform={"capitalize"} fontFamily={'"Inter",sans-serif'}>
                    <Text fontWeight={600} fontSize={"2xl"}>{`${user.fullName}`}</Text>
                    <Text fontWeight={400} color={"gray"} fontSize={"xl"}>{user.username}</Text>
                </Box>
            </Flex>
            <Text fontSize={"2xl"} fontWeight={600} mb={4} textAlign={"center"}>Your Posts</Text>
            {loadingPost ? <LoadingPage /> : <Flex align={"center"} justify={"center"} gap={10}>{
                !posts
                    ? <Text fontFamily={"Outfit"}>No Posts Available!!!</Text>
                    : posts.map((post) => { return <PostCard post={post} /> })
            }</Flex>}
        </Flex>

    )
}

export default Profile