import { Comment, CommentData } from "@/utils/types";
import { createAppSlice } from "../createAppSlice";
import {
  addReplyToComment,
  createComment,
  deleteComment,
  deleteReply,
  getVideoComments,
  updateComment,
  updateReply,
} from "./commentAPI";
import { PayloadAction } from "@reduxjs/toolkit";

export interface commentState {
  status: "idle" | "loading" | "failed";
  comments: Comment[];
  totalComments: number;
  nextPage: number | null;
  hasNextPage: boolean;
}

const initialState: commentState = {
  status: "idle",
  comments: [],
  totalComments: 0,
  hasNextPage: false,
  nextPage: 0,
};
export const commentSlice = createAppSlice({
  name: "comments",
  initialState,
  reducers: (create) => ({
    removeComments: create.reducer((state) => {
      state.comments = [];
    }),
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
    getvideocomments: create.asyncThunk(
      async ({ videoId }) => {
        const response = await getVideoComments({videoId});
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<CommentData>) => {
          state.status = "idle";
          state.comments = [...state.comments, ...action.payload.comments];
          state.hasNextPage = action.payload.hasNextPage;
          state.nextPage = action.payload.nextPage;
          state.totalComments = action.payload.totalComments;
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
        fulfilled: (state, action) => {
          state.status = "idle";
          const updatedCommentIndex = state.comments.findIndex(
            (comment) => comment._id === action.payload._id
          );
          if (updatedCommentIndex !== -1) {
            state.comments[updatedCommentIndex] = action.payload;
          }
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
    addreplytocomment: create.asyncThunk(
      async (data) => {
        const response = await addReplyToComment(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";

          state.totalComments--;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updatereply: create.asyncThunk(
      async ({ replyId, content }: { replyId: string; content: string }) => {
        const response = await updateReply({ replyId, content });
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
    deletereply: create.asyncThunk(
      async (replyId) => {
        const response = await deleteReply(replyId);
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
    selectComments: (state) => state.comments,
    selectHasNextPage: (state) => state.hasNextPage,
    selectTotalComments: (state) => state.totalComments,
    selectNextPage: (state) => state.nextPage,
  },
});
export const { selectComments, selectHasNextPage, selectTotalComments, selectStatus ,selectNextPage } =
  commentSlice.selectors;
export const {
  removeComments,
  createcomment,
  updatecomment,
  deletecomment,
  getvideocomments,
} = commentSlice.actions;
