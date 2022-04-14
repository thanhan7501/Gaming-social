import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from "../../../socket/socket"

const Chat = () => {
  let { id } = useParams();
  const userJoinRoom = async () => {
    const roomId = id;
    socket.emit("joinRoom", { roomId });
  }

  useEffect(() => {
    userJoinRoom();
  }, [])

  return (
    <div>Chat</div>
  )
}

export default Chat