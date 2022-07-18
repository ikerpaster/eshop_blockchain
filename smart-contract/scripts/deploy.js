const hre = require("hardhat");

async function main() {
  const ikerCoinFactory = await hre.ethers.getContractFactory("IkerCoin");
  const ikerCoin = await ikerCoinFactory.deploy();

  await ikerCoin.deployed();

  console.log("Iker Coin deployed to:", ikerCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
