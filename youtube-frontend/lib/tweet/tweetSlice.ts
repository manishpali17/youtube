import { createAppSlice } from "@/lib/createAppSlice";
import { createTweet, deleteTweet, getAllTweet, updateTweet } from "./tweetAPI";
import exp from "constants";

export interface tweetState {
  tweets: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: tweetState = {
  tweets: [],
  status: "idle",
};

export const tweetSlice = createAppSlice({
  name: "tweet",
  initialState,
  reducers: (create) => ({
    getalltweet: create.asyncThunk(
      async (userId) => {
        const response = await getAllTweet(userId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.tweets = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    createtweet: create.asyncThunk(
      async (data) => {
        const response = await createTweet(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.tweets.unshift(action.payload);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updatetweet: create.asyncThunk(
      async (data) => {
        const response = await updateTweet(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.tweets = [...state.tweets, action.payload];
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    deletetweet: create.asyncThunk(
      async (data) => {
        const response = await deleteTweet(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.tweets = state.tweets.filter(
            (tweet) => tweet._id !== action.payload
          );
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectTweets: (state) => state.tweets,
    selectStatus: (state) => state.status,
  },
});

export const { selectStatus, selectTweets } = tweetSlice.selectors;

export const { createtweet, getalltweet, updatetweet, deletetweet } =
  tweetSlice.actions;
