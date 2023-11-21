import HomePage from '../pages/HomePage'
import ChatPage from '../pages/ChatPage'

export const publicRoutes = [
    { path: '/', component: HomePage }
]


export const privateRoutes = [
    { path: '/chats', component: ChatPage },
]