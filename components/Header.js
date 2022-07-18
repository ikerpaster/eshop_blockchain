import React, { useContext, useState } from "react";

import Image from "next/image";
import { AmazonContext } from "../context/AmazonContext";
import "react-simple-hook-modal/dist/styles.css";

import { ConnectButton } from "web3uikit";
import { IoIosCart, IoIosPerson } from "react-icons/io";
import Navigation from "./navigation/MobileNav";
import LeftNav from "./navigation/LeftNav";
import RightNav from "./navigation/RightNav";
import Router from "next/router";

const Header = () => {
  const styles = {
    nav: `mt-px rounded-bl-full rounded-br-full md:mt-0 md:rounded bg-white border-gray-200 px-2  py-2.5 dark:bg-gray-800 w-full relative `,
    container: `container flex flex-wrap justify-between items-center mx-auto `,
    logoLink: `hidden md:flex items-center`,
    logo: `mr-3 h-6 sm:h-9 w-[50%] rounded-md`,
    setInfoCard: `sm:hidden absolute md:mt-48 ml-24 z-50 bg-gradient-to-r from-cyan-900 to-blue-200 p-5 rounded-lg shadow-black shadow-md`,
    welcome: ` text-md  font-bold text-sm text-white md:ml-6`,
    usernameInput: ` p-2 border-2 border-cyan-100 rounded-full shadow-white shadow-sm`,
    setNicknameBTN: `  mt-2  border-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold p-3 rounded-md shadow-gray-400 shadow-sm`,
    CompanyName: `self-center text-xl font-semibold whitespace-nowrap dark:text-white`,
    searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
    menu: `flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium`,
    profile: `w-8 h-8 rounded-full`,
    menuItem: `hidden md:block lg:block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
    font-bold capitalize `,
  };

  const {
    isAuthenticated,
    nickname,
    setNickname,
    username,
    handleSetUsername,
    categories,
    LOGO,
  } = useContext(AmazonContext);

  function sendProps(cat) {
    Router.push({
      pathname: "/categories",
      query: {
        cat,
      },
    });
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <a href="http://localhost:3000/" className={styles.logoLink}>
            <img src={LOGO} className={styles.logo} alt="IKER SHOP Logo" />
            <span className={styles.CompanyName}>IKER-SHOP</span>
          </a>
          <div className="flex items-center md:order-2 gap-5 relative">
            <span className="hidden md:block text-[#ff9912] ">
              <IoIosCart fontSize={30} className="" />{" "}
            </span>
            <span className="hidden md:block absolute top-[-8px] text-white font-bold ml-6">
              0
            </span>
            {isAuthenticated && (
              <>
                {!username ? (
                  <>
                    <div className={styles.setInfoCard}>
                      <div className={styles.username}>
                        <input
                          type="text"
                          placeholder="Username...."
                          className={styles.usernameInput}
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                      </div>
                      <div className="w-full flex justify-center">
                        <button
                          className={styles.setNicknameBTN}
                          onClick={handleSetUsername}
                        >
                          Set Nickname
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className={`${styles.welcome} ml-3`}>
                      <IoIosPerson /> {username}
                    </div>
                  </div>
                )}
              </>
            )}
            <div>
              <ConnectButton />
            </div>

            <div className={styles.profilePicContainer}>
              <Image
                src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                alt="profile"
                className={styles.profile}
                height={30}
                width={30}
              />
            </div>
          </div>
          <div>
            <ul className={styles.menu}>
              {categories.map((cat) => {
                return (
                  <button
                    key={cat.attributes.cat_name}
                    className={styles.menuItem}
                    onClick={() => {
                      sendProps(cat.attributes.cat_name);
                    }}
                  >
                    {" "}
                    {cat.attributes.cat_name}
                  </button>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* <div className="w-full h-fit bg-red-500 bottom-0 fixed z-50 md:hidden "> */}
      <Navigation />

      <LeftNav />

      <RightNav />
      {/* </div> */}
    </>
  );
};

export default Header;
