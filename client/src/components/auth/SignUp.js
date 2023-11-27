import React, { useState } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import { register } from '../../api/apiConfig'

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [fullName, setFullName] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const handleClick = () => setShow(!show)

    const submitHandler = async () => {
        setLoading(true)
        if (!username || !password || !email || !fullName || !confirmPassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        await register(username, password, fullName, email)
            .then(({ data }) => {
                console.log(data);
                toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(data.data));
                setLoading(false);
            }).catch(({ response }) => {
                toast({
                    title: "Register failed.",
                    description: response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false)
            });
    }

    return <VStack spacing={'5px'}>
        <FormControl id='full-name' isRequired isInvalid={fullName === ""}>
            <FormLabel>
                Name
            </FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e) => setFullName(e.target.value)}
            >
            </Input>
            <FormErrorMessage>*Name is required</FormErrorMessage>
        </FormControl>
        <FormControl id='email' isRequired isInvalid={email === ""}>
            <FormLabel>
                Email
            </FormLabel>
            <Input
                placeholder='Enter Your Email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
            >
            </Input>
            <FormErrorMessage>*Email is required</FormErrorMessage>
        </FormControl>
        <FormControl id='username' isRequired isInvalid={username === ""}>
            <FormLabel>
                User Name
            </FormLabel>
            <Input
                placeholder='Enter Your UserName'
                onChange={(e) => setUserName(e.target.value)}
            >
            </Input>
            <FormErrorMessage>*User Name is require</FormErrorMessage>
        </FormControl>
        <FormControl id='password' isRequired isInvalid={password === ""}>
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
            <FormErrorMessage>*Password is require</FormErrorMessage>
        </FormControl>
        <FormControl id='confirm-password' isRequired isInvalid={confirmPassword !== password}>
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
            <FormErrorMessage>*Comfirm password must match with password</FormErrorMessage>
        </FormControl>
        <Button
            colorScheme='blue'
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
}

export default SignUp