import React, { useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";

import Cards from "./Cards";
import Featured from "./Featured";
import OurAds from "./ourAds";
import Header from "./Header";

const Main = () => {
  const styles = {
    container: `h-full w-full flex flex-col  overflow-hidden `,
    recentTitle: `text-2xl font-bold text-center mb-[20px] text-center mt-[40px]`,
    recentTransactionsList: `flex flex-col`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[0px]`,
    transactionCard: `flex justify-between mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl`,
  };
  const { recentTransactions } = useContext(AmazonContext);

  return (
    <div className={styles.container}>
      <Header />
      <Featured />
      <div className="md:mx-16 lg:mx-16 w-fit h-full">
        <OurAds />
        <div className={styles.title}>New Release</div>
        <Cards thCate={false} />
      </div>

      {recentTransactions.length > 0 && (
        <h1 className={styles.recentTitle}>Recent Transaction</h1>
      )}
      {recentTransactions &&
        recentTransactions.map((transaction, index) => {
          console.log(transaction);
          return (
            <div key={index} className={styles.recentTransactionsList}>
              <div className={styles.transactionCard}>
                <p>From: {transaction.attributes.from_address}</p>
                <p>To: {transaction.attributes.to_address} </p>
                <p>
                  Hash:{" "}
                  <a
                    target={"_blank"}
                    rel="noopener noreferrer"
                    href={`https://rinkeby.etherscan.io/tx/${transaction.attributes.hash}`}
                  >
                    {transaction.attributes.hash.slice(0, 10)}
                  </a>
                </p>
                <p>Gas: {transaction.attributes.gas}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Main;
