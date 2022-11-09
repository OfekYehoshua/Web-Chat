import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerFooter,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { Spinner } from "@chakra-ui/spinner";
// import { Effect } from "react-notification-badge";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import UserList from "../user/userList";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../provider/chatProvider";
import ProfileModal from "../modals/profileModal";
import SkeletonSearch from "./skeleton";
import { GetSender } from "../logic";
import NotificationBadge from 'react-notification-badge'
import {Effect} from 'react-notification-badge'

const Slider = () => {
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
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

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:3001/api/chat",
        JSON.stringify({ userId }),
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip hasArrow label="Search places" bg="tomato">
          <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base:"none", sm: "none", md: "flex" }}>search</Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Web-Chat
        </Text>
      </Box>
      <Box display={"flex"} flexDirection="row-reverse">
        <Menu>
          <MenuButton>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.data.nickName}
                src={user.data.pic}
              />
            </MenuButton>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user.data}>
              <MenuItem>My profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={logoutHandler}>Log-out</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <Tooltip hasArrow label="see whats new" bg="tomato">
            <MenuButton p={1}>
              <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Tooltip>
          <MenuList>   {!notification.length && "No New Messages"}  
          {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif))

                  }}
                >
                  {notif.chat.isGroupChat?
                    `New Message in ${notif.chat.chatName}`
                    :`New Message from ${GetSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        <Drawer
          placement="left"
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search for users</DrawerHeader>
            <DrawerBody>
              <Input
                placeholder="search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
              {loading ? (
                <SkeletonSearch />
              ) : (
                searchResult?.map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {/* {<SkeletonSearch /> && <Spinner ml="auto" d="flex" />} */}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Slider;
