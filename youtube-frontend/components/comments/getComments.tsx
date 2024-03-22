import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getvideocomments,
  removeComments,
  selectComments,
  selectHasNextPage,
  selectNextPage,
  selectStatus,
  selectTotalComments,
} from "@/lib/comments/commentSlice";
import { ClimbingBoxLoader } from "react-spinners";
import CommentsCard from "./CommentsCard";
import { MdOutlineSort } from "react-icons/md";
import Image from "next/image";
import { selectUser } from "@/lib/user/userSlice";
import { FaUser } from "react-icons/fa";

export default function GetComments({ videoId }: { videoId: string }) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const status = useAppSelector(selectStatus);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const nextPage = useAppSelector(selectNextPage);
  const totalComments = useAppSelector(selectTotalComments);
  const currentUser = useAppSelector(selectUser);

  const loadMore = () => {
    if (hasNextPage && status === "idle" && nextPage !== null) {
      dispatch(getvideocomments({ page: nextPage, videoId: videoId }));
    }
  };
  useEffect(() => {
    dispatch(removeComments());
    dispatch(getvideocomments({ videoId }));
  }, [dispatch, videoId]);
  return (
    <>
      <div className="flex flex-col mt-3 overflow-y-auto">
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-5">
            <span className="font-bold text-xl">{totalComments}</span>
            <div className="flex items-center gap-2">
              <button>
                <MdOutlineSort size={25} />
              </button>
              <span className="text-sm font-semibold">Sort by</span>
            </div>
          </div>
          <div className="mt-4 flex gap-5">
            <div className="h-10 ml-2 w-10 rounded-full">
              {" "}
              {currentUser ? (
                <Image
                  src={currentUser.avatar}
                  placeholder="empty"
                  alt={currentUser.fullName}
                  width={40}
                  height={40}
                  className="rounded-full h-full w-full"
                />
              ) : (
                <FaUser />
              )}
            </div>
            <div className="flex flex-col w-full">
              <input type="text" placeholder="add comment" />
              <div className="h-[1px] bg-black"></div>
            </div>
          </div>
        </div>
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
          className="w-full flex flex-col mt-4"
        >
          {comments.map((comment, index) => {
            return <CommentsCard key={index} comment={comment} />;
          })}
        </InfiniteScroll>
      </div>
    </>
  );
}
