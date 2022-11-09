import {
  Container,
  Box,
  VStack,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";

const Login = (e) => {
  const [mediaQuery] = useMediaQuery('(min-width: 1280px)')
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //still not working
  const handleGuest = async (e) => {
    e.preventDefault();
    setEmail("guest2@example.com");
    setPassword("1234");
    try {
      const data = await axios.post("api/user/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    navigate("/chat");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const data = await axios.post("api/user/login", { email, password });
      toast({
        title: "Logged in!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "something happend",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    navigate("/chat");
  };
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "30" }}
      px={{ sm: "20", md: "10" }}
    
      h={mediaQuery?"51vh":"100vh"}
      > 
      <Box color={"#2a9d8f"} mb={'10vh'}>
        <VStack spacing={4} align="flex-start" centerContent>
          <Input
            color="black"
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="teal" variant="ghost" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </FormControl>
          
         
            <Button
              onClick={handleSubmit}
              ml={"10"}
              colorScheme="teal"
              py={{sm:'4'}}
              px={{ sm: "4", md: '6', lg:'8' }}
              size='4xl'
            > 
              Log-In
            </Button>
        </VStack>
            <Button  m='5vh' p={"6"} color="white" bg={"red"} onClick={handleGuest}>
              or enter as a guest
            </Button>
      </Box>
    </Container>
    // <div>
    //   Login
    //   <form action="">
    //     <input
    //     value={email}
    //       type="text"
    //       placeholder="Enter email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //     value={password}
    //      type= {show ? "text" : "password"}
    //       placeholder="Enter password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //      <button onClick={handleClick}>{show ? "Hide" : "Show"}</button>
    //     <button onClick={handleSubmit}>Log-in</button>
    //     <button onClick={handleGuest}>Enter as a guest</button>

    //   </form>
    // </div>
  );
};

export default Login;
