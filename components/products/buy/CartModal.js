import React, { useContext, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { AmazonContext } from "../../../context/AmazonContext";
import { HashLoader } from "react-spinners";
import { useMoralis } from "react-moralis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BuyModal = ({ close }) => {
  const { Moralis, account } = useMoralis();

  const styles = {
    container: `h-full w-full flex flex-col `,
    modalContainer: `w-fit h-fit bg-red-600 mt-[-25px] ml-[30px] rounded-full text-white animate-pulse`,
    closeX: `w-full h-[10px] flex items-center justify-end mb-[10px] `,
    title: ``,
    ProductName: `text-md font-bold items-start font-sans uppercase mt-2 text-gray-800`,
    sameInfoToClientAboutThisProd: `mr-2 border border-t-1 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700 text-sm`,
    inStock: `text-yellow-800 md:text-green-600 lg:text-green-600 text-sm font-bold`,
    payNowBTN: `p-2 bg-blue-500 rounded-md text-gray-300 font-bold border-2 border-blue-500 shadow-md shadow-black animate-bounce`,

    content: `flex w-full mb-[30px] text-xl justify-center`,
    input: `w-[50%] h-[50px] bg-[#f7f6f2] rounded-lg p-[10px] flex mx-auto`,
    inputBox: `w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none`,
    price: `w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl`,
    buyBtn: `w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center items-center cursor-pointer`,
    loaderContainer: `w-full h-[500px] flex items-center justify-center`,
    loader: `w-full h-full flex items-center justify-center`,
    etherscan: `w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer`,
    success: `w-full h-full flex items-center justify-center text-xl mt-[20px] font-bolder`,
  };
  const {
    setAmountDue,
    tokenAmount,
    setTokenAmount,
    isLoading,
    setIsLoading,
    setEtherscanLink,
    count_item,
    singleAsset,
    OWNER_WALLET,
    CHAIN_WALLET,
  } = useContext(AmazonContext);
  useEffect(() => {
    calculatePrice();
  }, [tokenAmount]);

  const calculatePrice = () => {
    const price = parseFloat(tokenAmount * 0.0001);
    price = price.toFixed(4);
    setAmountDue(price);
  };

  const handlePayment = async (pprice, prodID, quantity) => {
    // Get The Price of MATIC
    const options = {
      address: CHAIN_WALLET,
      chain: "eth",
    };

    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic =
      (parseInt(pprice) / price.usdPrice) * parseInt(count_item);

    const ttp = parseInt(price) * parseInt(count_item);

    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(priceMatic),
      receiver: OWNER_WALLET,
    };
    let result = await Moralis.transfer(options1);
    console.log("the result::=> " + result);

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Purchased_Products");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("prodID", parseInt(prodID));
    transaction.set("quantity", parseInt(quantity));
    transaction.set("tot_price", ttp);

    transaction.save();
    setIsLoading(false);
    toast("Transaction Done Succesfully!");
  };

  const handlePaymentP_SPACES = async (pprice, prodID, quantity) => {
    // Get The Price of MATIC
    const options = {
      address: CHAIN_WALLET,
      chain: "eth",
    };

    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic =
      (parseInt(pprice) / price.usdPrice) * parseInt(count_item);

    const ttp = parseInt(price) * parseInt(count_item);

    const options1 = {
      type: "native",
      amount: Moralis.Units.ETH(priceMatic),
      receiver: OWNER_WALLET,
    };
    let result = await Moralis.transfer(options1);

    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("SPACES_Products");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("prodID", parseInt(prodID));
    transaction.set("quantity", parseInt(quantity));
    transaction.set("tot_price", ttp);

    transaction.save();
    setIsLoading(false);
    toast("Transaction Done Succesfully!");
  };
  // ending the spaces func to pay

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <div className={styles.loaderContainer}>
            <HashLoader size={80} />
          </div>
        </>
      ) : (
        <>
          <ToastContainer />
          {singleAsset &&
            singleAsset.map((e, index) => {
              return (
                <>
                  <div className={styles.closeX} key={e.attributes.prodID}>
                    <span className={styles.modalContainer}>
                      <IoIosClose
                        onClick={() => {
                          close();
                          setAmountDue("");
                          setTokenAmount("");
                          setEtherscanLink("");
                        }}
                        fontSize={50}
                        className="cursor-pointer"
                      />
                    </span>
                  </div>
                  <div className="w-full md:bg-gray-100 lg:bg-gray-100 flex justify-start p-4 gap-2">
                    <div className="hidden md:block w-[30%] h-52 p-3 overflow-hidden">
                      <img
                        src={e.attributes.src}
                        className="w-fit h-fit rounded-sm"
                      />
                    </div>
                    <div className="w-full h-full bg-gradient-to-t from-black to-white pl-5 pt-px pb-3">
                      <div className={styles.ProductName}>
                        {e.attributes.name}
                        <br />
                      </div>
                      <span className={styles.inStock}>In Stock</span>

                      <div class={styles.sameInfoToClientAboutThisProd}>
                        <p>
                          Or 3 interest-free instalments every month of USD
                          2,058.12 with.
                        </p>
                      </div>
                      <span className={styles.inStock}>
                        Quantity:: {count_item}
                      </span>
                      <div className="w-fit p-5 text-2xl">
                        <span className="font-bold py-3 text-gray-300 text-sm font-sans ">
                          {" "}
                          Total Amount To Pay
                        </span>{" "}
                        <span className="block text-gray-300 p-2 font-bold bg-gradient-to-t from-blue-400 to-slate-900">
                          {" "}
                          USD {e.attributes.price * count_item}
                        </span>
                      </div>
                      <div className="flex justify-end gap-4 w-[95%] mt-5">
                        <button
                          className={`${styles.payNowBTN}animate-none text-blue-500  bg-gradient-to-t from-blue-500 to-white`}
                          onClick={() => {
                            const pprice = e.attributes.price;
                            const prodID = e.attributes.prodID;
                            const quantity = count_item;
                            handlePaymentP_SPACES(pprice, prodID, quantity);
                            setIsLoading(true);
                          }}
                        >
                          Pull To My SPACE
                        </button>

                        <button
                          className={styles.payNowBTN}
                          onClick={() => {
                            const pprice = e.attributes.price;
                            const prodID = e.attributes.prodID;
                            const quantity = count_item;
                            handlePayment(pprice, prodID, quantity);
                            setIsLoading(true);
                          }}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                  ;
                </>
              );
            })}
        </>
      )}
    </div>
  );
};

export default BuyModal;
