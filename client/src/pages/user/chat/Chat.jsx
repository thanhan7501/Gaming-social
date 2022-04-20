import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Sidebar,
  ConversationList,
  Conversation,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton
} from "@chatscope/chat-ui-kit-react";


import socket from "../../../socket/socket"
import roomApi from '../../../api/room';

let allMessages = [];

const ChatRoom = () => {
  const location = useLocation();
  const { userInfor } = useSelector((state) => state.isAuthenticated);
  console.log(userInfor)
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([])
  let { id } = useParams();
  const getRoomMessages = async () => {
    try {
      const response = await roomApi.getRoomMessages(id);
      allMessages = response.data.messages;
      setMessages(allMessages);
      setRoom(response.data.room)
    } catch (error) {
      console.log(error)
    }
  }

  const userJoinRoom = async () => {
    const roomId = id;
    socket.emit("joinRoom", { roomId });
  }

  const handleChange = async (value) => {
    setMessage(value);
  }

  const sendMessage = async () => {
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
  }, [location.pathname])

  useEffect(() => {
    socket.on("chat:broadcast", (userChat) => {
      setMessages((messages) => [...messages, userChat])
    })
  }, [])

  return (
    <>
      <div style={{ position: "relative", height: "600px", overflow: "hidden" }}>
        <MainContainer>
          <Sidebar position="left" scrollable={false}>
            <ConversationList>
              <Conversation name="Lilly">
                <Avatar src={`https://joeschmoe.io/api/v1/random`} name="Lilly" status="available" />
              </Conversation>
            </ConversationList>
          </Sidebar>
          <ChatContainer>
            {room && (
              <ConversationHeader>
                <ConversationHeader.Back />
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