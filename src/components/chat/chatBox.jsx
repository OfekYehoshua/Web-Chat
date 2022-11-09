import React from 'react'
import { ChatState } from '../provider/chatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './singleChat'
const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat , setSelectedChat} = ChatState()
  const chatSelected = selectedChat
  setSelectedChat(chatSelected)
 
  
  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    width={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox