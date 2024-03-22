"use client";
import SearchResult from "@/components/video/videoResult";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllVideos,
  removeVideos,
  selectHasNextPage,
  selectNextPage,
  selectStatus,
  selectVideos,
} from "@/lib/video/videoSlice";
import { useEffect } from "react";

export default function SearchResultPage({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
  };
}) {
  const query = searchParams?.search_query || "";
  const dispatch = useAppDispatch();
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
    dispatch(getAllVideos({ query: query, limit: 50 }));
  }, [dispatch, query]);

  return (
    <>
      <SearchResult
        videos={videos}
        loadMore={loadMore}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
