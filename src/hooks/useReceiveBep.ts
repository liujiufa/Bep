// 领取奖励
import { useWeb3React } from "@web3-react/core";
import { t } from "i18next";
import { drawAward } from "../API";
import { addMessage, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
import Web3 from "web3";

export const useReceiveBep = () => {
  const { account } = useWeb3React();
  async function receiveBep(
    IdoInfo: any,
    BEPTOKENBalance: any,
    callbackFun: any,
    contractName: any
  ) {
    if (!account) return addMessage(t("Please link wallet"));
    let idoNum = Web3.utils.fromWei(IdoInfo?.idoNum + "");
    let tokenNum = Web3.utils.fromWei(IdoInfo?.tokenNum + "");
    let amount = BEPTOKENBalance;
    let withdrawNum = Web3.utils.fromWei(IdoInfo?.withdrawNum + "");

    console.log("aaaaaaaaaaa");
    console.log(Number(amount), "amount");
    console.log(Number(tokenNum) * 0.1, "tokenNum的10%");
    console.log(Number(tokenNum), "tokenNum");
    console.log(Number(withdrawNum), "withdrawNum");

    // amount需要大于tokenNum的10%，tokenNum大于0,并且withdrawNum不等于0才能领取
    if (
      Number(amount) >= Number(tokenNum) * 0.1 &&
      Number(tokenNum) > 0 &&
      Number(withdrawNum) === 0
    ) {
      showLoding(true);
      try {
        let resed = await Contracts.example.ClaimIdoTokenBep(
          account,
          contractName
        );
        showLoding(false);
        addMessage(t("Received successfully"));
        setTimeout(() => callbackFun(), 1000);
      } catch (error: any) {
        addMessage(t("failed"));
        showLoding(false);
      }
    } else {
      showLoding(false);
      return addMessage(t("failed"));
    }
  }
  return { receiveBep };
};
