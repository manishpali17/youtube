"use client";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllVideos,
  removeVideos,
  selectHasNextPage,
  selectNextPage,
  selectStatus,
  selectVideo,
  selectVideos,
  videoById,
} from "@/lib/video/videoSlice";
import SuggestionVideoCard from "./videoSuggestion";
import { getVideoAge } from "@/utils/helper";
import InfiniteScroll from "react-infinite-scroller";
import { ClimbingBoxLoader } from "react-spinners";
import GetComments from "../comments/getComments";

const VideoDetails = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const video = useAppSelector(selectVideo);
  const videos = useAppSelector(selectVideos);
  const status = useAppSelector(selectStatus);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const nextPage = useAppSelector(selectNextPage);

  const loadMore = () => {
    if (hasNextPage && status === "idle" && nextPage !== null) {
      dispatch(getAllVideos({ page: nextPage }));
    }
  };

  useEffect(() => {
    dispatch(removeVideos());
    dispatch(videoById(id));
    //add categoies to getallvideos
    dispatch(getAllVideos({}));
  }, [dispatch, id]);

  if (!video) {
    return (
      <div className="flex items-center h-screen justify-center w-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] dark:bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
          <div className="h-[200px] md:h-[45%] max-h-[500px]  ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={video?.videoFile.url}
              controls={true}
              width="100%"
              height="100%"
              style={{
                backgroundColor: "#000000",
                borderRadius: "15px",
                overflow: "auto",
              }}
              playing={true}
            />
          </div>
          <div className="dark:text-white font-bold text-sm md:text-2xl mt-4 line-clamp-2">
            {video.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <Image
                    className="h-full w-full object-cover"
                    src={video.owner.avatar}
                    height={44}
                    width={44}
                    alt={video.owner.fullName}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="dark:text-white text-md font-semibold flex items-center">
                  {video.owner.fullName}
                </div>
                <div className="dark:text-white/[0.7] text-sm">
                  {video.owner.subscribersCount} subscribers
                </div>
              </div>
              <div className=" flex justify-center items-center ml-5">
                <button className="h-full w-full border rounded-full bg-black px-5  text-white">
                  {video.owner.isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>
            <div className="flex dark:text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 gap-2 rounded-3xl bg-slate-200">
                <div className="flex items-center justify-center">
                  {video.isLiked ? (
                    <AiFillLike className="text-xl dark:text-white mr-2" />
                  ) : (
                    <AiOutlineLike className="text-xl dark:text-white mr-2" />
                  )}
                  {`${abbreviateNumber(video.likesOnVideo, 2)} Likes`}
                </div>
                <div className="bg-black w-[1px] h-6"></div>
                <div className="flex items-center justify-center">
                  <AiOutlineDislike className="text-xl dark:text-white mr-2" />{" "}
                  0
                </div>
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4"></div>
            </div>
          </div>
          <div className="w-full flex mt-5 rounded-lg h-fit bg-slate-200">
            <div className="flex-1">
              <div className="flex items-center justify-start text-sm gap-2 font-bold p-2">
                <div>{`${abbreviateNumber(video.views, 2)} Views`}</div>
                <div>{getVideoAge(video.createdAt)}</div>
              </div>
              <div className="p-2 pt-1">{video.description}</div>
            </div>
          </div>
          <GetComments videoId={id} />
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasNextPage}
            loader={
              <div
                className="loader flex h-svh items-center justify-center"
                key={0}
              >
                <ClimbingBoxLoader color={"#ff0000"} loading={true} />
              </div>
            }
          >
            {videos.map((video, index) => {
              return <SuggestionVideoCard key={index} video={video} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
