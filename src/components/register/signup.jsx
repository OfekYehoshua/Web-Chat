import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Text,
  Input,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../animations/uploadIcon.json";
import Lottie from 'react-lottie-player'
import { useMediaQuery } from "@chakra-ui/react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [mediaQuery] = useMediaQuery('(min-width: 1280px)')
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: uploadIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Enter all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const data = await axios.post("/api/user", {
        nickName: name,
        email,
        password,
        pic,
      });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      navigate("/chat");
    } catch (error) {
      toast({
        title: "user already exist!",
        description: "try to log in",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const postDetails = (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please select image",
        description: "Thats the photo that show you in front of other people",
        status: "warnung",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-web");
      data.append("cloud_name", "ofekYehoshua");
      fetch("https://api.cloudinary.com/v1_1/ofekYehoshua/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "1" }}
      px={{  sm: "20" }}
   
    >
      <Box color={"#ef476f"} h={mediaQuery?"51vh":"100vh"}>
        <VStack  spacing={4} align="flex-start"  centerContent >
          <FormControl />
          <Input
            type="text"
            placeholder="Enter nickname"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            color="black"
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box>

          <Input
            type={show ? "text" : "password"}
            placeholder="Repeat password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button colorScheme="teal" variant="ghost" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
          </Box>
          <FormControl>
            <FormLabel fontFamily='inter' px={{sm: '4'}}>
              upload profile photo
              <Lottie
              //  options={defaultOptions} width={120}
               loop
               animationData={uploadIcon}
               play
               style={{ width: 150, height: 150 }}
                />
            </FormLabel>
            <Input
              display="none"
              type="file"
              placeholder="Add profile picture"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          <Button ml={'16'} p={5} onClick={handleSubmit} colorScheme="teal" px={{sm: ''}} size='4xl'>
            SUBMIT
          </Button>
          </FormControl>
        </VStack>
      </Box>
    </Container>
  );
};

export default Signup;
