import React, { useEffect, useState } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import { ChatState } from '../context/ChatProvider';
import { getLastestMsg, getSender } from '../config/ChatLogic';
import { fetchChat } from '../api/apiConfig';

const MyChats = ({ fetchAgain }) => {

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const { data } = await fetchChat()
            setChats(data.data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setSelectedChat("")
            setChats("")
        }
    };

    useEffect(() => {
        fetchChats();
        setSelectedChat(selectedChat)
    }, [fetchAgain]);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <GroupChatModal />
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="auto">
                        {chats?.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat.id}
                            >
                                <Text>
                                    {!chat.isGroupChat
                                        ? getSender(user, chat.allMembers)
                                        : chat.boxName}
                                </Text>
                                {getLastestMsg(chat.Messages) && (
                                    <Text fontSize="xs">
                                        <b>{getLastestMsg(chat.Messages).Author.fullName} : </b>
                                        {getLastestMsg(chat.Messages).content.length > 50
                                            ? getLastestMsg(chat.Messages).content.substring(0, 51) + "..."
                                            : getLastestMsg(chat.Messages).content}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>

    )
}

export default MyChats