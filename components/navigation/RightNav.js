import React, { useContext, useState, useEffect } from "react";
import { AmazonContext } from "../../context/AmazonContext";
import Router from "next/router";
import Dots from "./Dots";
// import { IoIosDots } from "react-icons/io";
function LeftNav() {
  const { categories } = useContext(AmazonContext);
  function sendProps(cat) {
    Router.push({
      pathname: "/categories",
      query: {
        cat,
      },
    });
  }
  const [rightMenu, setRightMenu] = useState(false);
  const handelRightMenu = () => {
    // alert("ok");
    setRightMenu((e) => !e);
  };
  return (
    <>
      <div className="flex justify-end  h-full md:hidden lg:hidden">
        {rightMenu && (
          <div
            className="w-[80px] mt-[100px] mr-3 rounded-full h-[300px] bg-gray-500/20  z-50 
        border-2 border-gray-600 shadow-md shadow-black fixed
        
        "
          >
            <ul className="w-full h-full  pt-5 pl-3 ">
              {categories.map((cat) => {
                return (
                  <button
                    key={cat.attributes.cat_name}
                    onClick={() => {
                      sendProps(cat.attributes.cat_name);
                    }}
                  >
                    {" "}
                    <div className="flex ">
                      <img
                        src={cat.attributes.image_presentation}
                        className="w-[50px] h-[50px] mt-5 rounded-md shadow-gray-500 shadow-md 
                    hover:scale-150 hover:duration-500 hover:rounded-full relative"
                      />
                      <div className="absolute text-[10px] text-center w-fit ml-px text-black font-bold mt-10">
                        {cat.attributes.cat_name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </ul>
          </div>
        )}
        <div className="w-[80px] h-[15px]  mr-3  rounded-full bottom-20 z-50 fixed items-center pl-3 pb-2 bg-blue-500/20 shadow-black shadow-md">
          <span
            className="text-center flex gap-3 items-center relative scale-1 hover:duration-500 cursor-pointer"
            onClick={handelRightMenu}
          >
            <Dots />
            <Dots />
            <Dots />
          </span>
        </div>
      </div>
    </>
  );
}

export default LeftNav;
