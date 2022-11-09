import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import React from "react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return <Box>{user.data.nickName}</Box>;
};

export default UserBadgeItem;
