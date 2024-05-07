import React, { useState } from 'react'
import { Avatar, Flex, Image, Text } from '@chakra-ui/react'
import { AiFillLike, AiFillDislike, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const truncateTitle = (text, length) => {
        if (text.length <= length) {
            return text;
        } else {
            return text.substring(0, length) + '...';
        }
    };
    return (
        <Link to={`/post/${post._id}`}>
            <Flex flexDir={"column"} alignItems={"flex-start"} maxW={"95vw"} w={"365px"} overflow={"hidden"} style={{ borderRadius: "20px", background: "#FFF", boxShadow: "5px 4px 4px 0px rgba(0, 0, 0, 0.25)" }} transition={"transform 0.3s"} _hover={{ transform: "scale(1.04)" }} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Image src={post?.thumbnail} alt={post.title} w={"100%"} h={"200px"} />
                <Flex alignItems={"flex-start"} gap={3} p={"8px"}>
                    <Avatar src={post.owner?.avatar} name={post.owner.fullName} />
                    <Flex flexDir={"column"} gap={"4px"}>
                        <Flex flexDir={"column"}>
                            <Text flex={"1 0 0"} className='courseCardFont'>{isHovered ? post.title : truncateTitle(post.title, 32)}</Text>
                            <Text color={"#7D7979"} className='courseCardFont' >{post.owner.username}</Text>
                        </Flex>
                        <Flex align={"center"} justify={"space-between"}>
                            <Flex align={"center"} gap={1}>
                                <AiFillLike />
                                <Text className='courseCardFont courseCardPrice'>{post.likes}</Text>
                            </Flex>
                            <Flex align={"center"} gap={1}>
                                <AiFillDislike />
                                <Text className='courseCardFont courseCardPrice'>{post.dislikes}</Text>
                            </Flex>
                            <Flex align={"center"} gap={1}>
                                <AiFillEye />
                                <Text className='courseCardFont courseCardPrice'>{post.views}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}

export default PostCard