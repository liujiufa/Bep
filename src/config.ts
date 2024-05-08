import Token from "./ABI/ERC20Token.json";
import Stake from "./ABI/Stake.json";
import PassNft from "./ABI/PassNft.json";
import Ido from "./ABI/Ido.json";
import RewardDistribute from "./ABI/RewardDistribute.json";

// 正式
export const LOCAL_KEY = "MBAS_LANG";
export const isMain = false;
// 自己 /api
export let baseUrl: string = isMain
  ? window.location.origin + "/user/"
  : // : "http://192.168.1.37:18889";
    "https://bep60.com/api";
export let ContractUrl: string = isMain
  ? "https://bscscan.com/address/"
  : "https://testnet.bscscan.com/address/";
export let topAddress: string = "0x7a04D0AF8a3434EF23463f646D88a9DC6434A70e";
export let rewardType = {
  "1": "质押团队收益",
  "2": "124",
  "3": "121",
  "4": "NFT质押收益领取",
  "5": "NFT社区收益领取",
};
export let buyCoin =
  "https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xb6b34d48b097896903d03b464a3a685d2ceb234e";
export let MachineType = {
  "8": "324",
  "9": "325",
  "10": "326",
  "11": "327",
  "12": "328",
  "13": "329",
  "14": "327",
};
interface abiObjType {
  [propName: string]: any;
}
interface contractAddressType {
  [propName: string]: string;
}

export const abiObj: abiObjType = {
  USDT: Token,
  TOKEN: Token,
  Stake: Stake,
  PassNft: PassNft,
  Ido: Ido,
  RewardDistribute: RewardDistribute,
};

export const Main: contractAddressType = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  TOKEN: "0xfAF18E53F52122085a8743e2bfb324c0577b98B5",
  Stake: "0x1F04eb30cf5e8e3B367ba5a1AbFbD928a917e4f7",
  PassNft: "0x8c386214CDc77b8c62066e31f0271afB1F0AE1a7",
  Ido: "0xE891a92d6B83020e6302c5c5F6D981c0A1eD14Fb",
  RewardDistribute: "0xE791D45b8630a207A4F535099063e4e1702947d5",
};

const Test = {
  USDT: "0x2b11640f31b84dc727841FE6B5a905D366A00e78",
  TOKEN: "0xEec2f5a9c17C70081Fed402B04b73B55e291e014",
  Stake: "0x71085fb90ADDF878F936589cF12B8772212e58c4",
  PassNft: "0xb6E7b0249becEc75D44843B7Ab62EFaA1E1D403D",
  Ido: "0x59b8bEa9aCFcf212B7f1a8CB98A4CE912B5c7496",
  RewardDistribute: "0xE791D45b8630a207A4F535099063e4e1702947d5",
};

export const contractAddress: contractAddressType = isMain ? Main : Test;
// Test
