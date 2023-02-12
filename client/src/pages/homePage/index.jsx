import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../commons/navBar";
import UserWidget from "../../commons/UserWidget";
import CreatePostWidget from "../../commons/CreatePostWidget";
import PostsWrapperWidget from "../../commons/PostsWrapperWidget";
import AdvertWidget from '../../commons/AdvertWidget';
import FriendListWidget from '../../commons/FriendListWidget'
const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <CreatePostWidget picturePath={picturePath} />
          <PostsWrapperWidget userId={_id} />
        </Box>

        {isNonMobile && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
