import { apiClient } from "@/utils/axios";

console.log(apiClient.defaults.baseURL);

const loginUser = async (userData: {
  username?: string;
  email?: string;
  password: string;
}) => {
  try {
    const res = await apiClient.post("/users/login", userData);
    return res.data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

const registerUser = async (userData: {
  username: string;
  email: string;
  fullName: string;
  password: string;
  avatar: File;
  coverImage: File | null;
}) => {
  const formData = new FormData();

  formData.append("username", userData.username);
  formData.append("fullName", userData.fullName);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("avatar", userData.avatar);
  if (userData.coverImage !== null) {
    formData.append("coverImage", userData.coverImage);
  }
  try {
    const res = await apiClient.post("/users/register", formData);
    return res.data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    const res = await apiClient.post("/users/logout");
    return res.data;
  } catch (error) {
    console.error("Error in logoutUser:", error);
    throw error;
  }
};

const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await apiClient.post("/users/change-password", data);
    return res.data;
  } catch (error) {
    console.error("Error in changePassword:", error);
    throw error;
  }
};

const updateUserDetails = async (data: { email: string; fullName: string }) => {
  try {
    const res = await apiClient.patch("/users/update-user-details", data);
    return res.data;
  } catch (error) {
    console.error("Error in updateUserDetails:", error);
    throw error;
  }
};

const updateAvatar = async (avatar: File) => {
  const formData = new FormData()

  formData.append("avatar",avatar)

  try {
    const res = await apiClient.patch("/users/update-avatar", formData);
    return res.data;
  } catch (error) {
    console.error("Error in updateAvatar:", error);
    throw error;
  }
};

const updateCoverImage = async (coverImage: File) => {
  const formData = new FormData();

  formData.append("coverImage", coverImage);
  try {
    const res = await apiClient.patch("/users/update-cover-image", formData);
    return res.data;
  } catch (error) {
    console.error("Error in updateCoverImage:", error);
    throw error;
  }
};

const deleteAccount = async () => {
  try {
    const res = await apiClient.delete("/users/delete-user");
    return res.data;
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    throw error;
  }
};

const removeVideoFromHistory = async (videoId: string) => {
  try {
    const res = await apiClient.patch(`/users/history/remove-video/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in removeVideoFromHistory:", error);
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const res = await apiClient.get("/users/getuser");
    return res.data;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const res = await apiClient.get("/users/refresh-token");
    return res.data;
  } catch (error) {
    console.error("Error in refreshToken:", error);
    throw error;
  }
};

const watchHistory = async () => {
  try {
    const res = await apiClient.get("/users/history");
    return res.data.data;
  } catch (error) {
    console.error("Error in WatchHistory:", error);
    throw error;
  }
};

const channelProfile = async (username: string) => {
  try {
    const res = await apiClient.get(`/users/c/${username}`);
    return res.data.data;
  } catch (error) {
    console.error("Error in channelProfile:", error);
    throw error;
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser,
  watchHistory,
  channelProfile,
  changePassword,
  updateAvatar,
  updateCoverImage,
  updateUserDetails,
  removeVideoFromHistory,
  deleteAccount,
};
