import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import copy from "copy-to-clipboard";
import { addMessage, dateFormat } from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { Contracts } from "../web3";
import { GetRefereeList } from "../API";
import ClaimRecord from "../components/account/ClaimRecord";
import { useGetRewardBep } from "../hooks/useGetRewardBep";

const Account = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => {};

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [lan, setLan] = useState<any>();
  useEffect(() => {
    setLan(i18n.language);
  }, [i18n.language]);

  const coppyUrl = (url: string) => {
    if (!token) return;
    copy(url);
    addMessage(t("Copy successfully"));
  };
  const web3React = useWeb3React();

  const token = useSelector((state: any) => state?.token);
  const handleReceive = () => {
    // addMessage(t("Coming soon"));
    console.log(Contracts);
    // console.log(Contracts.example);
    // Contracts.example.claimRewards(web3React.account)
    // Contracts.claimRewards().then(res => {
    //   console.log(res);
    // })
    // claimRewards(web3React.account)
  };

  const [list, setList] = useState<any>([]);
  const handleGetRefereeList = async () => {
    const { data } = await GetRefereeList();
    setList(data);
  };
  useEffect(() => {
    if (!token) return;
    handleGetRefereeList();
  }, [token]);

  const getData = () => {
    setIdoAccountInfo({});
  };
  const [IdoAccountInfo, setIdoAccountInfo] = useState<any>({});
  const { getReward } = useGetRewardBep();
  const getRewardFun = (amount: any) => {
    if (Number(amount) <= 0) return addMessage(t("52"));
    getReward(1, getData, () => {}, "RewardDistribute");
  };

  return (
    <div className="home account w-full min-h-screen">
      {/* <ConnectWallet></ConnectWallet> */}
      <div className="title1">{t("37")}</div>
      <div className="box3">
        <div className="title1">{t("38")}</div>
        <div className="box3-main">
          <div className="box3-main-li" style={{ border: "none" }}>
            <div className="box3-main-li-text" style={{ padding: "12px 10px" }}>
              <div style={{ wordBreak: "break-all", padding: "0px 18px" }}>
                {window.location.origin + "/" + web3React.account}
              </div>
            </div>
          </div>
        </div>
        <div
          className="box3-submit"
          style={{ margin: "34px auto 0px 18px" }}
          onClick={() =>
            coppyUrl(window.location.origin + "/" + web3React.account)
          }
        >
          {t("39")}
        </div>
      </div>
      <div className="box3" style={{ display: "none" }}>
        <div className="title1">{t("40")}</div>
        <div className="box3-main">
          <div className="box3-main-li">
            <div className="box3-main-li-text">
              {t("41")}BEP60
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99999 7.79712C11.5283 7.79712 14.1889 6.63285 14.1889 5.08868C14.1889 3.54452 11.5283 2.38025 7.99999 2.38025C4.47165 2.38025 1.81104 3.54452 1.81104 5.08868C1.81104 6.63285 4.47165 7.79712 7.99999 7.79712ZM2.67085 5.08868C2.67085 4.31703 4.69845 3.24007 7.99999 3.24007C11.3015 3.24007 13.3291 4.31703 13.3291 5.08868C13.3291 5.86034 11.3015 6.9373 7.99999 6.9373C4.69845 6.9373 2.67085 5.86034 2.67085 5.08868Z"
                  fill="white"
                />
                <path
                  d="M13.6033 9.75801C13.5984 9.75406 13.5932 9.75056 13.5879 9.74748C13.5155 9.68825 13.4265 9.6558 13.3357 9.6558C13.1146 9.6558 12.9347 9.83566 12.9347 10.0568C12.9347 10.1616 12.9755 10.2599 13.0505 10.3358C13.054 10.3406 13.0575 10.345 13.0619 10.3494C13.237 10.5249 13.3457 10.7468 13.3457 10.928C13.3457 11.7067 11.312 12.7933 7.99993 12.7933C4.68786 12.7933 2.65412 11.7067 2.65412 10.928C2.65412 10.7319 2.7028 10.5582 2.94101 10.3485C2.94232 10.3472 2.95855 10.3318 2.95988 10.3305C2.96602 10.3244 2.97128 10.3174 2.97567 10.3099C3.03578 10.2371 3.06868 10.148 3.06868 10.0564C3.06868 9.83526 2.88882 9.6554 2.66772 9.6554C2.56945 9.6554 2.47646 9.69049 2.4032 9.75498C2.39618 9.75892 2.38959 9.76419 2.38345 9.76989C2.01452 10.1292 1.82764 10.5187 1.82764 10.928C1.82764 12.4625 4.48125 13.6198 7.99993 13.6198C11.5186 13.6198 14.1722 12.4625 14.1722 10.928C14.1722 10.5231 13.9871 10.1362 13.6261 9.78217C13.6239 9.77952 13.6055 9.76065 13.6033 9.75801Z"
                  fill="white"
                />
                <path
                  d="M13.5866 6.80039C13.5147 6.74117 13.4265 6.70914 13.3357 6.70914C13.1146 6.70914 12.9347 6.889 12.9347 7.1101C12.9347 7.21494 12.9755 7.31321 13.0505 7.38911C13.054 7.39394 13.0576 7.39832 13.0619 7.40272C13.237 7.5782 13.3458 7.80016 13.3458 7.98135C13.3458 8.76002 11.312 9.84663 7.99995 9.84663C4.68787 9.84663 2.65413 8.76001 2.65413 7.98135C2.65413 7.78526 2.70282 7.61154 2.94103 7.40185C2.94234 7.4001 2.95857 7.38475 2.95989 7.38343C2.9656 7.37773 2.97041 7.37159 2.97436 7.36457C3.03535 7.29175 3.06868 7.20181 3.06868 7.10925C3.06868 6.88815 2.88882 6.70874 2.66772 6.70874C2.56945 6.70874 2.47646 6.74384 2.4032 6.80832C2.39618 6.81227 2.38959 6.81753 2.38345 6.82324C2.01452 7.18251 1.82764 7.57207 1.82764 7.98137C1.82764 9.51588 4.48125 10.6731 7.99993 10.6731C11.5186 10.6731 14.1722 9.51589 14.1722 7.98137C14.1722 7.5769 13.9871 7.18953 13.6098 6.8171C13.6029 6.81005 13.5954 6.80477 13.5866 6.80039Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="box3-main-li-num">0</div>
          </div>
          <div className="box3-main-li">
            <div className="box3-main-li-text">
              {t("42")}BEP60
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99999 7.79712C11.5283 7.79712 14.1889 6.63285 14.1889 5.08868C14.1889 3.54452 11.5283 2.38025 7.99999 2.38025C4.47165 2.38025 1.81104 3.54452 1.81104 5.08868C1.81104 6.63285 4.47165 7.79712 7.99999 7.79712ZM2.67085 5.08868C2.67085 4.31703 4.69845 3.24007 7.99999 3.24007C11.3015 3.24007 13.3291 4.31703 13.3291 5.08868C13.3291 5.86034 11.3015 6.9373 7.99999 6.9373C4.69845 6.9373 2.67085 5.86034 2.67085 5.08868Z"
                  fill="white"
                />
                <path
                  d="M13.6033 9.75801C13.5984 9.75406 13.5932 9.75056 13.5879 9.74748C13.5155 9.68825 13.4265 9.6558 13.3357 9.6558C13.1146 9.6558 12.9347 9.83566 12.9347 10.0568C12.9347 10.1616 12.9755 10.2599 13.0505 10.3358C13.054 10.3406 13.0575 10.345 13.0619 10.3494C13.237 10.5249 13.3457 10.7468 13.3457 10.928C13.3457 11.7067 11.312 12.7933 7.99993 12.7933C4.68786 12.7933 2.65412 11.7067 2.65412 10.928C2.65412 10.7319 2.7028 10.5582 2.94101 10.3485C2.94232 10.3472 2.95855 10.3318 2.95988 10.3305C2.96602 10.3244 2.97128 10.3174 2.97567 10.3099C3.03578 10.2371 3.06868 10.148 3.06868 10.0564C3.06868 9.83526 2.88882 9.6554 2.66772 9.6554C2.56945 9.6554 2.47646 9.69049 2.4032 9.75498C2.39618 9.75892 2.38959 9.76419 2.38345 9.76989C2.01452 10.1292 1.82764 10.5187 1.82764 10.928C1.82764 12.4625 4.48125 13.6198 7.99993 13.6198C11.5186 13.6198 14.1722 12.4625 14.1722 10.928C14.1722 10.5231 13.9871 10.1362 13.6261 9.78217C13.6239 9.77952 13.6055 9.76065 13.6033 9.75801Z"
                  fill="white"
                />
                <path
                  d="M13.5866 6.80039C13.5147 6.74117 13.4265 6.70914 13.3357 6.70914C13.1146 6.70914 12.9347 6.889 12.9347 7.1101C12.9347 7.21494 12.9755 7.31321 13.0505 7.38911C13.054 7.39394 13.0576 7.39832 13.0619 7.40272C13.237 7.5782 13.3458 7.80016 13.3458 7.98135C13.3458 8.76002 11.312 9.84663 7.99995 9.84663C4.68787 9.84663 2.65413 8.76001 2.65413 7.98135C2.65413 7.78526 2.70282 7.61154 2.94103 7.40185C2.94234 7.4001 2.95857 7.38475 2.95989 7.38343C2.9656 7.37773 2.97041 7.37159 2.97436 7.36457C3.03535 7.29175 3.06868 7.20181 3.06868 7.10925C3.06868 6.88815 2.88882 6.70874 2.66772 6.70874C2.56945 6.70874 2.47646 6.74384 2.4032 6.80832C2.39618 6.81227 2.38959 6.81753 2.38345 6.82324C2.01452 7.18251 1.82764 7.57207 1.82764 7.98137C1.82764 9.51588 4.48125 10.6731 7.99993 10.6731C11.5186 10.6731 14.1722 9.51589 14.1722 7.98137C14.1722 7.5769 13.9871 7.18953 13.6098 6.8171C13.6029 6.81005 13.5954 6.80477 13.5866 6.80039Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="box3-main-li-num">0</div>
          </div>
        </div>
        <div
          className="box3-submit"
          onClick={() => {
            getRewardFun(IdoAccountInfo?.amount ?? "0");
          }}
        >
          {t("43")}
        </div>
      </div>
      <div>
        <div className="title1">{t("44")}</div>
        <div className="box4">
          <div className="box4-content">
            <div className="box4-content-top">
              <div className="li">{t("35")}</div>
              <div className="li"></div>
              <div className="li">{t("45")}</div>
            </div>
            <div className="box4-content-bottom">
              <ClaimRecord></ClaimRecord>
              {/* {list.map((item: any, key: number) => (
                <div className="box4-content-main" key={key}>
                  <div className="li">
                    {dateFormat("YYYY-mm-dd", new Date(item.createTime))}
                  </div>
                  <div className="li"> </div>
                  <div className="li">
                    {truncateMiddle(item.userAddress)}
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Account;
