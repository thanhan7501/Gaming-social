import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton
} from "@chatscope/chat-ui-kit-react";


import socket from "../../../socket/socket"
import roomApi from '../../../api/room';


import './Chat.scss'
let allMessages = [];

const ChatRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfor } = useSelector((state) => state.isAuthenticated);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([])
  let { id } = useParams();
  const getRoomMessages = async () => {
    try {
      const response = await roomApi.getRoomMessages(id);
      console.log(response);
      allMessages = response.data.messages;
      setMessages(allMessages);
      setRoom(response.data.room)
    } catch (error) {
      console.log(error)
    }
  }

  const userJoinRoom = () => {
    const roomId = id;
    socket.on('connect', (socket) => {
      // console.log(socket); // x8WIv7-mJelg7on_ALbx
    });
    socket.emit("joinRoom", { roomId });
  }

  const handleChange = (value) => {
    setMessage(value);
  }

  const handleClick = () => {
    navigate('/roomchat')
  }

  const sendMessage = () => {
    const payload = {
      newMessage: message,
      roomId: id,
    }
    socket.emit("chat:sendMessage", payload);
  }

  useEffect(() => {
    getRoomMessages();
    userJoinRoom();
    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [id])

  useEffect(() => {
    socket.on("chat:broadcast", (userChat) => {
      setMessages((messages) => [...messages, userChat])
    })
  }, [])

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <MainContainer className="chat-config">
          <ChatContainer>
            {room && (
              <ConversationHeader>
                <ConversationHeader.Back onClick={handleClick} />
                <Avatar src={room.gameAvatar} name={room.gameName} />
                <ConversationHeader.Content userName={room.gameName} />
                <ConversationHeader.Actions>
                  <VoiceCallButton />
                  <VideoCallButton />
                </ConversationHeader.Actions>
              </ConversationHeader>
            )}
            <MessageList>
              {messages && messages.map((message) => (
                userInfor._id === message.user._id
                  ? (<Message key={message._id} model={{
                    sentTime: `${new Date(message.createdAt).toLocaleString()}`,
                    sender: `${message.user.fullName}`,
                    position: "single",
                    direction: "outgoing",
                  }}>
                    <Message.Header sender={message.user.fullName} sentTime={new Date(message.createdAt).toLocaleString()} />
                    <Message.TextContent text={message.message} />
                    <Avatar src={message.user.avatarUrl} name={message.user.fullName} />
                  </Message>)
                  : (<Message key={message._id} model={{
                    sentTime: `${new Date(message.createdAt).toLocaleString()}`,
                    sender: `${message.user.fullName}`,
                    position: "single",
                    direction: "incoming",
                  }}>
                    <Message.Header sender={message.user.fullName} sentTime={new Date(message.createdAt).toLocaleString()} />
                    <Message.TextContent text={message.message} />
                    <Avatar src={message.user.avatarUrl} name={message.user.fullName} />
                  </Message>)
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here"
              onChange={value => handleChange(value)}
              value={message}
              onSend={() => {
                sendMessage();
                setMessage("");
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  )
}

export default ChatRoom;