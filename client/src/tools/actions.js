export function chatMessages(arg) {
    return {
        type: "CHAT_MESSAGES",
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
