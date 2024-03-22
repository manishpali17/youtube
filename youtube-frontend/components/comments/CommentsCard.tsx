"use client";
import Image from "next/image";
import Link from "next/link";
import { Comment } from "@/utils/types";
import { getVideoAge } from "@/utils/helper";
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function CommentsCard({ comment }: { comment: Comment }) {
  const [showReplies, setShowReplies] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const toggleShowAllReplies = () => {
    setShowAllReplies((prev) => !prev);
  };

  return (
    <>
      <div className="w-full flex items-center mt-4">
        <div className="flex w-full h-fit gap-2">
          <div className="min-w-12">
            <div className="relative h-10 w-10 ml-1.5">
              <Link href={comment.owner._id}>
                <Image
                  fill
                  src={comment.owner.avatar}
                  alt={comment.owner.fullName}
                  sizes="2.25rem"
                  className="rounded-full mr-3"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className="text-sm font-semibold">
                @{comment.owner.username}
              </div>
              <span className="text-xs">{getVideoAge(comment.createdAt)}</span>
            </div>
            <div>
              <span className="text-sm">{comment.content}</span>
            </div>
            <div className="flex gap-3 items-center mt-2">
              <button className="flex items-center gap-2">
                {comment.isLiked ? (
                  <AiFillLike className="text-2xl" />
                ) : (
                  <AiOutlineLike className="text-2xl" />
                )}
                <span className="text-xs"> {comment.likesOnComment}</span>{" "}
              </button>
              <button className="flex items-center">
                <AiOutlineDislike className="text-2xl" />
                <span></span>
              </button>
              <button className="ml-2 hover:bg-slate-200 px-3 py-1 rounded-full">
                {" "}
                <span className="font-semibold text-xs">Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Button */}
      <div className="flex ml-16 mt-2">
        <button
          className="text-blue-500 text-sm p-2 rounded-full font-semibold flex items-center gap-3 hover:bg-blue-100 focus:outline-none"
          onClick={toggleReplies}
        >
          <BiSolidDownArrow />
          <span>{comment?.replies?.length} replies</span>
        </button>
      </div>

      {/* Render Replies based on showReplies */}
      {showReplies && (
        <div>
          {comment.replies
            .slice(0, showAllReplies ? comment.replies.length : 10)
            .map((reply) => (
              <div key={reply._id} className="ml-16 flex flex-col ">
                <div className="flex w-full h-fit">
                  <div className="min-w-10">
                    <div className="relative h-6 w-6">
                      <Link href={reply._id}>
                        <Image
                          fill
                          src={reply.owner.avatar}
                          alt={comment.owner.fullName}
                          sizes="2.25rem"
                          className="rounded-full mr-3"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <div className="text-sm font-semibold">
                        @{reply.owner.username}
                      </div>
                      <span className="text-xs">
                        {getVideoAge(reply.createdAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">{reply.content}</span>
                    </div>
                    <div className="flex gap-3 items-center mt-2">
                      <button className="flex items-center gap-2">
                        {reply.isLiked ? (
                          <AiFillLike className="text-2xl" />
                        ) : (
                          <AiOutlineLike className="text-2xl" />
                        )}
                        <span className="text-xs"> {reply.likesOnComment}</span>{" "}
                      </button>
                      <button className="flex items-center">
                        <AiOutlineDislike className="text-2xl" />
                        <span></span>
                      </button>
                      <button className="ml-2 hover:bg-slate-200 px-3 py-1 rounded-full">
                        {" "}
                        <span className="font-semibold text-xs">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Show More Replies Button */}
          {comment.replies.length > 10 && !showAllReplies && (
            <div className="flex justify-center mt-2">
              <button
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={toggleShowAllReplies}
              >
                Show More Replies
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
