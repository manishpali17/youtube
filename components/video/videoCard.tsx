import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Video } from "@/utils/types";
import { getVideoAge, getVideoDuration } from "@/utils/helper";

export default function Videocard({ data }: { data: Video }) {
  return (
    <div className="w-80 h-72 flex gap-3 flex-col">
      <div className="relative">
        <span className="absolute bottom-2 right-2 bg-gray-900 text-white p-0.5 px-1 rounded-sm z-5 text-xs">
          {getVideoDuration(data.duration)}
        </span>
        <Link href={`/watch/${data._id}`}>
          <Image
            src={data.thumbnail.url || ""}
            alt="thumbnail"
            height={200}
            width={320}
            className="rounded-lg h-48 w-96"
          />
        </Link>
      </div>
      <div className="flex h-full gap-2">
        <div className="min-w-fit">
          <Link href="#">
            <Image
              src={data.owner.avatar || ""}
              alt="channel"
              className="h-9 w-9 rounded-full"
              height={36}
              width={36}
            />
          </Link>
        </div>
        <div>
          <h3>
            <a href="#" className="text-xl font-semibold line-clamp-2">
              {data.title}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <a href="#" className="hover:text-white">
                {data.owner.fullName}
              </a>
            </div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.views} views
              </span>
              <span>{getVideoAge(data.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
