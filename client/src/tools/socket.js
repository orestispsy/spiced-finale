import {
    chatMessages,
    chatMessage,
    onlineUsers,
    userJoinedAct,
    userLeftAct,
} from "./../tools/actions";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            store.dispatch(chatMessages(msgs));
            console.log("chatMessages received in socket", msgs);
        });

        socket.on("chatMessage", (msg) => {
            store.dispatch(chatMessage(msg));
        });

        socket.on("users online", (data) => {
            store.dispatch(onlineUsers(data));
        });
          socket.on("adding connected user", (data) => {
              store.dispatch(userJoinedAct(data));
          });

          socket.on("userLeft", (data) => {
              console.log("After user is leaving: ", data);
              store.dispatch(userLeftAct(data));
          });
    }
};
