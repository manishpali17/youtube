"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCurrentUserDetails, selectUser } from "@/lib/user/userSlice";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoArrowLeft } from "react-icons/go";
import { navigate } from "@/lib/action";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRefMobile = React.useRef<HTMLInputElement>(null);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCurrentUserDetails(""));
  }, [dispatch]);

  const toggleInput = () => {
    setIsInputClicked(!isInputClicked);
    if (!isInputClicked && inputRefMobile.current) {
      inputRefMobile.current.focus();
    }
  };

  const clearSearchQuery = (ref: React.RefObject<HTMLInputElement>) => {
    setSearchQuery("");
    if (ref.current) {
      ref.current.focus();
    }
  };

  const searchQueryHandler = (searchQuery: string) => {
    navigate(searchQuery);
  };
  return (
    <>
      <NavigationMenu className="max-w-full sm:block hidden w-full bg-white dark:bg-black sticky top-0 h-12 px-4 pb-2 pt-1">
        <div className="flex items-center justify-between w-full pb-4 bg-white">
          <NavigationMenuItem className="flex gap-4 items-center text-2xl">
            <button onClick={onToggleSidebar}>
              <GiHamburgerMenu className="ml-2 dark:bg-white" />
            </button>
            <div className="flex gap-1 items-center justify-center">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ class: "gap-1" })}
                >
                  <BsYoutube className="text-2xl text-red-600" />
                  <span className="text-xl font-medium">YouTube</span>
                </NavigationMenuLink>
              </Link>
            </div>
          </NavigationMenuItem>
          <div className="group flex items-center">
            <div className="flex items-center h-8 md:h-10 md:ml-10 md:pl-3 border shadow-inner border-[#ccc] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
              <div className="w-10 p-3 items-center justify-center hidden group-focus-within:md:flex">
                <IoIosSearch className="dark:text-white text-xl" />
              </div>
              <input
                type="text"
                ref={inputRef}
                className="bg-transparent outline-none dark:text-white px-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                placeholder="Search"
                autoCorrect="off"
                spellCheck="false"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    searchQueryHandler(searchQuery);
                  }
                }}
                value={searchQuery}
              />
              {searchQuery.length > 0 ? (
                <button
                  onClick={() => {
                    clearSearchQuery(inputRef);
                  }}
                >
                  <AiOutlineClose className="text-2xl rounded-full bg-slate-100" />
                </button>
              ) : (
                ""
              )}
            </div>
            <button
              className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center border border-[#ccc] justify-center rounded-r-3xl bg-slate-100"
              onClick={() => searchQueryHandler(searchQuery)}
            >
              <IoIosSearch className="dark:text-white text-xl" />
            </button>
            <div className=" p-3 text-xl rounded-full ml-3 bg-slate-100">
              <TiMicrophone />
            </div>
          </div>
          {user ? (
            <Link href="/" legacyBehavior passHref>
              <div className="rounded-full relative w-10 h-10">
                <Image
                  src={user?.avatar || ""}
                  alt="logo"
                  fill
                  sizes="2.25rem"
                  className="rounded-full bg-slate-300"
                />
              </div>
            </Link>
          ) : (
            <div className="flex items-center hover:bg-blue-100 text-xl gap-1 border p-2 rounded-full">
              <FaRegUserCircle color="#065fd4" />
              <span className="text-sm text-[#065fd4] font-bold">Sign in</span>
            </div>
          )}
        </div>
      </NavigationMenu>

      {/* mobile navbar */}

      <NavigationMenu className="max-w-full sm:hidden p-2 h-10 dark:bg-black pt-0 block w-full sticky top-0">
        <div
          className={`flex items-center justify-between w-full ${
            isInputClicked ? "hidden" : "block"
          }`}
        >
          <NavigationMenuItem className="flex items-center justify-center text-2xl -ml-4">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ class: "gap-1" })}
              >
                <BsYoutube className="text-3xl text-red-600" />
                <span className="text-xl font-medium dark:bg-white">
                  YouTube
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-2 items-center text-xl">
              <button
                className="h-10 w-16 flex items-center justify-center"
                onClick={toggleInput}
              >
                <IoIosSearch className="text-2xl dark:bg-white" />
              </button>
              {user ? (
                <div className="relative h-7 w-7">
                  <Image
                    src={user?.avatar || ""}
                    className="rounded-full"
                    alt="logo"
                    fill
                    sizes="2.25rem"
                  />
                </div>
              ) : (
                <div className="flex items-center hover:bg-blue-100 text-xl gap-1 border p-2 rounded-full">
                  <FaRegUserCircle color="#065fd4" />
                  <span className="text-sm text-[#065fd4] font-bold">
                    Sign in
                  </span>
                </div>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        <NavigationMenuItem
          className={`flex w-full flex-row transition-transform -translate-x-full  duration-0 items-center p-2 justify-between pt-1  group ${
            isInputClicked ? "translate-x-0" : ""
          } `}
        >
          <GoArrowLeft
            className="text-2xl dark:bg-white"
            onClick={toggleInput}
          />
          <div className="flex  items-center bg-slate-200 py-1 px-3 rounded-full border group-focus-within:border-blue-500 ">
            <input
              ref={inputRefMobile}
              type="text"
              placeholder="Search youtube"
              className="bg-slate-200 rounded-full focus:outline-none"
              autoCorrect="off"
              spellCheck="false"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            {searchQuery.length > 0 ? (
              <button
                onClick={() => {
                  clearSearchQuery(inputRefMobile);
                }}
              >
                <AiOutlineClose className="text-xl font-thin mr-3 dark:bg-white" />
              </button>
            ) : (
              ""
            )}
            <button onClick={() => searchQueryHandler(searchQuery)}>
              <IoIosSearch className="text-2xl dark:bg-white" />
            </button>
          </div>
          {searchQuery.length === 0 ? (
            <button>
              <TiMicrophone className="text-2xl cursor-pointer dark:bg-white" />
            </button>
          ) : (
            ""
          )}
        </NavigationMenuItem>
      </NavigationMenu>
    </>
  );
}
