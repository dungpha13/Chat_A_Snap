import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [fullName, setFullName] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const handleClick = () => setShow(!show)

    const submitHandler = () => {

    }

    return <VStack spacing={'5px'}>
        <FormControl id='email' isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
            >
            </Input>
        </FormControl>
        <FormControl id='full-name' isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e) => setFullName(e.target.value)}
            >
            </Input>
        </FormControl>
        <FormControl id='username' isRequired>
            <FormLabel>
                User Name
            </FormLabel>
            <Input
                placeholder='Enter Your UserName'
                onChange={(e) => setUserName(e.target.value)}
            >
            </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Input>
                <InputRightElement width={"4.5rem"}>
                    <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>
                Comfirm Password
            </FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter Your Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Input>
                <InputRightElement width={"4.5rem"}>
                    <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
            colorScheme='green'
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            Sign Up
        </Button>
    </VStack>
}

export default SignUp