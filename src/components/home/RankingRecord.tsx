import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { GetTradeRank } from "../../API";
import { truncateMiddle } from "../../utils/truncateMiddle";

export default function Loding(props: any) {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    handleGetRefereeList();
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  const handleGetRefereeList = async () => {
    console.log(props.ranking);
    if (!token) return;
    const data: any = await GetTradeRank(props.ranking);
    if (items.length >= data) {
      setHasMore(false);
      return;
    }
    setItems(data.data);
  };
  useEffect(() => {
    setItems([]);
    handleGetRefereeList();
  }, [props.ranking]);

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        style={{ display: items.length > 0 ? "block" : "none" }}
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
          <div className="box2-content-main" key={index}>
            <div className="li w-[60px]" style={{ flex: "none" }}>
              {i.rankNo}
            </div>
            <div className="li">{truncateMiddle(i.userAddress)}</div>
            <div className="li">{i.num}</div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}