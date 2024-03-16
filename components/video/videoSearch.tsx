import React from "react";
import Link from "next/link";
import { abbreviateNumber } from "js-abbreviation-number";

import { getVideoAge, getVideoDuration } from "@/utils/helper";
import Image from "next/image";
import { Video } from "@/utils/types";

const SearchResultVideoCard = ({ video }: { video: Video }) => {
  return (
    <Link href={`/watch/${video._id}}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-slate-200/[0.1] rounded-xl md:p-4">
        <div className="relative  shrink-0  md:h-28 lg:h-72  w-full md:w-48 lg:w-2/5 max-w-[500px]  max-h-[290px] rounded-xl bg-slate-800 overflow-hidden">
          <Image
            className="h-full w-full object-cover"
            src={video?.thumbnail?.url}
            alt={video.title}
            fill
            sizes="40%"
            priority
          />
          <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
            {getVideoDuration(video.duration)}
          </span>
        </div>
        <div className="flex flex-col flex-1 ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-2xl font-semibold line-clamp-2 dark:text-white">
            {video?.title}
          </span>
          <div className="flex text-xs font-semibold dark:text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(video?.views, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold dark:text-white/[0.7] relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{getVideoAge(video.createdAt)}</span>
          </div>

          <div className="hidden mt-3 md:flex items-center">
            <div className="flex items-start mr-3">
              <div className="flex relative h-9 w-9 rounded-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover"
                  src={video?.owner?.avatar}
                  alt={video.owner.fullName}
                  fill
                  sizes="2.25rem"
                />
              </div>
            </div>
            <div className="flex ">
              <span className="text-sm font-semibold mt-1 darK:text-white/[0.7] flex items-center">
                {video?.owner.fullName}
              </span>
            </div>
          </div>
          <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 dark:text-white/[0.7] md:pr-24 md:my-4">
            {video?.description}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultVideoCard;
