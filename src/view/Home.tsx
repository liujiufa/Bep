import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ClaimRecord from "../components/home/ClaimRecord";
import ClaimRecord2 from "../components/home/ClaimRecord2";
import RankingRecord from "../components/home/RankingRecord";
import { useGetRewardBep } from "../hooks/useGetRewardBep";
import { addMessage } from "../utils/tool";
import { GetTradeData, GetUserTradeUserAccount } from "../API";
import { useSelector } from "react-redux";

const Home = () => {
  const { t, i18n } = useTranslation();
  const token = useSelector<any>((state) => state.token);

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

  const [ranking, setRanking] = useState(1);
  const handleRanking = (val: number) => {
    setRanking(val);
  };
  const [ranking2, setRanking2] = useState(0);
  const handleRanking2 = (val: number) => {
    setRanking2(val);
  };

  const [tradeData, setTradeData] = useState<any>({}); // 交易记录
  const [rankingUserAccount, setRankingUserAccount] = useState<any>({}); // 交易奖励
  const getData = async () => {
    GetTradeData().then((res: any) => {
      setTradeData(res.data);
    });
    GetUserTradeUserAccount().then((res: any) => {
      setRankingUserAccount(res.data);
    });
  };
  useEffect(() => {
    if (!token) return;
    getData();
  }, [token]);

  const [IdoAccountInfo, setIdoAccountInfo] = useState<any>({});
  const { getReward } = useGetRewardBep();
  const getRewardFun = (amount: any) => {
    getReward(2, getData, () => {}, "RewardDistribute");
  };

  return (
    <div className="home w-full">
      <div className="title1">{t("6")}</div>
      <div className="box1">
        <div className="trading">{t("1")}</div>
        <div className="box1-content">
          <div className="left">
            <div className="num1">{tradeData?.todayTradeNum?.toFixed(0)}</div>
            <div className="num2">{t("8")}</div>
          </div>
          <div className="left" style={{ width: "93px", height: "103px" }}>
            <div className="num1">{tradeData?.totalTradeNum?.toFixed(0)}</div>
            <div className="num2" style={{ top: "93px" }}>
              {t("7")}
            </div>
          </div>
          <div className="left">
            <div className="num1">{tradeData?.myTradeNum?.toFixed(0)}</div>
            <div className="num2">{t("8_1")}</div>
          </div>
        </div>
      </div>
      <div className="box2">
        <div className="box2-title">
          <span
            className={ranking === 1 ? "on" : ""}
            onClick={() => {
              handleRanking(1);
            }}
          >
            {t("9")}
          </span>
          <span
            className={ranking === 2 ? "on" : ""}
            onClick={() => {
              handleRanking(2);
            }}
          >
            {t("10")}
          </span>
        </div>
        <div className="box2-content">
          <div className="box2-content-top">
            <div className="li w-[60px]" style={{ flex: "none" }}>
              {t("11")}
            </div>
            <div className="li">{t("12")}</div>
            <div className="li">{ranking === 1 ? t("13") : t("34")}</div>
          </div>
          <div className="box2-content-bottom">
            {/* {[1, 2, 3, 4, 5, 6].map((item, key) => (
              <div className="box2-content-main">
                <div className="li w-[60px]" style={{ flex: "none" }}>
                  {key}
                </div>
                <div className="li">0xc181...617db7</div>
                <div className="li">1234567</div>
              </div>
            ))} */}
            {token ? <RankingRecord ranking={ranking}></RankingRecord> : ""}
          </div>
        </div>
      </div>
      <div className="box3">
        <div className="title1">{t("14")}</div>
        <div className="box3-main">
          <div className="box3-main-li">
            <div className="box3-main-li-text">
              {t("15")}
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
            <div className="box3-main-li-num">
              {rankingUserAccount?.totalAmount?.toFixed(4) || 0}
            </div>
          </div>
          <div className="box3-main-li">
            <div className="box3-main-li-text">
              {t("16")}
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
            <div className="box3-main-li-num">
              {rankingUserAccount?.amount?.toFixed(4) || 0}
            </div>
          </div>
        </div>
        <div
          className="box3-submit"
          onClick={() => {
            getRewardFun(IdoAccountInfo?.amount ?? "0");
          }}
        >
          {t("17")}
        </div>
      </div>
      <div className="box2-title pl-18">
        <span
          className={ranking2 === 0 ? "on" : ""}
          onClick={() => {
            handleRanking2(0);
          }}
        >
          {t("32")}
        </span>
        <span
          className={ranking2 === 1 ? "on" : ""}
          onClick={() => {
            handleRanking2(1);
          }}
        >
          {t("18")}
        </span>
      </div>
      <div className="box4">
        {ranking2 === 0 ? (
          <div className="box4-content">
            <div className="box4-content-top">
              <div className="li">{t("19")}</div>
              <div className="li">{t("34")}</div>
              <div className="li">{t("54")}</div>
            </div>
            <div className="box4-content-bottom">
              <ClaimRecord2 />
            </div>
          </div>
        ) : (
          <div className="box4-content">
            <div className="box4-content-top">
              <div className="li">{t("19")}</div>
              <div className="li">{t("20")}</div>
              <div className="li">{t("21")}</div>
            </div>
            <div className="box4-content-bottom">
              <ClaimRecord />
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
