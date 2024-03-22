import { apiClient } from "@/utils/axios";

const toggleSubscription = async (channelId: string) => {
  try {
    const res = await apiClient.post(`/subscriptions/c/${channelId}`);
    return res.data;
  } catch (error) {
    console.error("Error in toggleSubscription:", error);
    throw error;
  }
};

const getUserChannelSubscribers = async (channelId: string) => {
  try {
    const res = await apiClient.get(`/subscriptions/c/${channelId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getUserChannelSubscribers:", error);
    throw error;
  }
};

const getSubscribedChannels = async (subscriberId: string) => {
  try {
    const res = await apiClient.get(`/subscriptions/u/${subscriberId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getSubscribedChannels:", error);
    throw error;
  }
};

export { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription };
