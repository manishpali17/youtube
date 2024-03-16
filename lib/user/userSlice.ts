import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "@/utils/localStorage";
import {
  changePassword,
  channelProfile,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  removeVideoFromHistory,
  updateAvatar,
  updateCoverImage,
  updateUserDetails,
  watchHistory,
} from "@/lib/user/userAPI";

export interface apiresposne {
  statusCode: number;
  data: unknown;
  message: string;
  success: boolean;
}
export interface userInterface {
  _id?: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string | null;
  watchHistory?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface userState {
  user: userInterface | null;
  accessToken: string | null;
  channelProfile?: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: userState = {
  user: null,
  status: "idle",
  accessToken: null,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    register: create.asyncThunk(
      async (data) => {
        const response = await registerUser(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<userState>) => {
          state.status = "idle";
          state.user = action.payload.user;
          LocalStorage.clear();
          LocalStorage.set("token", action.payload.accessToken);
          LocalStorage.set("user", action.payload.user);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    login: create.asyncThunk(
      async (data) => {
        const response = await loginUser(data);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<userState>) => {
          state.status = "idle";
          state.user = action.payload.user;
          LocalStorage.clear();
          LocalStorage.set("token", action.payload.accessToken);
          LocalStorage.set("user", action.payload.user);
        },
        rejected: (state) => {
          state.status = "failed";
          LocalStorage.clear();
          state.user=null;
        },
      }
    ),
    logout: create.asyncThunk(
      async () => {
        const response = await logoutUser();
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "idle";
          state.user = null;
          LocalStorage.clear();
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    changeUserPassword: create.asyncThunk(
      async ({ oldPassword, newPassword }) => {
        const response = await changePassword({ oldPassword, newPassword });
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
    updateDetails: create.asyncThunk(
      async ({ email, fullName }) => {
        const response = await updateUserDetails({ email, fullName });
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload?.user;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updateUserAvatar: create.asyncThunk(
      async (avatar: File) => {
        const response = await updateAvatar(avatar);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload?.user;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updateUserCoverImage: create.asyncThunk(
      async (coverImage: File) => {
        const response = await updateCoverImage(coverImage);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload?.user;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    removeVideoFromHistoryUser: create.asyncThunk(
      async (videoId: string) => {
        const response = await removeVideoFromHistory(videoId);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload?.user;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getCurrentUserDetails: create.asyncThunk(
      async () => {
        const response = await getCurrentUser();
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload?.user;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    refreshTokenUser: create.asyncThunk(
      async () => {
        const response = await refreshToken();
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.accessToken = action.payload?.accessToken;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    getWatchHistory: create.asyncThunk(
      async () => {
        const response = await watchHistory();
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          if (state.user !== null) {
            state.user.watchHistory = action.payload?.watchHistory;
          }
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    channelProfileOfUser: create.asyncThunk(
      async (username) => {
        const response = await channelProfile(username);
        console.log(response);
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUser: (state) => state.user,
    selectStatus: (state) => state.status,
    selectProfile: (state) => state.channelProfile,
  },
});

// Action creators are generated for each case reducer function.
export const {
  register,
  login,
  logout,
  refreshTokenUser,
  removeVideoFromHistoryUser,
  getCurrentUserDetails,
  getWatchHistory,
  updateUserAvatar,
  updateDetails,
  updateUserCoverImage,
  changeUserPassword,
  channelProfileOfUser,
} = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUser, selectStatus, selectProfile } = userSlice.selectors;
