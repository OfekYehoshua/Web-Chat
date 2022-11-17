import { useState } from "react";
import { Box } from "@chakra-ui/layout";
import ChatBox from "../components/chat/chatBox";
import MyChats from "../components/chat/myChats";
import Slider from "../components/modals/slider";
import { ChatState } from "../components/provider/chatProvider";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box backgroundColor={'#2b2d42'}>
      {user && <Slider  />}
      <Box  display={"flex"} justifyContent="space-between" w="100%" h="87.5vh" p="10px">
        {user && (<MyChats fetchAgain={fetchAgain} />)}
        {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
      </Box>
    </Box>
  );
};
export default Chat;
