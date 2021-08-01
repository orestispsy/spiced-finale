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
