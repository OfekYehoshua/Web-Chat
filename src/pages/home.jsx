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
import VideoPlayer from "react-background-video-player";


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);
  return (

    <Container
    mt={["10", "10", "20"]}
    mb={["10", "10", "20"]}
    maxW="xl"
    
    bg="#faedcd"
    p={6}
    color="#d4a373"
    boxShadow="md"
    borderRadius="xl"
    >
    {/* <AspectRatio>
    <iframe
      className="video"
      src={
        "https://www.pexels.com/video/man-walking-on-road-among-pine-trees-5738706/"
      }
      autoPlay={true}
      muted={true}
    />
    </AspectRatio> */}
      <Text
        letterSpacing="wide"
        fontWeight="semibold"
        mb="10"
        fontSize={{ base: "20px", md: "40px", lg: "50px" }}
        >
        Start your trial
      </Text>
      <Tabs color={"grey"} isFitted variant="soft-rounded">
        <TabList color={"black"}>
          <Tab>Sign-Up</Tab>
          <Tab>Log-In</Tab>
        </TabList>
        <TabPanels color={"red"}>
          <TabPanel>
            <Signup />
          </TabPanel>
          <TabPanel>
            <Login />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>

  );
};

export default Home;
