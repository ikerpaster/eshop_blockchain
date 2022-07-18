import React, { useContext } from "react";
import { AmazonContext } from "../../context/AmazonContext";
import "react-simple-hook-modal/dist/styles.css";

import SPACES from "./SPACES.js";
function Home() {
  const { G_styles } = useContext(AmazonContext);

  const styles = {
    container: ` w-full h-full mb-[100px]`,
    catBody: ` h-full p-6 md:mx-16 lg:mx-16 `,
    catContent: `w-full grid md:grid-cols-3 gap-5 grid-cols-1`,
    card: `w-full h-[300px] bg-blue-300 p-20 rounded-md hover:bg-blue-100`,
    cardTitle: `text-2xl mb-4 border-b-2 border-white text-gray-700`,
    cardCols: `grid grid-cols-3 justify-evenly  gap-3`,
  };

  return (
    <>
      <div className={styles.container}>
        <span className={G_styles.page}>SPACES</span>
        <hr />
        <div className={styles.catBody}>
          {" "}
          <div className={styles.catContent}>
            <SPACES
              spaceName="Minor Investors"
              cash1="1"
              cash2="50"
              cash3="100"
            />

            <SPACES
              spaceName="Medium Investors"
              cash1="250"
              cash2="500"
              cash3="1000"
            />

            <SPACES
              spaceName="Class Investors"
              cash1="2500"
              cash2="5000"
              cash3="10000"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
