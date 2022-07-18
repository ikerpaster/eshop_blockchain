import React, { useContext } from "react";
import { AmazonContext } from "../../context/AmazonContext";
import { IoIosClose } from "react-icons/io";
import { HashLoader } from "react-spinners";
import { useMoralis } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Buy_SP_Modal = ({ close }) => {
  const { getPackage, isLoading, setIsLoading, OWNER_WALLET, CHAIN_WALLET } =
    useContext(AmazonContext);
  const { Moralis, account } = useMoralis();
  const styles = {
    loaderContainer: `w-full h-[500px] flex items-center justify-center`,
    closeX: `w-full h-full flex items-center justify-end mb-[10px] `,
    box: ` duration-300 rounded-md  p-4 h-[300px]  bg-gradient-to-r  from-blue-500 to-yellow-100 overflow-hidden    `,
    cardBody: `w-[200px] h-[200px] rounded-full bg-gradient-to-r   from-blue-500 to-yellow-100 border-1 shadow-black shadow-s  items-center p-2 text-center 
      hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white 
      hover:animate-pulse`,
    currency: `block mt-16 text-md text-bold text-blue-900 hover:text-orange-500`,
    pesa: `font-bold text-8xl mt-3 text-gray-900 `,
    buttonYalla: `mt-2 w-[70%] bg-gradient-to-t from-blue-500 to-black p-2 rounded-sm font-bold text-orange-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-orange-500 `,
  };
  const handlePayment = async (getPackage) => {
    const pkg = getPackage;
    let pkg_name = "none";
    if (pkg == 1) {
      pkg_name = "Standard Investor";
    }

    if (pkg == 30) {
      pkg_name = "Minor Investor";
    }

    if (pkg == 30) {
      pkg_name = "Medium Investor";
    }
    if (pkg == 30) {
      pkg_name = "Class Investor";
    }
    console.log("the space Name: " + pkg_name);
    // Get The Price of MATIC
    const options = {
      address: CHAIN_WALLET,
      chain: "eth",
    };

    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic = parseInt(getPackage) / price.usdPrice;
    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(priceMatic),
      receiver: OWNER_WALLET,
    };
    let result = await Moralis.transfer(options1);

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Spaces");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("sp_name", pkg_name);
    transaction.set("sp_price", parseInt(getPackage));
    transaction.set("created_at", new Date());

    transaction.save();
    setIsLoading(false);
    toast("Transaction Done Succesfully!");
    window.location.reload(false);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className={styles.loaderContainer}>
            <HashLoader size={80} />
          </div>
        </>
      ) : (
        <>
          <ToastContainer />
          <div className={styles.closeX}>
            <span className="w-fit h-fit bg-red-600 mt-[-25px] ml-[30px] rounded-full text-white animate-pulse ">
              <IoIosClose
                onClick={() => {
                  close();
                }}
                fontSize={50}
                className="cursor-pointer"
              />
            </span>
          </div>

          <div className={styles.box}>
            <div className={styles.cardBody}>
              <span className={styles.currency}>USD</span>
              <span className={styles.pesa}>{getPackage}</span>
            </div>
            <button
              className={styles.buttonYalla}
              onClick={() => {
                handlePayment(getPackage);
                setIsLoading(true);
              }}
            >
              PAY
            </button>
          </div>
        </>
      )}
      ;
    </>
  );
};

export default Buy_SP_Modal;
