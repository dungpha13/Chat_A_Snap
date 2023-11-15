import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'

const AuthPage = () => {

    const navigate = useNavigate()

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    //     if (userInfo) {
    //         navigate("/home")
    //     }
    // }, [navigate])

    return <Container maxW='xl' centerContent>
        <Box
            d='flex'
            justifyContent={"center"}
            p={3}
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
        >
            <Center>
                <Text
                    bgGradient={[
                        'linear(to-tr, teal.300, yellow.400)',
                        'linear(to-t, blue.200, teal.500)',
                        'linear(to-b, orange.100, purple.300)',
                    ]}
                    bgClip='text'
                    fontSize='6xl'
                    fontWeight='extrabold'
                    fontFamily="Work sans"
                >
                    FFYS
                </Text>
            </Center>
        </Box>
        <Box bg={"white"}
            w={"100%"}
            p={4}
            borderRadius={"lg"}
            color={"black"}
            borderWidth={"1px"}>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab width={"50%"}>Login</Tab>
                    <Tab width={"50%"}>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login></Login>
                    </TabPanel>
                    <TabPanel>
                        <SignUp></SignUp>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
}

export default AuthPage