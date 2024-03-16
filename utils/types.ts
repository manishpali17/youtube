export interface VideoOwner {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
}

export interface VideoFile {
  fileName: string;
  url: string;
}

export interface VideoThumbnail {
  fileName: string;
  url: string;
}

export interface Video {
  _id: string;
  videoFile: VideoFile;
  thumbnail: VideoThumbnail;
  owner: VideoOwner;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  __v?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VideoResponseData {
  Videos: Video[];
  totalVideos: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface VideosApiResponse {
  statusCode: number;
  data: VideoResponseData;
  message: string;
  success: boolean;
}
export interface VideoApiResponse {
  statusCode: number;
  data: Video;
  message: string;
  success: boolean;
}
export type DetailVideo = {
  _id: string;
  videoFile: {
    fileName: string;
    url: string;
  };
  thumbnail: {
    fileName: string;
    url: string;
  };
  owner: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
    subscribersCount: number;
    isSubscribed: boolean;
  };
  title: string;
  description: string;
  duration: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesOnVideo: number;
  isLiked: boolean;
};
