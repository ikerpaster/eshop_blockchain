import React, { useCallback, useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import {
  IoIosHeadset,
  IoIosCart,
  IoIosBriefcase,
  IoIosPhonePortrait,
  IoIosFlag,
} from "react-icons/io";
// h
function TopHeader() {
  const { LOGO } = useContext(AmazonContext);
  const styles = {
    container: `w-full h-10 bg-gradient-to-t from-blue-500 to-white fixedd  z-50 md:relative`,
    logoLink: `md:hidden flex items-center w-[40%]`,
    logo: `mr-3 h-6 sm:h-9 w-[50%] rounded-md`,
    CompanyName: `self-center text-xl font-semibold whitespace-nowrap dark:text-white`,
  };
  return (
    <>
      <div
        className={`${styles.container} flex justify-between px-4 pt-2 font-sans text-gray-600 text-sm mb-0 `}
      >
        <div className="hidden md:flex">
          <span className="hidden md:flex md:justify-center gap-3">
            <IoIosHeadset fontSize={20} />{" "}
            <span className="hidden md:flex"> Request a callback </span>
            <span className="hidden md:flex">
              <IoIosPhonePortrait fontSize={20} />
              089393
            </span>
          </span>{" "}
        </div>
        <a href="http://localhost:3000/" className={styles.logoLink}>
          <img src={LOGO} className={styles.logo} alt="IKER SHOP Logo" />
          <span className={styles.CompanyName}>IKER-SHOP</span>
        </a>

        <div className="flex gap-16 md:gap-3">
          <a href="/spaces/my_spaces">
            <span className="flex text-bold">
              <IoIosBriefcase fontSize={20} /> SPACES
            </span>
          </a>
          <span className="  flex">
            <IoIosCart fontSize={20} /> Buy order
          </span>{" "}
          <span className="hidden md:block"> | </span>
          <span className="hidden md:flex">
            {" "}
            <IoIosFlag fontSize={20} />
            flag
          </span>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
