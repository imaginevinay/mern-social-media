import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts, setSnackBar } from "../../state";
import PostWidget from "../PostWidget";
import {getPostsData, getUserPostsData} from '../../apis'
const PostsWrapperWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      dispatch(setLoading(true))
      const data = await getPostsData();
      dispatch(setPosts({ posts: data }));
      dispatch(setLoading(false))
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

  const getUserPosts = async () => {
    try {
      dispatch(setLoading(true))
      const data = await getUserPostsData(userId);
      dispatch(setPosts({ posts: data }));
      dispatch(setLoading(false))
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

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWrapperWidget;
