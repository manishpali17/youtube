import { createAppSlice } from "@/lib/createAppSlice";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
} from "./playlistAPI";

export interface playlistState {
  status: "idle" | "loading" | "failed";
}

const initialState: playlistState = {
  status: "idle",
};

export const playlistSlice = createAppSlice({
  name: "playlist",
  initialState,
  reducers: (create) => ({
    createplaylist: create.asyncThunk(
      async (data) => {
        const response = await createPlaylist(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getuserplaylists: create.asyncThunk(
      async (userId) => {
        const response = await getUserPlaylists(userId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getplaylistbyid: create.asyncThunk(
      async (playlistId) => {
        const response = await getPlaylistById(playlistId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    addvideotoplaylist: create.asyncThunk(
      async (data) => {
        const response = await addVideoToPlaylist(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    removevideofromplaylist: create.asyncThunk(
      async (data) => {
        const response = await removeVideoFromPlaylist(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    deleteplaylist: create.asyncThunk(
      async (data) => {
        const response = await deletePlaylist(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updatePlaylist: create.asyncThunk(
      async (data) => {
        const response = await deletePlaylist(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
  },
});

export const {
  createplaylist,
  getplaylistbyid,
  getuserplaylists,
  addvideotoplaylist,
  removevideofromplaylist,
  deleteplaylist,
  updatePlaylist,
} = playlistSlice.actions;
