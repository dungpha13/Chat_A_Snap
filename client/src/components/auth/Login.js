import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/apiConfig'

const Login = () => {



    const [show, setShow] = useState(false)
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast()

    const handleClick = () => setShow(!show)

    const submitHandler = async () => {
        setLoading(true)
        if (!username || !password) {
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
        await login(username, password)
            .then(({ data }) => {
                toast({
                    title: "Login successfully.",
                    description: "Welcome back!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(data.data));
                setLoading(false);
                navigate("/chats");
            }).catch(({ response }) => {
                toast({
                    title: "Login failed.",
                    description: response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false)
                console.log(response);
            });
    }

    return <VStack spacing={'5px'}>

        <FormControl id='username' isRequired>
            <FormLabel id='label'>
                Name
            </FormLabel>
            <Input
                id='input-username'
                placeholder='Enter Your UserName'
                onChange={(e) => setUserName(e.target.value)}
            >
            </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel id='label'>
                Password
            </FormLabel>
            <InputGroup>
                <Input
                    id='input-password'
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

        <Button
            colorScheme='blue'
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
        >
            Login
        </Button>
    </VStack>
}

export default Login