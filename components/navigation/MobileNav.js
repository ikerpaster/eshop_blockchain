import React, { useState } from "react";
import {
  IoIosCamera,
  IoIosHome,
  IoIosSettings,
  IoIosCart,
  IoIosPerson,
} from "react-icons/io";
const Navigation = () => {
  const Menus = [
    { name: "Home", icon: <IoIosHome />, dis: "translate-x-0" },
    { name: "Profile", icon: <IoIosPerson />, dis: "translate-x-16" },
    { name: "Message", icon: <IoIosCart />, dis: "translate-x-32" },
    { name: "Photos", icon: <IoIosCamera />, dis: "translate-x-48" },
    { name: "Settings", icon: <IoIosSettings />, dis: "translate-x-64" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="bg-gradient-to-t from-black to-blue-500 max-h-[4.4rem] px-6 rounded-t-xl  bottom-0 fixed z-50 w-[80%] md:hidden lg:hidden">
      <ul className="flex relative">
        <span
          className={`bg-gradient-to-t from-white to-black duration-500 ${Menus[active].dis} 
            h-[60px] w-[60px] absolute animate-pulse
         -top-5 rounded-full`}
        ></span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6 items-center"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 text-white ${
                  i === active && "-mt-4 text-black text-lg"
                }`}
              >
                {menu.icon}
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-5 duration-700 opacity-100 text-gray-500 font-bold"
                    : "opacity-0 translate-y-10 font-bold text-gray-600"
                } `}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
