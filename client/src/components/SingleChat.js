import React, { useEffect, useState } from 'react'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { getSender, getSenderFull } from '../config/ChatLogic';
import { ChatState } from '../context/ChatProvider'
import Message from './Message';
import io from 'socket.io-client'
import { fetchMessage, sendMessage } from '../api/apiConfig';


const END_POINT = "http://localhost:8080"
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

    const { user, selectedChat, setSelectedChat, notification, setNotification, messages, setMessages } = ChatState();

    const toast = useToast();

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const { data } = await fetchMessage(selectedChat.id)
            setMessages(data.data);
            setLoading(false);
            socket.emit("join room", selectedChat.id);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessages = async (e) => {
        if (e.key === "Enter" && newMessage) {
            // socket.emit("stop typing", selectedChat.id);
            try {
                setNewMessage("");
                const { data } = await sendMessage(selectedChat.id, newMessage)
                setMessages([...messages, data.data]);
                setFetchAgain(!fetchAgain)
                socket.emit("new message", data.data);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        socket = io(END_POINT);
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare.id !== newMessageRecieved.Box.id
            ) {

            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    }, [selectedChatCompare, messages]);

    return <>
        {selectedChat ? (
            <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupChat ?
                        (<>
                            {getSender(user, selectedChat.allMembers)}
                            <ProfileModal user={getSenderFull(user, selectedChat.allMembers)} />
                        </>) :
                        (<>
                            {selectedChat.boxName.toUpperCase()}
                            <UpdateGroupChatModal
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                            />
                        </>)}
                </Text>
                <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    bg="#E8E8E8"
                    p={3}
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {loading ?
                        (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <Box w="100%" sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
                                <Message messages={messages} />
                            </Box>
                            // </div>
                        )}
                    <FormControl onKeyDown={sendMessages} isRequired mt={3}>
                        <Input
                            variant="filled"
                            bg="#E0E0E0"
                            placeholder='Enter a message...'
                            onChange={typingHandler}
                            value={newMessage}
                        />
                    </FormControl>
                </Box>
            </>
        ) : (
            <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
    </>
}

export default SingleChat