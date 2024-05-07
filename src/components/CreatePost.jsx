import { Button, Flex, FormControl, FormLabel, Input, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { publishPost } from '../store/userActions';

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const toast = useToast()
    const {
        handleSubmit,
        register,
    } = useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState(null)
    const handleFileUpload = (e,type) => {
        const file = e.target.files[0];
        if(type === "thumbnail"){
            setThumbnail(file);
        }else if(type === "video"){
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
            // dispatch(login({ user }));
            toast({
              title: `Post Published Successfully`,
              status: 'success',
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
        <>
            <MenuItem onClick={onOpen}>Create Post</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily={"Outfit"}>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(SubmitPost)}>
                        <ModalBody fontFamily={"Outfit"}>
                            <Flex flexDir={"column"} gap={5}>
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
                                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e,'thumbnail')} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Video</FormLabel>
                                    <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e,'video')} />
                                </FormControl>
                            </Flex>
                        </ModalBody>

                        <ModalFooter fontFamily={"Outfit"}>
                            <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
                            <Button colorScheme='blue' type='submit' isDisabled={loading}>
                                Publish
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost