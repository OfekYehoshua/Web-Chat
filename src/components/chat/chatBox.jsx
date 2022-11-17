import React from 'react'
import { ChatState } from '../provider/chatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './singleChat'
const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat , setSelectedChat} = ChatState()
  const test = selectedChat
  setSelectedChat(test)
 
  
  return (
    <Box
    d={{ base: test ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
      <SingleChat test={test} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox