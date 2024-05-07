import { Avatar, Box, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostDetails, likePost, userLikeStatus } from '../store/userActions'
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from './LoadingPage'
import { AiFillLike, AiFillDislike, AiFillEye } from "react-icons/ai";

const PostDetails = () => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const toast = useToast()
  const { postId } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const postsData = await dispatch(fetchPostDetails({ postId: postId }));
      const post = postsData?.payload?.data;
      if (post) {
        setPost(post);
      } else {
        toast({
          description: 'Error occured while fetching data',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
    setLoading(false);
  };

  const [userPostLikeValue, setUserPostLikeValue] = useState(null)
  const userPostLikeStatus = async () => {
    try {
      const response = await dispatch(userLikeStatus({ postId: postId }));
      const result = response?.payload?.data?.status;
      setUserPostLikeValue(result);
      console.log(userPostLikeValue)
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (user) {
      userPostLikeStatus();
    }
  }, [dispatch, postId, toast]);

  const likeHandler = async (data) => {
    if(!user){
      toast({
        description:`Please Login to  ${data.likeStatus?"like":"dislike"} post`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      data.postId = postId;
      const response = await dispatch(likePost(data));
      const result = response?.payload?.data;
      if (result) { fetchData(); userPostLikeStatus() }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  return (
    loading
      ? <LoadingPage />
      : !post
        ? <Text>Post Details Not Available</Text>
        : <Flex w={"80dvw"} mx={"auto"} my={10} flexDir={"column"} align={"flex-start"} fontFamily={"Outfit"} gap={5}>
          <Text fontWeight={600} fontSize={"xl"}>{post.title}</Text>
          <Box maxW={"700px"}>
            <video controls >
              <source src={post.video} />
            </video>
            <Flex align={"center"} justify={"space-between"}>
              <Flex align={"flex-start"} gap={3} p={"8px"}>
                <Avatar src={post.owner?.avatar} name={post.owner.fullName} />
                <Flex flexDir={"column"} gap={"4px"}>
                  <Flex flexDir={"column"}>
                    <Text color={"#7D7979"} className='courseCardFont' >{post.owner.fullName}</Text>
                    <Text color={"#7D7979"} className='courseCardFont' >{post.owner.username}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align={"center"} gap={4}>
                <Flex align={"center"} gap={1}>
                  {(user && userPostLikeValue === true) ? <AiFillLike color='blue' onClick={()=>{likeHandler({"likeStatus":null})}}/>:<AiFillLike onClick={()=>{likeHandler({"likeStatus":true})}}/>}
                  <Text className='courseCardFont courseCardPrice'>{post.likes}</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  {(user && userPostLikeValue === false)? <AiFillDislike color='blue' onClick={()=>{likeHandler({"likeStatus":null})}}/>:<AiFillDislike onClick={()=>{likeHandler({"likeStatus":false})}}/>}
                  <Text className='courseCardFont courseCardPrice'>{post.dislikes}</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <AiFillEye />
                  <Text className='courseCardFont courseCardPrice'>{post.views}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Text>{post.description}</Text>
        </Flex>
  )
}

export default PostDetails