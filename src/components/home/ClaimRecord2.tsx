import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { GetRefereeList, GetTradeUserAccountDetail } from "../../API";
import { useSelector } from "react-redux";
import { dateFormat } from "../../utils/tool";
import { truncateMiddle } from "../../utils/truncateMiddle";
import NoData from "../NoData";

export default function Loding() {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const [showNumber, setShowNumber] = useState(60);
  const fetchMoreData = () => {
    // if (showNumber < items.length) {
    //   setShowNumber(showNumber + 10);
    // } else {
    //   setHasMore(false);
    //   return;
    // }
    setHasMore(false);
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  const handleGetRefereeList = async () => {
    if (!token) return;
    const data: any = await GetTradeUserAccountDetail(1);
    setItems(data.data);
  };
  useEffect(() => {
    handleGetRefereeList();
  }, [token]);

  return (
    <div>
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4
              style={{
                textAlign: "center",
                color: "#16191e",
                padding: "10px 0px",
              }}
            >
              Loading...
            </h4>
          }
        >
          {items.map((item: any, key: any) => (
            <div
              className="box4-content-main"
              key={key}
              style={{ display: key < showNumber ? "flex" : "none" }}
            >
              <div className="li">
                {dateFormat("YYYY-mm-dd", new Date(item?.createTime))}
              </div>
              <div className="li">{item?.amount?.toFixed(4)}</div>
              <div className="li">
                {item.type === 4
                  ? t("55")
                  : item.type === 5
                  ? t("56")
                  : item.type === 6
                  ? t("57")
                  : item.type === 7
                  ? t("58")
                  : t("60")}
                {/* 4-交易发放记录 5-挖坑奖励记录 6挖坑直推奖励 7-挖坑间推奖励 8交易-持币发放记录 */}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <NoData></NoData>
      )}
    </div>
  );
}
