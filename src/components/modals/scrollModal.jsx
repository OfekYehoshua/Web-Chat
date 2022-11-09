import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../provider/chatProvider";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../logic";
import { Text, Box } from "@chakra-ui/react";
import './modalStyles.css'

const ScrollModal = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed >
      {messages &&
        messages.map((m, i) => (
          <Box key={m.id}  width={{base:"90vw", md:"64vw", lg:"64vw"}}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.name}
                placement="bottom-start"
                //   hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <Text
              // bg={`${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`}
              // ml={isSameSenderMargin(messages, m, i, user._id)}
              // mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
           
              }}
            >
              {m.content}
            </Text>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollModal;
