import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import socket from "../../../socket/socket"

const Chat = () => {
  let { id } = useParams();
  const { userInfor } = useSelector((state) => state.isAuthenticated);
  const userRead = async () => {
    const roomId = id;
    const userId = userInfor._id
    socket.emit("joinRoom", { userId, roomId });
  }

  useEffect(() => {
    userRead();
  }, [])

  return (
    <div>Chat</div>
  )
}

export default Chat