import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserList = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Box display={"flex"}>
        <Avatar ml={1} size="sm" cursor="pointer" src={user.pic} />
        <Text fontSize="xl">
          {user.nickName}
        </Text>
      </Box>
        <Text>
          <b>Email: </b>
          {user.email}
        </Text>
    </Box>
  );
};

export default UserList;
