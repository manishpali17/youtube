import { createAppSlice } from "@/lib/createAppSlice";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "./subscriptionAPI";

export interface subscriptionState {
  channelSubscribers: string[];
  SubscribedByUser: [];
  status: "idle" | "loading" | "failed";
}

const initialState: subscriptionState = {
  channelSubscribers: [],
  status: "idle",
  SubscribedByUser: [],
};

export const subscriptionSlice = createAppSlice({
  name: "subscription",
  initialState,
  reducers: (create) => ({
    togglesubscription: create.asyncThunk(
      async (channelId) => {
        const response = await toggleSubscription(channelId);
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
    getuserchannelsubscribers: create.asyncThunk(
      async (channelId) => {
        const response = await getUserChannelSubscribers(channelId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.channelSubscribers = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getsubscribedchannels: create.asyncThunk(
      async (subscriberId) => {
        const response = await getSubscribedChannels(subscriberId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.SubscribedByUser = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectSubscribedByUser: (state) => state.SubscribedByUser,
    selectStatus: (state) => state.status,
    selectChannelSubscribers: (state) => {
      state.channelSubscribers;
    },
  },
});

export const {
  selectChannelSubscribers,
  selectStatus,
  selectSubscribedByUser,
} = subscriptionSlice.selectors;

export const {
  getsubscribedchannels,
  getuserchannelsubscribers,
  togglesubscription,
} = subscriptionSlice.actions;
