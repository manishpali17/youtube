import { apiClient } from "@/utils/axios";

const getChannelStats = async () => {
  try {
    const res = await apiClient.get("/dashboard/stats");
    return res.data;
  } catch (error) {
    console.error("Error in getChannelStats:", error);
    throw error;
  }
};

const getChannelVideos = async (channelId: string) => {
  try {
    const res = await apiClient.get(`/videos/${channelId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getChannelVideos:", error);
    throw error;
  }
};

export { getChannelStats, getChannelVideos };
