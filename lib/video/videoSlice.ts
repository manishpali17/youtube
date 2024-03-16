import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteVideo,
  getAllVideo,
  getVideoById,
  togglePublishStatus,
  updateVideo,
  uploadVideo,
} from "@/lib/video/videoAPI";
import { DetailVideo, Video, VideoResponseData } from "@/utils/types";

export interface VideoState {
  videos: Video[];
  video: DetailVideo | null;
  hasNextPage: boolean;
  nextPage: number | null;
  status: "idle" | "loading" | "failed";
}

const initialState: VideoState = {
  videos: [],
  video: null,
  hasNextPage: false,
  status: "idle",
  nextPage: 0,
};

export const videoSlice = createAppSlice({
  name: "video",
  initialState,
  reducers: (create) => ({
    removeVideos: create.reducer((state) => {
      state.videos = [];
    }),
    getAllVideos: create.asyncThunk(
      async ({ userId, sortBy, sortType, query, page, limit }) => {
        const response = await getAllVideo({
          userId,
          sortBy,
          sortType,
          query,
          page,
          limit,
        });
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<VideoResponseData>) => {
          state.status = "idle";
          state.videos = [...state.videos, ...action.payload.Videos];
          state.hasNextPage = action.payload.hasNextPage;
          state.nextPage = action.payload.nextPage;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    publishVideo: create.asyncThunk(
      async (data) => {
        const response = await uploadVideo(data);
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
    videoById: create.asyncThunk(
      async (data) => {
        const response = await getVideoById(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<DetailVideo>) => {
          state.status = "idle";
          state.video = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updateVideoDetails: create.asyncThunk(
      async (data) => {
        const response = await updateVideo(data);
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
    deleteVideoWithId: create.asyncThunk(
      async (data) => {
        const response = await deleteVideo(data);
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
    togglePublicPrivet: create.asyncThunk(
      async (data) => {
        const response = await togglePublishStatus(data);
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
    selectVideos: (state) => state.videos,
    selectStatus: (state) => state.status,
    selectHasNextPage: (state) => state.hasNextPage,
    selectVideo: (state) => state.video,
    selectNextPage: (state) => state.nextPage,
  },
});

export const {
  selectHasNextPage,
  selectStatus,
  selectVideo,
  selectVideos,
  selectNextPage,
} = videoSlice.selectors;

export const {
  getAllVideos,
  updateVideoDetails,
  videoById,
  deleteVideoWithId,
  publishVideo,
  togglePublicPrivet,
  removeVideos,
} = videoSlice.actions;
