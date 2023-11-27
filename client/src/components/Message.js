import React from 'react'
import { Avatar, Box, Stack, Tooltip } from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic'

const Message = ({ messages }) => {

    const { user } = ChatState()

    return (
        <Box p={3}>
            <Stack spacing={3}>
                {messages && messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m.id}>
                        {(isSameSender(messages, m, i, user.id) ||
                            isLastMessage(messages, i, user.id)) && (
                                <Tooltip label={m.Author.fullName} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.Author.fullName}
                                    />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.Author.id === user.id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                )
                )}
            </Stack>
        </Box>
    )
}

export default Message