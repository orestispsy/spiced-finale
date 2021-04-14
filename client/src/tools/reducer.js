export default function (state = {}, action) {
    console.log("The state is", state);
    let nextState = {};

    if (action.type == "CHAT_MESSAGES") {
        // console.log("chatmsgs action", action);
        nextState = {
            ...state,
            chatMessages: action.msgs.reverse(),
        };
    }
    if (action.type == "CHAT_MESSAGE") {
        console.log("CHAT MESSAGE in action", action.msg);
        nextState = {
            ...state,
            chatMessages: state.chatMessages.concat(action.msg),
        };
    }
    if (action.type == "ONLINE_USERS") {
        console.log("ONLINE USERS IN ACION", action);
        nextState = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    }
    if (action.type == "USER_JOINED") {
        console.log("user joined to network:", action.onlineUser);
        nextState = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.onlineUser],
        };
    }

    if (action.type == "USER_LEFT") {
        console.log("user left from network:", action.onlineUser);
        nextState = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                (user) => user.id != action.onlineUser
            ),
        };
    }
    console.log("NEXT State", nextState);
    return nextState;
}
