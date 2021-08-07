export function chatMessages(arg) {
    return {
        type: "CHAT_MESSAGES",
        msgs: arg,
    };
}

export function nextChatMessages(arg) {
    return {
        type: "NEXT_CHAT_MESSAGES",
        msgs: arg,
    };
}

export function chatMessage(arg) {
    return {
        type: "CHAT_MESSAGE",
        msg: arg,
    };
}

export function onlineUsers(arg) {
    return {
        type: "ONLINE_USERS",
        onlineUsers: arg,
    };
}

export function userJoinedAct(arg) {
    return {
        type: "USER_JOINED",
        onlineUser: arg,
    };
}

export function userLeftAct(arg) {
    return {
        type: "USER_LEFT",
        onlineUser: arg,
    };
}

export function comments(arg) {
    return {
        type: "COMMENTS",
        comments: arg,
    };
}

export function addCommentAct(arg) {
    return {
        type: "ADD_COMMENT",
        comment: arg,
    };
}

export function images(arg) {
    return {
        type: "IMAGES",
        images: arg,
    };
}

export function addImageAct(arg) {
    return {
        type: "ADD_IMAGE",
        image: arg,
    };
}

export function deleteImageAct(arg) {
    return {
        type: "DELETE_IMAGE",
        image: arg,
    };
}

export function privateMessagesAct(arg) {
    return {
        type: "PRIVATE_MESSAGES",
        messages: arg,
    };
}

export function privateMessageAct(arg) {
    return {
        type: "PRIVATE_MESSAGE",
        message: arg,
    };
}
