/*
  获取推荐奖励
*/

import { useWeb3React } from "@web3-react/core";
import { t } from "i18next";
import { drawAward } from "../API";
import { addMessage, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
export const useGetRewardBep = () => {
  const { account } = useWeb3React();
  function getReward(
    type: any,
    callbackFun: any,
    closeFun: any,
    contractName: any
  ) {
    if (!account) return addMessage(t("Please link wallet"));
    if (!type) return addMessage(t("failed"));
    drawAward({
      type: type,
    }).then(async (res: any) => {
      showLoding(true);
      if (res?.code === 200) {
        let resed = await Contracts.example.RewardDistributeBep(
          account as string,
          res?.data,
          contractName
        );
        if (resed?.status) {
          showLoding(false);
          addMessage(t("Received successfully"));
          await closeFun();
          setTimeout(() => callbackFun(), 5000);
        } else {
          addMessage(t("failed"));
          showLoding(false);
        }
      } else {
        showLoding(false);
        addMessage(res.msg);
      }
    });
  }
  return { getReward };
};
