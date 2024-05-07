import React from 'react'
import {Heading, Text, VStack} from '@chakra-ui/react'
const ErrorPage = () => {
  
    return (
        <VStack minH={"90vh"} align={"center"} justify={"center"}>
          <Heading>Oops!</Heading>
          <Text>Sorry, an unexpected error has occurred.</Text>
          <p>
            <i>Not found</i>
          </p>
        </VStack>
    );
}

export default ErrorPage