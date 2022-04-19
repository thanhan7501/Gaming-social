import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import socket from "../../../socket/socket"

const Chat = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])
  let { id } = useParams();
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
    userJoinRoom();
    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [location.pathname])

  useEffect(() => {
    socket.on("chat:broadcast", (userChat) => {
      setMessages([...messages, userChat])
    })
  }, [messages])

  return (
    <div>Chat</div>
  )
}

export default Chat;