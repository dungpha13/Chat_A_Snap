import { AddIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import { ChatState } from '../../context/ChatProvider'
import UserListItem from '../UserAvatar/UserListItem'
import { createGroupChat, getUserByNameOrEmail } from '../../api/apiConfig'

const GroupChatModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { chats, setChats } = ChatState();

    const toast = useToast();

    const handleSearch = async (search) => {
        if (!search) {
            return
        }
        setLoading(true)
        await getUserByNameOrEmail(search)
            .then(({ data }) => {
                setSearchResult(data.data)
                setLoading(false);
            }).catch((error) => {
                toast({
                    title: "Error occured!",
                    description: "Failed to Load the Search Results",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
    }

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((user) => user.id !== delUser.id));
    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };


    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        await createGroupChat(groupChatName, selectedUsers)
            .then(({ data }) => {
                console.log(data.data);
                setChats([data.data, ...chats]);
                onClose();
                toast({
                    title: "New Group Chat Created!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }).catch((err) => {
                toast({
                    title: "Failed to Create the Chat!",
                    description: err.response.data,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            });

    }

    return (
        <>
            <Button
                d="flex"
                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                rightIcon={<AddIcon />}
                onClick={onOpen}
            >
                New Group Chat
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg: dundun, tinaa, ..."
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" d="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u.id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            // <ChatLoading />
                            <div>Loading...</div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user) => (
                                    <UserListItem
                                        key={user.id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default GroupChatModal