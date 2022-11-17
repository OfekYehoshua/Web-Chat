import {
  Center,
  Text,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Container,
  AspectRatio,
} from "@chakra-ui/react";
import Login from "../components/register/login";
import Signup from "../components/register/signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './pageStyles.css'


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
<div id="background">
    <Container
    maxW="xl"
    bg="#ffd166"
    p={4}
    color="#073b4c"
    boxShadow="md"
    borderRadius="xl"
    >
      <Text
        letterSpacing="wide"
        fontWeight="inter"
        textAlign={'center'}
        fontSize={{ base: "40px", md: "40px", lg: "30px" }}
        mb={{base:'4vh', mb:'none'}}
        >
        Welcom to Web-Chat
      </Text>
      <Tabs color={"grey"} isFitted variant="soft-rounded">
        <TabList color={"black"}>
          <Tab p={1}>Sign-Up</Tab>
          <Tab>Log-In</Tab>
        </TabList>
        <TabPanels color={"#073b4c"}>
          <TabPanel>
            <Signup />
          </TabPanel>
          <TabPanel>
            <Login />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
    </div>

  );
};

export default Home;
