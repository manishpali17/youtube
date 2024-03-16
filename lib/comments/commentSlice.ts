import { createAppSlice } from "../createAppSlice";
import {
  createComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "./commentAPI";

export interface commentState {
  status: "idle" | "loading" | "failed";
  comments: any[];
  totalComments: number;
  hasNextPage: boolean;
}

const initialState: commentState = {
  status: "idle",
  comments: [],
  totalComments: 0,
  hasNextPage: false,
};
const commentSlice = createAppSlice({
  name: "comment",
  initialState,
  reducers: (create) => ({
    createcomment: create.asyncThunk(
      async (data) => {
        const response = await createComment(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.comments.unshift(action.payload);
          state.totalComments++;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getvideocomment: create.asyncThunk(
      async (videoId) => {
        const response = await getVideoComments(videoId);
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
    updatecomment: create.asyncThunk(
      async (data) => {
        const response = await updateComment(data);
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
    deletecomment: create.asyncThunk(
      async (commentId) => {
        const response = await deleteComment(commentId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.comments = state.comments.filter(
            (comment) => comment._id !== action.payload.commentId
          );
          state.totalComments--;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectComments: (state) => {
      state.comments;
    },
    selectHasNextPage: (state) => {
      state.hasNextPage;
    },
    selectTotalComments: (state) => {
      state.totalComments;
    },
  },
});
export const { selectComments, selectHasNextPage, selectTotalComments } =
  commentSlice.selectors;
export const { createcomment, updatecomment, deletecomment, getvideocomment } =
  commentSlice.actions;
