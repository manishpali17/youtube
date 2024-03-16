import {
  MdHomeFilled,
  MdSubscriptions,
  MdHistory,
  MdThumbUpOffAlt,
  MdOutlineVideoLibrary,
  MdOutlineSmartDisplay,
} from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";

export default function Subsidebar() {
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-2xl dark:bg-white" />,
      href: "",
    },
    {
      icon: <FaRegCompass className="text-2xl dark:bg-white" />,
      href: "",
    },
    {
      icon: <MdSubscriptions className="text-2xl dark:bg-white" />,
      href: "",
    },
    {
      icon: <MdHistory className="text-2xl dark:bg-white" />,
      href: "",
    },
    {
      icon: <MdThumbUpOffAlt className="text-2xl dark:bg-white" />,
      href: "",
    },
  ];
  return (
    <>
      <div
        className={` md:w-14 h-screen hidden sm:block bg-white dark:bg-black fixed top-12 bottom-0 overflow-auto sidebar`}
      >
        <ul className="flex flex-col">
          {mainLinks.map(({ icon }, index) => {
            return (
              <li key={index} className={`pl-6 py-3`}>
                <a href="#" className="flex items-center gap-5 ">
                  {icon}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sm:hidden fixed flex items-center border-t justify-evenly bottom-0 w-full h-12">
        <div className="flex flex-col items-center justify-center ">
          <MdHomeFilled className="text-2xl" />
          <span className="text-xs dark:bg-white">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <MdOutlineVideoLibrary className="text-2xl" />
          <span className="text-xs dark:bg-white">Library</span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <MdSubscriptions className="text-2xl dark:bg-white" />
          <span className="text-xs dark:bg-white">Subscriptions</span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <MdOutlineSmartDisplay className="text-2xl dark:bg-white" />
          <span className="text-xs dark:bg-white">Your Video</span>
        </div>
      </div>
    </>
  );
}
