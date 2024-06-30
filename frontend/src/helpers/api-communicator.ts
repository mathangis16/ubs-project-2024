import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string,
  gender: string,
  age: string,
  accessibilityNeeds: string,
  country: string
) => {
  const res = await axios.post("/user/signup", { name, email, password, gender, age, accessibilityNeeds, country });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const getUserDetails = async () => {
  try {
    const res = await axios.get("/user/details", {
      withCredentials: true, // Ensure cookies are sent with the request
    });
    if (res.status !== 200) {
      throw new Error("Unable to fetch user details");
    }
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error;
  }
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

// Function to create a new thread
// export const createThread = async (title: string, content: string, userId: string) => {
//   try {
//     const res = await axios.post("discussionForum/create/thread", { title, content, userId });
//     if (res.status !== 201) {
//       throw new Error("Unable to create thread");
//     }
//     return res.data;
//   } catch (error) {
//     console.error("Error in creating thread:", error);
//     throw error;
//   }
// };
export const createThread = async (title: string, userName: string) => {
  try {
    const res = await axios.post("discussionForum/create/thread", { title, userName });
    if (res.status !== 201) {
      throw new Error("Unable to create thread");
    }
    return res.data;
  } catch (error) {
    console.error("Error in creating thread:", error);
    throw error;
  }
};

// Function to fetch all threads
// export const getAllThreads = async () => {
//   try {
//     const res = await axios.get("discussionForum/all/threads");
//     if (res.status !== 200) {
//       throw new Error("Failed to fetch threads");
//     }
//     return res.data;
//   } catch (error) {
//     console.error("Error in fetching threads:", error);
//     throw error;
//   }
// };
export const getAllThreads = async () => {
  try {
    const res = await axios.get("discussionForum/all/threads");
    if (res.status !== 200) {
      throw new Error("Failed to fetch threads");
    }
    return res.data;
  } catch (error) {
    console.error("Error in fetching threads:", error);
    throw error;
  }
};

export const createReply = async (threadId: string, content: string, userName: string) => {
  try {
    const res = await axios.post("forumUser/create/reply", { threadId, content, userName });
    if (res.status !== 201) {
      throw new Error('Unable to create reply');
    }
    return res.data;
  } catch (error) {
    console.error('Error in creating reply:', error);
    throw error;
  }
};

export const getAllReplies = async (threadId: string) => {
  try {
    const res = await axios.get("forumUser/thread/${threadId}/replies");
    if (res.status !== 200) {
      throw new Error('Failed to fetch replies');
    }
    return res.data;
  } catch (error) {
    console.error('Error in fetching replies:', error);
    throw error;
  }
};