export const getLastestMsg = (messages) => {
    if (messages.length < 2) {
        return messages[0]
    }
    sortMsg(messages)
    return messages[0]
    // if (messages.length = 1) {
    //     return messages[0]
    // }
    // if (messages.length > 1) {
    //     sortMsg(messages)
    //     return messages[0]
    // }
    // return null
}

export const sortMsg = (messages) => {
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return messages
}

export const getSender = (loggedUser, members) => {
    return members[0]?.id === loggedUser?.id ? members[1].fullName : members[0].fullName;
};