import React from "react";

const SUB_SPACE = ({ cash, btnClick, boxClick }) => {
  const styles = {
    box: `transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300`,
    cardBody: `h-[90px] w-[90px]  md:w-full md:h-16 lg:w-full lg:h-16 rounded-full bg-gradient-to-r  from-blue-500 to-yellow-100 border-1 shadow-black shadow-s items-center p-6 md:p-2 lg:p-2 text-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:animate-pulse`,
    currency: `block text-sm text-bold text-gray-700 hover:text-orange-500`,
    pesa: `font-bold text-1xl`,
    buttonYalla: `mt-2 w-full bg-gradient-to-t from-blue-500 to-black p-2 rounded-sm font-bold text-orange-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 `,
  };
  return (
    <>
      <div className={styles.box} onClick={boxClick}>
        <div className={styles.cardBody}>
          <span className={styles.currency}>USD</span>
          <span className={styles.pesa}>{cash}</span>
        </div>
        <button className={styles.buttonYalla} onClick={btnClick}>
          Yalla
        </button>
      </div>
    </>
  );
};

export default SUB_SPACE;
