export const getLastestMsg = (messages) => {
    if (messages.length < 2) {
        return messages[0]
    }
    sortMsg(messages)
    return messages[0]
}

export const sortMsg = (messages) => {
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return messages
}

export const getSender = (loggedUser, members) => {
    return members[0]?.id === loggedUser?.id ? members[1].fullName : members[0].fullName;
}

export const getSenderFull = (loggedUser, members) => {
    return members[0]?.id === loggedUser?.id ? members[1] : members[0];
}

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].Author.id !== m.Author.id ||
            messages[i + 1].Author.id === undefined) &&
        messages[i].Author.id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].Author.id !== userId &&
        messages[messages.length - 1].Author.id
    );
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].Author.id === m.Author.id;
};

export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);

    if (
        i < messages.length - 1 &&
        messages[i + 1].Author.id === m.Author.id &&
        messages[i].Author.id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].Author.id !== m.Author.id &&
            messages[i].Author.id !== userId) ||
        (i === messages.length - 1 && messages[i].Author.id !== userId)
    )
        return 0;
    else return "auto";
};