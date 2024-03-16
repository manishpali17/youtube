import { apiClient } from "@/utils/axios";

const getAllTweet = async (userId: string) => {
  try {
    const res = await apiClient.get(`/tweet/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getAllTweet:", error);
    throw error;
  }
};

const deleteTweet = async (tweetId: string) => {
  try {
    const res = await apiClient.delete(`/tweet/${tweetId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deleteTweet:", error);
    throw error;
  }
};

const updateTweet = async (data: {
  tweetId: string;
  content: string;
}) => {
  try {
    const res = await apiClient.patch(`/tweet/${data.tweetId}`, data);
    return res.data;
  } catch (error) {
    console.error("Error in updateTweet:", error);
    throw error;
  }
};

const createTweet = async (data: { content: string; owner: string }) => {
  try {
    const res = await apiClient.post("/tweet", data);
    return res.data;
  } catch (error) {
    console.error("Error in createTweet:", error);
    throw error;
  }
};

export { createTweet, updateTweet, deleteTweet, getAllTweet };
