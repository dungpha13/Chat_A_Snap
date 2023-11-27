import axios from "axios"
import { BASE_URL } from "./baseURL"

axios.defaults.withCredentials = true;

export const login = (username, password) => {
    return axios.post(BASE_URL + '/auth/api/login', {
        username,
        password,
    })
}

export const register = (
    username,
    password,
    fullName,
    email
) => {
    return axios.post(BASE_URL + '/auth/api/register', {
        username,
        password,
        fullName,
        email
    })
}

export const getUserByNameOrEmail = (search) => {
    return axios.get(BASE_URL + `/user/api/getByNameOrEmail?search=${search}`)
}

export const createGroupChat = (groupChatName, selectedUsers) => {
    return axios.post(
        BASE_URL + "/box/api/createGroup",
        {
            boxName: groupChatName,
            members: JSON.stringify(selectedUsers.map((u) => u.id)),
        })
}

export const accessChat = (userId) => {
    return axios.post(BASE_URL + "/box/api/accessChat", { userId })
}

export const removeMember = (chatId, userId) => {
    return axios.put(
        BASE_URL + "/box/api/removeMember",
        {
            boxId: chatId,
            userId: userId,
        }
    );
}

export const addMember = (chatId, userId) => {
    return axios.put(
        BASE_URL + "/box/api/addMember",
        {
            boxId: chatId,
            userId: userId,
        }
    );
}

export const renameGroup = (chatId, boxName) => {
    return axios.put(
        BASE_URL + "/box/api/renameGroup",
        {
            boxId: chatId,
            boxName: boxName,
        }
    );
}

export const fetchAdmin = (chatId) => {
    return axios.get(BASE_URL + `/box/api/getAdmin/${chatId}`)
}

export const fetchChat = () => {
    return axios.get(BASE_URL + "/box/api/getBoxByUser");
}

export const fetchMessage = (chatId) => {
    return axios.get(
        BASE_URL + `/message/api/getMessages/${chatId}`
    );
}

export const sendMessage = (chatId, newMessage) => {
    return axios.post(
        BASE_URL + "/message/api/create",
        {
            boxId: chatId,
            content: newMessage,
        }
    );
}



