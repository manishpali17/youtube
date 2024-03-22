import { apiClient } from "@/utils/axios";

const createComment = async ({
  content,
  videoId,
}: {
  content: string;
  videoId: string;
}) => {
  try {
    const res = await apiClient.post(`/comments/${videoId}`, content);
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
  sortType,
}: {
  videoId: string;
  page?: number;
  limit?: number;
  sortType?: string;
}) => {
  try {
    const url = new URL(`${process.env.SERVER_URI}/comments/${videoId}`);
    if (page) url.searchParams.set("page", page.toString());
    if (limit) url.searchParams.set("limit", limit.toString());
    if (sortType) url.searchParams.set("sortType", sortType.toString());
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
      `/comments/c/${data.commentId}`,
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
    const res = await apiClient.delete(`/comments/c/${commentId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deleteComment:", error);
    throw error;
  }
};

const addReplyToComment = async ({
  content,
  parentCommentId,
}: {
  content: string;
  parentCommentId: string;
}) => {
  try {
    const res = await apiClient.post(`comments/r/${parentCommentId}`, content);
    return res.data;
  } catch (error) {
    console.error("Error in adding reply to Comment:", error);
    throw error;
  }
};
const updateReply = async ({
  replyId,
  content,
}: {
  replyId: string;
  content: string;
}) => {
  try {
    const res = await apiClient.patch(`comments/reply/${replyId}`, content);
    return res.data;
  } catch (error) {
    console.error("Error in Updating reply:", error);
    throw error;
  }
};
const deleteReply = async (replyId: string) => {
  try {
    const res = await apiClient.delete(`comments/reply/${replyId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deleting reply:", error);
    throw error;
  }
};

export {
  createComment,
  updateComment,
  deleteComment,
  getVideoComments,
  addReplyToComment,
  updateReply,
  deleteReply,
};
