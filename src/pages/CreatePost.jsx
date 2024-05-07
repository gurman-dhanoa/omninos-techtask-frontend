import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { publishPost } from '../store/userActions';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [product, setProduct] = useState({
        name: "React from FB",
        price: 10,
        productBy: "facebook"
    })
    const makePayment = (token) => {
        const body = {
            token,
            product
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE", response)
        })
            .catch(err => console.log(err))
    }
    const dispatch = useDispatch()
    const toast = useToast()
    const {
        handleSubmit,
        register,
    } = useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState(null)
    const navigate = useNavigate()
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (type === "thumbnail") {
            setThumbnail(file);
        } else if (type === "video") {
            setVideo(file);
        }
    };
    const SubmitPost = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('video', video);
            formData.append('thumbnail', thumbnail);
            const postData = await dispatch(publishPost(formData));
            const post = postData?.payload?.data;
            if (post) {
                toast({
                    title: `Post Published Successfully`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                navigate("/");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        setLoading(false);
    };
    return (
        <Box maxW={"500px"} mx={"auto"} my={10}>
            <Text fontSize={"2xl"} fontWeight={600} fontFamily={"Outfit"} mb={4}>Create Post</Text>

            <form onSubmit={handleSubmit(SubmitPost)}>
                <Flex fontFamily={"Outfit"} flexDir={"column"} gap={5}>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' {...register("title")} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...register("description")} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Thumbnail</FormLabel>
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'thumbnail')} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Video</FormLabel>
                        <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} />
                    </FormControl>
                </Flex>
                <Flex mt={4} gap={4}>
                <StripeCheckout
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                    image='https://stripe.com/img/documentation/checkout/marketplace.png'
                    token={makePayment}
                    name='Make Payment'
                    amount={product.price * 100}
                >
                    <Button colorScheme='blue'>
                        Pay $ 10
                    </Button>
                </StripeCheckout>
                <Button colorScheme='blue' type='submit' isDisabled={loading}>
                    Publish
                </Button>
                </Flex>
            </form>
        </Box>
    )
}

export default CreatePost