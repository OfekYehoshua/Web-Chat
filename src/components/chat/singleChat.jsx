import React from "react";
import { ChatState } from "../provider/chatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
  Heading
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetSender, GetSenderFull } from "../logic";
import ProfileModal from "../modals/profileModal";
import UpdatGroupChat from "../modals/updatGroupChat";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollModal from "../modals/scrollModal";
import { io } from "socket.io-client";
import Lottie from 'react-lottie-player'
import typingAnimation from "../animations/typing.json";

const ENDPOINT = "http://localhost:3001";
let socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification , setNotification} = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  
  
  
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));
   
  }, []);
  
  useEffect(() => {
    fetchMessages();
    //to decide if to give notification
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  
  useEffect(() => {
    socket.on("msg", (msg) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== msg.chat._id
        )
        {
          if (!notification.includes(msg)) {
            setNotification([msg, ...notification])
          }
        }
        else {
          setMessages([...messages, msg]);
        }
      });
    });
  

    const fetchMessages = async () => {
      if (!selectedChat) return;
      
      try {
      const config = {
        Headings: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:3001/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stopTyping", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        socket.emit("send", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stopTyping", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text display={'flex'}>
            <IconButton 
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <Heading>
                {GetSender(user, selectedChat.users)}
                <ProfileModal user={GetSenderFull(user, selectedChat.users)} />
              </Heading>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdatGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box>
            {loading ? (
              <Spinner alightself="center" />
            ) : (
              <>
                <ScrollModal messages={messages} />
              </>
            )}
            <FormControl onKeyDown={sendMessage} isRequired>
              {istyping ? (
                <div>
                  <Lottie
                    loop
                    animationData={typingAnimation}
                    play
                    style={{ width: 150, height: 150 }}
                  />
                </div>
              ) : (
                <></>
              )}

              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Text
        fontFamily={'inter'}
        >click on conversation to start chatting</Text>
      )}
    </>
  );
};

export default SingleChat;
