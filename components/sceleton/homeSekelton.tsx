import React from "react";

export function VideoCard() {
  return (
    <>
      <div className="w-80 h-72 flex gap-3 flex-col bg-slate-300">
        <div className="flex h-full gap-2">
          <div className="min-w-fit h-9 w-9 rounded-full"></div>
        </div>
      </div>
    </>
  );
}

export function HomeSkeleton() {
  return (
    <>
      <div className="flex sm:mt-3 items-center justify-evenly sm:ml-14 overflow-auto">
        <div className="grid sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
          <VideoCard />
        </div>
      </div>
    </>
  );
}
