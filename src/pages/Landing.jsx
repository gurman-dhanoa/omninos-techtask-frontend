import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../store/userActions'
import { updatePosts } from '../store/postsSlice'
import LoadingPage from './LoadingPage'
import PostCard from '../components/PostCard'

const Landing = () => {
  const posts = useSelector((state) => state.posts.posts)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsData = await dispatch(fetchPosts());
        const posts = postsData?.payload?.data;
        if (posts) {
          dispatch(updatePosts({ posts }));
        }
      } catch (error) {
        console.error("Error fetching posts data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      {(loading && !posts)?<LoadingPage />:<Box w={"90dvw"} my={10} mx={"auto"}><Text fontFamily={"Outfit"} fontSize={"xl"} my={4}>Recommended Posts</Text><Flex align={"center"} justify={"center"} gap={10} wrap={"wrap"}>
        {
        !posts
          ? <Text fontFamily={"Outfit"}>No Posts Available!!!</Text>
          : posts.map((post) => { return <PostCard post={post} /> })
      }</Flex></Box>}
    </>
  )
}

export default Landing