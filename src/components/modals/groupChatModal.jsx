  import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Button,
  useDisclosure,
  Input,
  
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import UserListItem from "../user/userList";
import UserBadgeItem from "../user/userBadgeItem";
import { ChatState } from "../provider/chatProvider";


  const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [chatName, setChatName] = useState();
  const [groupUsers, setGroupUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
  const handleGroup = (userToAdd) => {
    if (groupUsers.includes(userToAdd)) {
      toast({
        title: "user already exist",
        status: "error",
        Fduration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setGroupUsers([...groupUsers, userToAdd])
  };
 
  const handleDelete = (delUser) => {
    setGroupUsers(groupUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!chatName || !groupUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });//formhelper text instead
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: chatName,
          users: JSON.stringify(groupUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: "error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      toast({
        title: "Please Enter name in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const {data}= await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setResults(data); 
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Group Name</FormLabel>
              <Input
                placeholder="example: The best friends "
                type="text"
                onChange={(e) => setChatName(e.target.value)}
              />
            
            
              <FormLabel onChange={(e) => setSearch(e.target.value)}>
                add members
              </FormLabel>
              <Input
              placeholder="At least two"
              />
            {groupUsers.map((u)=>(
              <UserBadgeItem key={user._id} user={u}
              handleFunction={()=>handleDelete(u)}/>
              
              ))}
            {loading ? (
              <div>Loading...</div>
              ) : (
                results?.slice(0, 3)
                .map((user) => (
                  <UserListItem 
                  key={user._id}
                  user={user}
                  handleFunction={()=>handleGroup(user)}
                  />
                  ))
                  )}
                  <Button onClick={handleSearch}>add</Button>
                  
                </FormControl>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
