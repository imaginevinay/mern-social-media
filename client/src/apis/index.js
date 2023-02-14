import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_LOCAL_URL ;
// const token = useSelector((state) => state.token);

export const registerUser = async (formData) => {
  const savedUserResponse = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });
  const savedUser = await savedUserResponse.json();
  return savedUser;
};

export const loginUser = async (formData) => {
  const loggedInResponse = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const loggedIn = await loggedInResponse.json();
  return loggedIn;
};

export const getUserData = async (userId) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  setUser(data);
};

export const createUserPost = async(formData) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  const posts = await response.json();
  return posts;
}

export const getFriendsData = async (userId) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(
    `${BASE_URL}/users/${userId}/friends`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  return data
};

export const getPostsData = async () => {
  const token = useSelector((state) => state.token);
  const response = await fetch("${BASE_URL}/posts", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data
};

export const getUserPostsData = async (userId) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(
    `${BASE_URL}/posts/${userId}/posts`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  return data
};

export const toggleLikePost = async (postId, loggedInUserId) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: loggedInUserId }),
  });
  const updatedPost = await response.json();
  return updatedPost;
};

export const addRemoveFriend = async (_id, friendId) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(
    `${BASE_URL}/users/${_id}/${friendId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}