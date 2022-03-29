import { io } from 'socket.io-client';

const token = localStorage.getItem("access_token");
const baseURL = process.env.REACT_APP_BASE_URL;
const socket = io(baseURL, {
    auth: { token },
});
socket.on('connect', (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

export default socket;