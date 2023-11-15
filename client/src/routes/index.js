import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import ChatPage from '../pages/ChatPage'

export const publicRoutes = [
    { path: '/', component: AuthPage }
]


export const privateRoutes = [
    { path: '/chats', component: ChatPage },
    { path: '/home', component: HomePage }
]