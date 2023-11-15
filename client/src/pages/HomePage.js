import React from 'react'
import { Box } from '@chakra-ui/react'

import SideDrawer from '../components/miscellaneous/SideDrawer'
import { ChatSate } from '../context/ChatProvider'
import ServerChat from '../components/ServerChat'

const HomePage = () => {
    const { user } = ChatSate()

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && <ServerChat />}
            </Box>
        </div>
    )
}

export default HomePage