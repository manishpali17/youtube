import { createAppSlice } from "@/lib/createAppSlice";
import {
  getUserLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "./likeAPI";

export interface likeState {
  likedVideos: [];
  status: "idle" | "loading" | "failed";
}

const initialState: likeState = {
  status: "idle",
  likedVideos: [],
};

export const likeSlice = createAppSlice({
  name: "like",
  initialState,
  reducers: (create) => ({
    togglevideolike: create.asyncThunk(
      async (videoId) => {
        const response = await toggleVideoLike(videoId);
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
    togglecommentlike: create.asyncThunk(
      async (commentId) => {
        const response = await toggleCommentLike(commentId);
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
    toggletweetlike: create.asyncThunk(
      async (tweetId) => {
        const response = await toggleTweetLike(tweetId);
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
    getuserlikedvideos: create.asyncThunk(
      async (data) => {
        const response = await getUserLikedVideos();
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.likedVideos = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectLikedVideos: (state) => state.likedVideos,
    selectStatus: (state) => state.status,
  },
});

export const { selectLikedVideos, selectStatus } = likeSlice.selectors;

export const {
  togglecommentlike,
  toggletweetlike,
  togglevideolike,
  getuserlikedvideos,
} = likeSlice.actions;
