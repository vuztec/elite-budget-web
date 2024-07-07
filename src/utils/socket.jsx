import { io } from "socket.io-client";

const serverUrl = import.meta.env.VITE_SERVER_URL;
const storage = window.localStorage.getItem("projectlitemanager");
const auth = storage ? JSON.parse(storage) : null;
const token = auth ? auth.state.jwt : null;

let socket;

if (token)
  socket = io.connect(serverUrl, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });

export default socket;
