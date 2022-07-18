import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { HashLoader } from "react-spinners";
import { useMoralis } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosHeartEmpty, IoIosCart } from "react-icons/io";
import Router from "next/router";
import { AmazonContext } from "../context/AmazonContext";

const Card = ({ item }) => {
  const { wishlist } = useContext(AmazonContext);
  const { Moralis, account } = useMoralis();

  const styles = {
    cardContainer: `flex flex-col`,
    card: `h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#fb9701]`,
    cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
    price: `text-md font-bold flex justify-center`,
    coins: `ml-[10px]`,
  };

  function sendProps(product_item) {
    Router.push({
      pathname: "/product/product-details",
      query: {
        product_item,
      },
    });
  }

  const saveToWhishList = async (_id) => {
    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("WhishList");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("prodID", _id);
    transaction.save();
    toast("Product has been added to your WishList!");
    // window.location.reload(false);
  };
  return (
    <>
      <div
        onClick={() => {
          sendProps(item.prodID);
        }}
      >
        <ToastContainer />
        <div className="border-2 border-white p-2 shadow-sm shadow-gray-300 relative cursor-pointer">
          <img src={item.src} className="object-cover w-full mb-2" />
          <div className="flex items-start justify-between font-serif">
            <div className=" w-[70%] text-gray-400 text-[10px] md:text-sm lg:text-sm">
              {item.name}
              <span className="relative bg-green-500 w-10 items-start h-10 text-white">
                {/* {wishlist?.map((x) => {
                  <span className="absolute text-black z-50">
                    {" "}
                    {x.attributes.prodID};
                  </span>;
                })} */}
              </span>
            </div>
            <div className="flex text-blue-400/50 gap-2">
              <span>
                <IoIosCart />
              </span>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                  const _id = item.prodID;
                  saveToWhishList(_id);
                }}
                className=""
              >
                <IoIosHeartEmpty />
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-sm w-[70%]">
              <span className="block text-[12px] gap-2">
                <span className="font-bold text-gray-700">
                  USD {(item.price * item.discount) / 100}
                </span>{" "}
                <span className="line-through text-gray-500">
                  {" "}
                  USD {item.price}
                </span>
              </span>
              <span className="text-[11px] text-gray-500">
                You save USD {item.price - (item.price * item.discount) / 100}
              </span>
            </div>
            <div className="text-[#ff9912] text-sm">{item.discount}% off</div>
          </div>
          <div className="absolute top-6 bg-white px-2 font-bold text-[10px] rounded-sm ml-2 capitalize">
            {item.category}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
