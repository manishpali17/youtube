import { apiClient } from "@/utils/axios";

const createPlaylist = async (data:{name: string, description: string}) => {
  try {
    const res = await apiClient.post("/playlist",data);
    return res.data;
  } catch (error) {
    console.error("Error in createPlaylist:", error);
    throw error;
  }
};

const getUserPlaylists = async (userId: string) => {
  try {
    const res = await apiClient.get(`/playlist/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getUserPlaylists:", error);
    throw error;
  }
};

const getPlaylistById = async (playlistId: string) => {
  try {
    const res = await apiClient.get(`/playlist/${playlistId}`);
    return res.data;
  } catch (error) {
    console.error("Error in getPlaylistById:", error);
    throw error;
  }
};

const addVideoToPlaylist = async (data:{playlistId: string, videoId: string}) => {
  try {
    const res = await apiClient.patch(`/playlist/${data.playlistId}/add/${data.videoId}`);
    return res.data;
  } catch (error) {
    console.error("Error in addVideoToPlaylist:", error);
    throw error;
  }
};

const removeVideoFromPlaylist = async (data:{playlistId: string, videoId: string}) => {
  try {
    const res = await apiClient.patch(
      `/playlist/${data.playlistId}/remove/${data.videoId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error in removeVideoFromPlaylist:", error);
    throw error;
  }
};

const deletePlaylist = async (playlistId: string) => {
  try {
    const res = await apiClient.delete(`/playlist/${playlistId}`);
    return res.data;
  } catch (error) {
    console.error("Error in deletePlaylist:", error);
    throw error;
  }
};

const updatePlaylist = async (
  playlistId: string,
  name: string,
  description: string
) => {
  try {
    const res = await apiClient.patch(`/playlist/${playlistId}`, {
      name,
      description,
    });
    return res.data;
  } catch (error) {
    console.error("Error in updatePlaylist:", error);
    throw error;
  }
};

export {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
