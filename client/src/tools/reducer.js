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
                (user) => user.id != action.onlineUser
            ),
        };
    }

    if (action.type == "COMMENTS") {
        nextState = {
            ...state,
            comments: action.comments,
        };
    }

    if (action.type == "ADD_COMMENT") {
        nextState = {
            ...state,
            comments: state.comments.concat(action.comment),
        };
    }

    if (action.type == "IMAGES") {
        nextState = {
            ...state,
            images: action.images,
        };
    }

    if (action.type == "ADD_IMAGE") {
        nextState = {
            ...state,
            images: state.images.concat(action.image),
        };
    }

    if (action.type == "DELETE_IMAGE") {
        nextState = {
            ...state,
            images: state.images.filter((img) => img.id != action.image.id),
        };
    }

    if (action.type == "PRIVATE_MESSAGES") {
        nextState = {
            ...state,
            messages: action.messages.reverse(),
        };
    }
    if (action.type == "PRIVATE_MESSAGE") {
        nextState = {
            ...state,
            messages: state.messages.concat(action.message),
        };
    }

    // console.log("NEXT State", nextState);
    return nextState;
}
