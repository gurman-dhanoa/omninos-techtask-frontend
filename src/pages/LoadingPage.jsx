import React from 'react'
import {Heading, Spinner, VStack} from '@chakra-ui/react'
const LoadingPage = () => {
  
    return (
        <VStack minH={"60vh"} align={"center"} justify={"center"}>
          <Heading>Please wait...</Heading>
          <Spinner size='xl' />
        </VStack>
    );
}

export default LoadingPage