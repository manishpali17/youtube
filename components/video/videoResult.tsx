import React from "react";

import SearchResultVideoCard from "./videoSearch";
import { Video } from "@/utils/types";
import InfiniteScroll from "react-infinite-scroller";
import { ClimbingBoxLoader } from "react-spinners";
import Subsidebar from "../subsidebar";

export default function SearchResult({
  videos,
  loadMore,
  hasNextPage,
}: {
  videos: Video[];
  loadMore: () => void;
  hasNextPage: boolean;
}) {
  //   useEffect(() => {
  //     document.getElementById("root").classList.remove("custom-h");
  //     fetchSearchResults();
  //   }, [searchQuery]);

  return (
    <>
      <Subsidebar />
      <div className="flex justify-center items-center ml-14 mt-3   h-full overflow-y-auto dark:bg-black">
        <div className="grid grid-cols-1 gap-2 p-5 w-full">
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
            {videos?.map((video) => {
              return <SearchResultVideoCard key={video._id} video={video} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
