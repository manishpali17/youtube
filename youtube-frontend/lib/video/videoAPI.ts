import { apiClient } from "@/utils/axios";

const getAllVideo = async ({
  userId,
  sortBy,
  sortType,
  query,
  page,
  limit,
}: {
  userId: string;
  sortBy: string;
  sortType: string;
  query: string;
  page: string;
  limit: string;
}) => {
  try {
    const url = new URL(`${process.env.SERVER_URI}/videos`);

    if (userId) url.searchParams.set("userId", userId);
    if (query) url.searchParams.set("query", query);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);
    if (sortBy && sortType) {
      url.searchParams.set("sortBy", sortBy);
      url.searchParams.set("sortType", sortType);
    }
    const res = await apiClient.get(url.toString());
    return res.data;
  } catch (error) {
    console.error("Error in getAllVideo:", error);
    throw error;
  }
};

const uploadVideo = async (data: {
  title: string;
  description: string;
  videoFile: File;
  thumbnail: File;
  owner: string;
  isPublished: boolean;
}) => {
  try {
    const formData = new FormData();
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("owner", data.owner);
    formData.append("isPublished", `${data.isPublished}`);

    const res = await apiClient.post("/videos", formData);
    return res.data;
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    throw error;
  }
};

const getVideoById = async (videoId: string) => {
  try {
    const res = await apiClient.get(`/videos/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getVideoById:", error);
    throw error;
  }
};

const deleteVideo = async (videoId: string) => {
  try {
    const res = await apiClient.delete(`/videos/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deleteVideo:", error);
    throw error;
  }
};

const updateVideo = async (data: {
  videoId: string;
  title: string;
  description: string;
  videoFile: File;
  thumbnail: File;
  owner: string;
  isPublished: boolean;
}) => {
  try {
    const formData = new FormData();
    formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("owner", data.owner);
    const res = await apiClient.patch(`/videos/${data.videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in updateVideo:", error);
    throw error;
  }
};

const togglePublishStatus = async (videoId: string) => {
  try {
    const res = await apiClient.patch(`/videos/toggle/publish/${videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in togglePublishStatus:", error);
    throw error;
  }
};

export {
  getAllVideo,
  getVideoById,
  updateVideo,
  uploadVideo,
  deleteVideo,
  togglePublishStatus,
};
