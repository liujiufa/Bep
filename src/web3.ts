import { useCallback, useMemo } from "react";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Contract } from "web3-eth-contract";
import { provider } from "web3-core";
import Web3 from "web3";
import { abiObj, contractAddress, isMain } from "./config";
import BigNumber from "big.js";
declare let window: any;
interface contractType {
  [propName: string]: Contract;
}
export const ChainId = {
  // BSC: "0x61",
  BSC: isMain ? "0x38" : "0x61",
};
//切换链
const SCAN_ADDRESS = {
  [ChainId.BSC]: "https://bscscan.com",
};
//配置连接链的信息
export const networkConf = {
  [ChainId.BSC]: {
    // chainId: '0x61',
    chainId: isMain ? "0x38" : "0x61",
    chainName: "BSC",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: isMain
      ? ["https://bsc-dataseed.binance.org/"]
      : ["https://bsc-testnet.public.blastapi.io"],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
};

//切换链
export const changeNetwork = (chainId: number) => {
  return new Promise<void>((reslove) => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
      ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networkConf[chainId],
            },
          ],
        })
        .then(() => {
          setTimeout(reslove, 500);
        });
    } else {
      reslove();
    }
  });
};

export class Contracts {
  //单例
  static example: Contracts;
  web3: Web3;
  contract: contractType = {};
  constructor(library: provider) {
    this.web3 = new Web3(library);
    //保存实例到静态属性
    Contracts.example = this;
  }
  //判断合约是否实例化
  verification(contractName: string) {
    if (!this.contract[contractName]) {
      this.contract[contractName] = new this.web3.eth.Contract(
        abiObj[contractName],
        contractAddress[contractName]
      );
    }
  }
  //合约的方法

  //查询BNB余额
  getBalance(addr: string) {
    return this.web3.eth.getBalance(addr);
  }
  totalSupply(addr: string) {
    this.verification("BKBK");
    return this.contract.BKBK?.methods.totalSupply().call({ from: addr });
  }
  //查询余额
  balanceOf(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.balanceOf(addr).call({ from: addr });
  }
  symbol(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.symbol().call({ from: addr });
  }
  //查询授权
  Tokenapprove(addr: string, toaddr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.allowance(addr, toaddr).call({ from: addr });
  }
  //授权1
  approve(addr: string, toaddr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    // var amount = Web3.utils.toBN("99999999999999999999999999999999")
    var amount = Web3.utils.toWei(Number.MAX_SAFE_INTEGER + "", "ether");
    return obj?.methods
      .approve(toaddr, amount)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  //签名数据
  Sign(addr: string, msg: string) {
    return this.web3.eth.personal.sign(
      this.web3.utils.utf8ToHex(msg) as string,
      addr,
      "123"
    );
  }

  //授权所有NFT
  setApprovalForAll(addr: string, toAddr: string, isApprova: boolean) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .setApprovalForAll(toAddr, isApprova)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  //判断NFT授权
  isApprovedForAll(addr: string, toAddr: string) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .isApprovedForAll(addr, toAddr)
      .call({ from: addr });
  }

  //查询绑定
  bound(addr: string) {
    this.verification("Entrance");
    return this.contract.Entrance?.methods.bound(addr).call({ from: addr });
  }
  //绑定
  boundReferer(addr: string, toAddr: string) {
    this.verification("Entrance");
    return this.contract.Entrance?.methods
      .boundReferer(toAddr)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  withdrawReward(
    addr: string,
    data: string,
    contractName: string = "RewardDistribute"
  ) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods
      .withdrawReward(data)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  withdrawReward1(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.withdraw().send({ from: addr, gasPrice: "5000000000" });
  }

  //撤回
  unStake(addr: string) {
    this.verification("Quantification");
    console.log(this.contract.Quantification);

    return this.contract.Quantification?.methods
      .unStake()
      .send({ from: addr, gasPrice: "5000000000" });
  }

  //质押
  stakeNFT(addr: string, id: any) {
    let Contract = new this.web3.eth.Contract(
      abiObj.Stake,
      contractAddress.Stake
    );
    console.log(id);
    
    return Contract.methods
      .stake(contractAddress.PassNft, id)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  //撤回
  unStakeNFT(addr: string,data: any) {
    let Contract = new this.web3.eth.Contract(
      abiObj.Stake,
      contractAddress.Stake
    );
    // console.log(contractAddress.Market,tokenId)
    return Contract?.methods
      .unstake(data)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  approveMarket(addr: string, addr721: string) {
    let Contract = new this.web3.eth.Contract(abiObj.PassNft, addr721);
    // console.log(contractAddress.Market,tokenId)
    return Contract.methods
      .setApprovalForAll(contractAddress.Stake, true)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  //查询721授权
  getapproveMarket(addr: string, addr721: string) {
    let Contract = new this.web3.eth.Contract(abiObj.PassNft, addr721);
    return Contract.methods
      .isApprovedForAll(addr, contractAddress.Stake)
      .call({ from: addr });
  }

}
