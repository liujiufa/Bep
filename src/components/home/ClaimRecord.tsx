import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GetTradeUserAccountDetail } from "../../API";
import { dateFormat } from "../../utils/tool";
import NoData from "../NoData";

export default function Loding() {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    handleGetRefereeList();
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  const handleGetRefereeList = async () => {
    if (!token) return;
    const data: any = await GetTradeUserAccountDetail(2);
    if (items.length >= data) {
      setHasMore(false);
      return;
    }
    setItems(data.data);
  };
  useEffect(() => {
    if (!token) return;
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
          {/* endMessage={
            <p style={{ textAlign: "center", color: "#16191e", padding: "10px 0px" }}>
              <b>-- {t("53")} --</b>
            </p>
          } */}
          {items.map((item: any, index: any) => (
            <div className="box4-content-main" key={index}>
              <div className="li">
                {dateFormat("YYYY-mm-dd", new Date(item?.createTime))}
              </div>
              <div className="li">{item?.amount}</div>
              <div className="li">{t("22")}</div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <NoData></NoData>
      )}
    </div>
  );
}
