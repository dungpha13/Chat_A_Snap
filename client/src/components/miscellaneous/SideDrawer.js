import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'

import { ChatSate } from '../../context/ChatProvider'
import ProfileModal from './ProfileModal'


const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { user } = ChatSate()
    const navigate = useNavigate()

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
                    <Button variant="ghost">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text
                    bgGradient={[
                        'linear(to-tr, teal.300, yellow.400)',
                        'linear(to-t, blue.200, teal.500)',
                        'linear(to-b, orange.100, purple.300)',
                    ]}
                    fontSize="3xl"
                    fontFamily="Work sans"
                    bgClip='text'
                    fontWeight='extrabold'
                >
                    F-F-Y-S
                </Text>
                <div>
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
        </>
    )
}

export default SideDrawer