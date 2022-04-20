import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import socket from "../../../socket/socket"
import roomApi from '../../../api/room';

import MessageInput from '../../../components/messageInput/MessageInput'

let allMessages = [];

const ChatRoom = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])
  let { id } = useParams();
  const getRoomMessages = async () => {
    try {
      const response = await roomApi.getRoomMessages(id);
      allMessages = response.data.messages;
      setMessages(allMessages);
  } catch (error) {
      console.log(error)
  }
}

  const userJoinRoom = async () => {
    const roomId = id;
    socket.emit("joinRoom", { roomId });
  }

  const handleChange = async (event) => {
    setMessage(event.target.value);
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    const payload = {
      newMessage: message,
      roomId: id,
    }
    socket.emit("chat", payload)
    setMessage("");
  }

  useEffect(() => {
    getRoomMessages();
    userJoinRoom();
    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [location.pathname])

  useEffect(() => {
    socket.on("chat:broadcast", (userChat) => {
      setMessages((messages) => [...messages, userChat])
    })
  }, [])

  return (
    <>
        <MessageInput />
    </>
  )
}

export default ChatRoom;