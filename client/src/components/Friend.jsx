import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRemoveFriend } from "../apis";
import { setFriends, setLoading, setSnackBar } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  showAddRemoveFriend,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    try {
      dispatch(setLoading(true))
      const data = await addRemoveFriend(_id, friendId, token);
      dispatch(setFriends({ friends: data }));
      dispatch(setLoading(false))
      dispatch(
        setSnackBar({
          isOpenSnackbar: true,
          snackbarType: "success",
          snackbarMessage: isFriend ? 'Added as a friend' : 'Removed from friendlist',
        })
      );
    } catch (error) {
      dispatch(setLoading(false))
      dispatch(
        setSnackBar({
          isOpenSnackbar: true,
          snackbarType: "fail",
          snackbarMessage: error.message,
        })
      );
    }
    
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {showAddRemoveFriend && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
