import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { ikerAbi, ikerCoinAddress } from "../lib/constants";
import { ethers } from "ethers";
// context
export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formattedAccount, setFormattedAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [etherscanLink, setEtherscanLink] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [assets, setAssets] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [thCat, setCat] = useState("");
  const [thImage, setImage] = useState("");
  const [proID, setProdID] = useState();
  const [singleAsset, setSingleAssets] = useState([]);
  const [count_item, setCount_item] = useState(1);
  const [getPackage, setPackage] = useState();
  const [wishlist, setWishlist] = useState(0);
  const OWNER_WALLET = "0x6c0808e5570FA0CFfAD5265C387E5992150c92Ef";
  const CHAIN_WALLET = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis();

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useMoralisQuery("_User");

  const {
    data: categoriesData,
    error: categoriesDataError,
    isLoading: categoriesDataIsLoading,
  } = useMoralisQuery("assets_categories");

  useEffect(async () => {
    await enableWeb3();
    await getAssets();
    await getCategories();
    await getOwnedAssets();
    await getSIngleAssets();
    await getWishlist();
  }, [
    userData,
    categoriesData,
    categoriesDataIsLoading,
    userDataIsLoading,
    thCat,
    proID,
  ]);

  useEffect(async () => {
    if (!isWeb3Enabled) {
      await enableWeb3();
    }
    await listenToUpdates();

    if (isAuthenticated) {
      await getBalance();
      const currentUsername = await user?.get("nickname");
      setUsername(currentUsername);
      const account = await user?.get("ethAddress");
      setCurrentAccount(account);
      const formatAccount = account.slice(0, 5) + "..." + account.slice(-5);
      setFormattedAccount(formatAccount);
    } else {
      setCurrentAccount("");
      setFormattedAccount("");
      setBalance("");
    }
  }, [
    isWeb3Enabled,
    isAuthenticated,
    balance,
    setBalance,
    authenticate,
    currentAccount,
    setUsername,
    user,
    username,
  ]);

  const connectWallet = async () => {
    await enableWeb3();
    await authenticate();
  };

  const buyTokens = async () => {
    if (!isAuthenticated) {
      await connectWallet();
    }

    const amount = ethers.BigNumber.from(tokenAmount);
    const price = ethers.BigNumber.from("100000000000000");
    const calcPrice = amount.mul(price);

    console.log(ikerCoinAddress);

    let options = {
      contractAddress: ikerCoinAddress,
      functionName: "mint",
      abi: ikerAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    };
    const transaction = await Moralis.executeFunction(options);
    const receipt = await transaction.wait();
    setIsLoading(false);
    console.log(receipt);
    setEtherscanLink(
      `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    );
  };

  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set("nickname", nickname);
        user.save();
        setNickname("");
      } else {
        console.log("Can't set empty nickname");
      }
    } else {
      console.log("No user");
    }
  };

  const getBalance = async () => {
    try {
      if (!isAuthenticated || !currentAccount) return;
      const options = {
        contractAddress: ikerCoinAddress,
        functionName: "balanceOf",
        abi: ikerAbi,
        params: {
          account: currentAccount,
        },
      };

      if (isWeb3Enabled) {
        const response = await Moralis.executeFunction(options);
        console.log(response.toString());
        setBalance(response.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyAsset = async (price, asset) => {
    try {
      if (!isAuthenticated) return;
      console.log("price: ", price);
      console.log("asset: ", asset.name);
      console.log(userData);

      const options = {
        type: "erc20",
        amount: price,
        receiver: ikerCoinAddress,
        contractAddress: ikerCoinAddress,
      };

      let transaction = await Moralis.transfer(options);
      const receipt = await transaction.wait();

      if (receipt) {
        //You can do this but it's not necessary with Moralis hooks!
        // const query = new Moralis.Query('_User')
        // const results = await query.find()

        const res = userData[0].add("ownedAsset", {
          ...asset,
          purchaseDate: Date.now(),
          etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        });

        await res.save().then(() => {
          alert("You've successfully purchased this asset!");
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAssets = async () => {
    try {
      await enableWeb3();
      const query = new Moralis.Query("assets");

      if (thCat) {
        query.equalTo("category", thCat);
      }

      const results = await query.find();
      setAssets(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getSIngleAssets = async () => {
    try {
      await enableWeb3();

      const query = new Moralis.Query("assets");

      query.equalTo("prodID", parseInt(proID));

      query.limit(1);
      const results = await query.find();

      setSingleAssets(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getWishlist = async () => {
    try {
      await enableWeb3();

      const query = new Moralis.Query("WishList");
      const results = await query.find();

      setWishlist(results);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      await enableWeb3();
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  const listenToUpdates = async () => {
    let query = new Moralis.Query("EthTransactions");
    let subscription = await query.subscribe();
    subscription.on("update", async (object) => {
      console.log("New Transactions");
      console.log(object);
      setRecentTransactions([object]);
    });
  };

  const getOwnedAssets = async () => {
    try {
      if (userData[0]) {
        setOwnedItems((prevItems) => [
          ...prevItems,
          userData[0].attributes.ownedAsset,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mz =
    "https://images.ctfassets.net/058vu9hqon0j/6a2nJC2xWWBhlrrppe6prl/d88e1f46c0f710919d2e3286a188a3b9/dh_ramadan_consoletables.jpg";
  const mx =
    "https://danubehome.com/media/catalog/product/8/1/812700600018-4.jpg";
  const mc =
    "https://danubehome.com/media/catalog/product/8/1/811600700162-1.jpg";
  const mv =
    "https://danubehome.com/media/catalog/product/cache/791856a0cde4f5a194b9d5d7de8b3d94/8/1/810401200254-1.jpg";
  const subImg = [mz, mx, mc, mv];
  const G_styles = {
    page: `w-fit p-px bg-gradient-to-l from-yellow-500 to-blue-500 text-sm font-bold px-2 rounded-full animate-pulse capitalize`,
  };

  const LOGO = "https://danubehome.com/media/logo/stores/1/Online-Logo_02.jpg";

  return (
    <AmazonContext.Provider
      value={{
        formattedAccount,
        isAuthenticated,
        buyTokens,
        getBalance,
        balance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        isLoading,
        setIsLoading,
        setEtherscanLink,
        etherscanLink,
        buyAsset,
        currentAccount,
        nickname,
        setNickname,
        username,
        setUsername,
        handleSetUsername,
        assets,
        recentTransactions,
        ownedItems,
        categories,
        products,
        thCat,
        setCat,
        subImg,
        thImage,
        setImage,
        proID,
        setProdID,
        singleAsset,
        // s_prod,
        singleAsset,
        count_item,
        setCount_item,
        // setGoToPayWithID,
        // goToPayWithID,
        G_styles,
        setPackage,
        getPackage,
        OWNER_WALLET,
        CHAIN_WALLET,
        LOGO,
        wishlist,
      }}
    >
      {children}
    </AmazonContext.Provider>
  );
};
