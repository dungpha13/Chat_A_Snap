import React, { useState } from 'react'

import { Box } from '@chakra-ui/react'

import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { ChatState } from '../context/ChatProvider'

const ChatPage = () => {

    const [fetchAgain, setFetchAgain] = useState(false);

    const { user } = ChatState()

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage