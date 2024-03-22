import { apiClient } from "@/utils/axios";

const toggleVideoLike = async (videoId: string) => {
  try {
    const res = await apiClient.post(`/likes/toggle/v/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in toggleVideoLike:", error);
    throw error;
  }
};

const toggleCommentLike = async (commentId: string) => {
  try {
    const res = await apiClient.post(`/likes/toggle/c/${commentId}`);
    return res.data;
  } catch (error) {
    console.error("Error in toggleCommentLike:", error);
    throw error;
  }
};

const toggleTweetLike = async (tweetId: string) => {
  try {
    const res = await apiClient.post(`/likes/toggle/t/${tweetId}`);
    return res.data;
  } catch (error) {
    console.error("Error in toggleTweetLike:", error);
    throw error;
  }
};

const getUserLikedVideos = async () => {
  try {
    const res = await apiClient.post(`/likes/videos`);
    return res.data;
  } catch (error) {
    console.error("Error in getUserLikedVideos:", error);
    throw error;
  }
};

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getUserLikedVideos,
};
