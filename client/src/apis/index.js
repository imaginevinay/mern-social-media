import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../state";

const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_LOCAL_URL ;
// const dispatch = useDispatch();

export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });
  const savedUser = await response.json();
  if(response?.ok) {
    return savedUser;
  } else {
    throw new Error(savedUser?.error)
  }
};

export const loginUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const loggedIn = await response.json();
  if(response?.ok) {
    return loggedIn;
  } else {
    throw new Error(loggedIn?.error)
  }
};

export const getUserData = async (userId) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if(response?.ok) {
    return data;
  } else {
    throw new Error(data?.error)
  }
};

export const createUserPost = async(formData) => {
  const token = useSelector((state) => state.token);
  const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  const posts = await response.json();
  if(response?.ok) {
    return posts;
  } else {
    throw new Error(posts?.error)
  }
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
  if(response?.ok) {
    return data;
  } else {
    throw new Error(data?.error)
  }
};

export const getPostsData = async () => {
  const token = useSelector((state) => state.token);
  const response = await fetch("${BASE_URL}/posts", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if(response?.ok) {
    return data;
  } else {
    throw new Error(data?.error)
  }
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
  if(response?.ok) {
    return data;
  } else {
    throw new Error(data?.error)
  }
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
  if(response?.ok) {
    return updatedPost;
  } else {
    throw new Error(updatedPost?.error)
  }
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
  if(response?.ok) {
    return data;
  } else {
    throw new Error(data?.error)
  }
}