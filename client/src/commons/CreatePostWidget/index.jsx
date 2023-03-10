import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetsWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import {createUserPost} from '../../apis';
import {setLoading, setSnackBar} from '../../state/index'
const CreatePostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      if(!post) {
        dispatch(
          setSnackBar({
            isOpenSnackbar: true,
            snackbarType: "fail",
            snackbarMessage: "Please enter some text for your post",
          })
        );
        return
      }
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
      
      const posts = await createUserPost(formData, token);
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
      dispatch(setLoading(false));
      dispatch(
        setSnackBar({
          isOpenSnackbar: true,
          snackbarType: "success",
          snackbarMessage: "Your post has been published !",
        })
      );

    } catch (error) {
      dispatch(setLoading(false));
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
    <WidgetWrapper>
      <FlexBetween gap="1.5rem" justifyContent="flex-start">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
          <FlexBetween margin="1.25rem 0">
            <Button
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                width: "100%",
              }}
            >
              POST
            </Button>
          </FlexBetween>
    </WidgetWrapper>
  );
};

export default CreatePostWidget;
