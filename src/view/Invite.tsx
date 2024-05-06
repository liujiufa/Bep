import "../assets/style/Invite.scss";
import copy from "../assets/image/Invite/copy.svg";
import gth from "../assets/image/Invite/gth.svg";
import { Pagination, Tooltip } from "antd";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllAward, getAllInvite, getAlldata } from "../API";
import { AddrHandle, addMessage } from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import copyFun from "copy-to-clipboard";

interface Data {
  refereeCreditAll: number;
  refereeNum: number;
  refereePassNum: number;
}

const Invite = () => {
  const { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  const token = useSelector<any>((state) => state.token);

  const spanRef = useRef<HTMLSpanElement>(null);

  const [type, setType] = useState(0);
  const [alldata, setAlldata] = useState({
    refereeCreditAll: 0,
    refereeNum: 0,
    refereePassNum: 0,
  });
  const [headArr, setHead] = useState<string[]>([]);
  const [tbodyArr, setBody] = useState<any>([1, 2]);
  const [totalData, setTotal] = useState(0); //总条数
  const [curPage, setPage] = useState(1); //当前在第几页
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [lan, setLan] = useState<any>();

  useLayoutEffect(() => {
    //这里定义的是表头的数据
    const typeOneHead = ["7", "45", "46"];
    const typeTwoHead = ["7", "47", "48"];

    if (type === 0) {
      setHead(typeOneHead);
    } else {
      setHead(typeTwoHead);
    }
  }, [type, token]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maskString = (str: any) => {
    if (str?.length <= 8) {
      return str;
    }
    const regex = /^(.{4}).*(.{4})$/;
    return str?.replace(regex, "$1****$2");
  };

  const changeType = (num: number) => {
    setType(num);
    setPage(1);
  };

  function invitation(value: any) {
    if (!web3React.account) {
      return addMessage(t("Please link wallet"));
    } else {
      copyFun(window.location.origin + "/" + value);
      addMessage(t("Copied successfully"));
    }
  }

  useEffect(() => {
    if (!token) return;
    getAlldata().then((res: { data: Data }) => {
      setAlldata(res.data);
    });
    if (type === 0) {
      getAllInvite(curPage).then((res) => {
        setBody(res.data.list);
        setTotal(res.data.total);
      });
    } else {
      getAllAward(curPage).then((res: { data: any }) => {
        setBody(res.data.list);
        setTotal(res.data.total);
      });
    }
  }, [token, type, curPage]);

  const changeCurpage = (e: any) => {
    setPage(e);
  };

  useEffect(() => {
    setLan(i18n.language);
  }, [i18n.language]);

  return (
    <div className="invite">
      <div className="info">
        <div className="info_l">
          <div
            className="info_title"
            style={{ fontSize: lan === "en" ? "3rem" : "" }}
          >
            {t("49")}
          </div>
          <div className="info_detail">{t("50")}</div>
        </div>

        <div className="info_r">
          <div className="r_link">{t("51")}</div>
          <div className="r_copy">
            <span ref={spanRef}>
              {window.location.origin +
                "/" +
                AddrHandle(web3React.account as string, 6, 6)}
            </span>
            <img
              onClick={() => invitation(web3React.account)}
              src={copy}
              alt=""
            />
          </div>
          <div className="r_btn" onClick={() => invitation(web3React.account)}>
            {t("52")}
          </div>
        </div>
      </div>

      <div className="alldata">
        <div className="zonglan">{t("53")}</div>
        <div className="three_box">
          <div className="box_1">
            <div className="box_title">
              <span>{t("54")}</span>
              <Tooltip
                color="white"
                overlayStyle={{
                  width: "12.83333rem",
                  height: "4.625rem",
                }}
                overlayInnerStyle={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "1.6666rem",
                  lineHeight: "1.6666rem",
                }}
                title={t("55")}
              >
                <img src={gth} alt="" />
              </Tooltip>
              {/* <div className="box_btn">领取</div> */}
            </div>
          </div>

          <div className="box_2">
            <div className="box_title">
              <span>{t("56")}</span>
              <Tooltip
                color="white"
                overlayStyle={{
                  width: "19.125rem",
                  height: "4.625rem",
                }}
                overlayInnerStyle={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "1.6666rem",
                  lineHeight: "1.6666rem",
                }}
                title={t("57")}
              >
                <img src={gth} alt="" />
              </Tooltip>
            </div>
            <div className="box_content">
              <span>{alldata.refereeNum}</span>
            </div>
          </div>

          <div className="box_3">
            <div className="box_title">
              <span>{t("58")}</span>
              <Tooltip
                color="white"
                overlayStyle={{
                  width: "24.66667rem",
                  height: "4.625rem",
                }}
                overlayInnerStyle={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "1.6666rem",
                  lineHeight: "1.6666rem",
                }}
                title={t("59")}
              >
                <img src={gth} alt="" />
              </Tooltip>
            </div>
            <div className="box_content">
              <span>{alldata.refereePassNum}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="record">
        <div className="record_t">
          <span
            onClick={() => changeType(0)}
            className={type === 0 ? "isSelect" : ""}
          >
            {t("60")}
          </span>
          <span
            onClick={() => changeType(1)}
            className={type === 1 ? "isSelect" : ""}
          >
            {t("61")}
          </span>
        </div>

        <div className="tab_box">
          <div className="t_head">
            {headArr.map((item, index) => {
              return (
                <div className="th" key={index}>
                  {t(item)}
                </div>
              );
            })}
          </div>
          <div className="colori" />
          {tbodyArr?.length > 0 ? (
            tbodyArr?.map((item: any, index: number) => {
              return (
                <div key={index} className="td">
                  <div>{type === 0 ? item.refereeTime : item.creditTime}</div>
                  <div>
                    {type === 0
                      ? winWidth >= 425
                        ? item.userAddress
                        : maskString(item.userAddress)
                      : item.credit}
                  </div>
                  <div>
                    {type === 0
                      ? item.status === 0
                        ? t("62")
                        : t("63")
                      : item.status === 1
                      ? t("64")
                      : ""}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="Nodata">{t("21")}</div>
            // <Spin />
          )}
        </div>
      </div>

      <div className="Page">
        <Pagination
          showQuickJumper
          current={curPage}
          pageSize={7}
          total={totalData}
          onChange={changeCurpage}
        />
      </div>
    </div>
  );
};

export default Invite;
