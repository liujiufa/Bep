import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GetTradeRank } from "../../API";
import { truncateMiddle } from "../../utils/truncateMiddle";
import NoData from "../NoData";

export default function Loding(props: any) {
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
    const data: any = await GetTradeRank(props.ranking);
    setItems(data.data);
  };
  useEffect(() => {
    setItems([]);
    handleGetRefereeList();
  }, [props.ranking]);

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
          height={items.length > 3 ? 370 : "auto"}
        >
          {/* endMessage={
          <p style={{ textAlign: "center", color: "#16191e", padding: "10px 0px" }}>
            <b>-- {t("53")} --</b>
          </p>
        } */}
          {items.map((i: any, index: any) => (
            <div
              className="box2-content-main"
              key={index}
              style={{ display: index < showNumber ? "flex" : "none" }}
            >
              <div className="li w-[60px]" style={{ flex: "none" }}>
                {i.rankNo}
              </div>
              <div className="li">{truncateMiddle(i.userAddress)}</div>
              <div className="li">{i.num?.toFixed(4)}</div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <NoData></NoData>
      )}
    </div>
  );
}
