import { createAppSlice } from "../createAppSlice";
import { getChannelStats, getChannelVideos } from "./dashboardAPI";

export interface dashboardState {
  status: "idle" | "loading" | "failed";
  channelVideos: [];
  stats: {
    totalVideos: number;
    totalViews: number;
    totalLikesOnVideo: number;
    totalSubscriber: number;
  };
}

const initialState: dashboardState = {
  status: "idle",
  channelVideos: [],
  stats: {
    totalLikesOnVideo: 0,
    totalSubscriber: 0,
    totalVideos: 0,
    totalViews: 0,
  },
};
const dashboardSlice = createAppSlice({
  name: "dashboard",
  initialState,
  reducers: (create) => ({
    getchannelstats: create.asyncThunk(
      async () => {
        const response = await getChannelStats();
        console.log(response);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.stats = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getchannelvideos: create.asyncThunk(
      async (channelId) => {
        const response = await getChannelVideos(channelId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.channelVideos = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectChannelVideos: (state) => state.channelVideos,
    selectStatus: (state) => state.status,
    selectStats: (state) => state.stats,
  },
});

export const { selectChannelVideos, selectStatus, selectStats } =
  dashboardSlice.selectors;
export const { getchannelstats, getchannelvideos } = dashboardSlice.actions;
