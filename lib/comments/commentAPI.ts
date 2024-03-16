import { apiClient } from "@/utils/axios";

const createComment = async (data: { content: string; videoId: string }) => {
  try {
    const res = await apiClient.post(`/comments/${data.videoId}`, data);
    return res.data;
  } catch (error) {
    console.error("Error in createComment:", error);
    throw error;
  }
};

const getVideoComments = async ({
  videoId,
  page,
  limit,
}: {
  videoId: string;
  page: number;
  limit: number;
}) => {
  try {
    const url = new URL(`${process.env.BASE_URL}/comments/${videoId}`);
    if (page) url.searchParams.set("page", page.toString());
    if (limit) url.searchParams.set("limit", limit.toString());
    const res = await apiClient.get(url.toString());
    return res.data;
  } catch (error) {
    console.error("Error in getVideoComments:", error);
    throw error;
  }
};

const updateComment = async (data: { commentId: string; content: string }) => {
  try {
    const res = await apiClient.patch(
      `/comments/${data.commentId}`,
      data.content
    );
    return res.data;
  } catch (error) {
    console.error("Error in updateComment:", error);
    throw error;
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const res = await apiClient.delete(`/comments/${commentId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deleteComment:", error);
    throw error;
  }
};

export { createComment, updateComment, deleteComment, getVideoComments };
