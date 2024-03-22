import React from "react";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { GiFilmStrip, GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";

interface SidebarProps {
  className: string;
  toggleSidebar: () => void;
}

interface LinkItem {
  icon: JSX.Element;
  name: string;
}

export default function Sidebar({
  className,
  toggleSidebar,
}: SidebarProps): JSX.Element {
  const mainLinks: LinkItem[] = [
    { icon: <MdHomeFilled className="text-xl" />, name: "Home" },
    { icon: <FaRegCompass className="text-xl" />, name: "Explore" },
    { icon: <MdOutlineSlowMotionVideo className="text-xl" />, name: "Shorts" },
    { icon: <MdSubscriptions className="text-xl" />, name: "Subscriptions" },
  ];

  const secondaryLinks: LinkItem[] = [
    { icon: <MdOutlineVideoLibrary className="text-xl" />, name: "Library" },
    { icon: <MdHistory className="text-xl" />, name: "History" },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: "Your Videos",
    },
    { icon: <MdOutlineWatchLater className="text-xl" />, name: "Watch Later" },
    { icon: <MdThumbUpOffAlt className="text-xl" />, name: "Liked Videos" },
  ];

  const subscriptionLinks: LinkItem[] = [
    { icon: <TbMusic className="text-xl" />, name: "Music" },
    { icon: <MdOutlineSportsVolleyball className="text-xl" />, name: "Sport" },
    { icon: <TbDeviceGamepad2 className="text-xl" />, name: "Gaming" },
    { icon: <GiFilmStrip className="text-xl" />, name: "Films" },
  ];

  const helpLinks: LinkItem[] = [
    { icon: <MdSettings className="text-xl" />, name: "Settings" },
    { icon: <MdOutlinedFlag className="text-xl" />, name: "Report history" },
    { icon: <MdOutlineHelpOutline className="text-xl" />, name: "Help" },
    { icon: <MdOutlineFeedback className="text-xl" />, name: "Send feedback" },
  ];

  const textLinks: string[][] = [
    [
      "About",
      "Press",
      "Copyright",
      "Contact us",
      "Creator",
      "Advertise",
      "Developers",
    ],
    [
      "Terms",
      "Privacy",
      "Policy & Safety",
      "How YouTube works",
      "Test new features",
    ],
  ];

  const renderLinks = (links: LinkItem[]) => (
    <ul className="flex flex-col border-b-2 ">
      {links.map(({ icon, name }) => (
        <li
          key={name}
          className={`pl-6 py-3 ${name === "Home" ? "bg-slate-600" : ""}`}
        >
          <a href="#" className="flex items-center gap-5">
            {icon}
            <span className="text-sm tracking-wider dark:bg-white">{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  const renderTextLinks = (links: string[], index: number) => (
    <ul key={index} className="flex gap-2 flex-wrap dark:bg-white text-sm p-4 ">
      {links.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );

  return (
    <div
      className={`hidden sm:block sm:w-[240px] h-screen transition-transform -translate-x-full dark:bg-black  bg-white z-40 fixed top-0 bottom-0 overflow-auto pt-1 pb-8 sidebar ${className}`}
    >
      <div className="p-4 flex items-center gap-6 h-12">
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu className="text-2xl dark:bg-white ml-2" />
        </button>
        <div className="flex items-center p-1 gap-1">
          <Link href="/">
            <BsYoutube className="text-2xl text-red-600" />
          </Link>
          <span className="text-xl dark:bg-white font-medium">YouTube</span>
        </div>
      </div>
      {renderLinks(mainLinks)}
      {renderLinks(secondaryLinks)}
      {renderLinks(subscriptionLinks)}
      {renderLinks(helpLinks)}
      {textLinks.map((links, index) => renderTextLinks(links, index))}
      <span className="px-4 text-sm dark:bg-white">&copy; 2024 Google</span>
      <br />
      <p className="px-4 pt-3 text-sm dark:bg-white">
        This clone is for educational purpose only.
      </p>
    </div>
  );
}
