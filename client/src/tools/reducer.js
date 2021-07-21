export default function (state = {}, action) {
    let nextState = {};

    if (action.type == "CHAT_MESSAGES") {
        nextState = {
            ...state,
            chatMessages: action.msgs.reverse(),
        };
    }
    if (action.type == "NEXT_CHAT_MESSAGES") {
        nextState = {
            ...state,
            chatMessages: state.chatMessages
                .reverse()
                .concat(action.msgs)
                .reverse(),
        };
    }
    if (action.type == "CHAT_MESSAGE") {
        nextState = {
            ...state,
            chatMessages: state.chatMessages.concat(action.msg),
        };
    }
    if (action.type == "ONLINE_USERS") {
        nextState = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    }
    if (action.type == "USER_JOINED") {
        nextState = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.onlineUser],
        };
    }

    if (action.type == "USER_LEFT") {
        nextState = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                (user) => user.id != action.onlineUserfilter(
                (user) => user.id != action.onlineUser
            )
            ),
        };
    }
    // console.log("NEXT State", nextState);
    return nextState;
}
