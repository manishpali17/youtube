"use client";

import { HomeSkeleton } from "@/components/sceleton/homeSekelton";
import Videocard from "@/components/video/videoCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllVideos,
  removeVideos,
  selectHasNextPage,
  selectNextPage,
  selectStatus,
  selectVideos,
} from "@/lib/video/videoSlice";
import { Suspense, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ClimbingBoxLoader } from "react-spinners";
import Subsidebar from "@/components/subsidebar";

export default function Home() {
  const videos = useAppSelector(selectVideos);
  const status = useAppSelector(selectStatus);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const nextPage = useAppSelector(selectNextPage);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (hasNextPage && status === "idle" && nextPage !== null) {
      dispatch(getAllVideos({ page: nextPage }));
    }
  };

  useEffect(() => {
    // Fetch initial videos when the component mounts
    dispatch(removeVideos())
    dispatch(getAllVideos({}));
  }, [dispatch]);
  return (
    <>
      <Subsidebar />
      <Suspense fallback={<HomeSkeleton />}>
        <div className="flex sm:mt-3 items-center justify-evenly sm:ml-14 overflow-auto">
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
            <div className="grid sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
              {videos.map((video) => (
                <Videocard key={video._id} data={video} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </Suspense>
    </>
  );
}
