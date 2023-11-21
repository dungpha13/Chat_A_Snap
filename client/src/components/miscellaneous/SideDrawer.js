import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Stack, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'


const SideDrawer = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)

    const { user } = ChatState()
    const toast = useToast()
    const navigate = useNavigate()

    const accessChat = async () => {
        setLoadingChat(true)
        const { data } = await axios.post()
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter something to search.",
                description: "Nothing to search!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            return
        }
        setLoading(true)
        await axios.get(`http://localhost:8080/user/api/getByNameOrEmail?search=${search}`)
            .then(({ data }) => {
                setSearchResult(data.data)
                setLoading(false);
            }).catch(({ response }) => {
                toast({
                    title: "Error occured!",
                    description: response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                setLoading(false)
            });
    }

    const handleLogout = () => {
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="content"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
            >
                <Tooltip
                    label="Search Users to chat"
                    hasArrow placement='bottom-end'
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text
                    // bgGradient={[
                    //     'linear(to-tr, teal.300, yellow.400)',
                    //     'linear(to-t, blue.200, teal.500)',
                    //     'linear(to-b, orange.100, purple.300)',
                    // ]}
                    fontSize="3xl"
                    fontFamily="Work sans"
                    bgClip='text'
                    color="black"
                    fontWeight='extrabold'
                >
                    F-F-Y-S
                </Text>
                <div
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                        <Menu>
                            <MenuButton
                                as={Button} rightIcon={<ChevronDownIcon />}
                            >
                                <Avatar size="sm" cursor="pointer" name={user.fullName}></Avatar>
                            </MenuButton>
                            <MenuList>
                                <ProfileModal user={user}>
                                    <MenuItem>
                                        My Profile
                                    </MenuItem>
                                </ProfileModal>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult.map(user => (
                                <UserListItem
                                    key={user.id}
                                    user={user}
                                    handleFunction={() => accessChat(user.id)}
                                />
                            ))
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer