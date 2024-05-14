import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { GetRefereeList } from "../../API";
import { useSelector } from "react-redux";
import { dateFormat } from "../../utils/tool";
import { truncateMiddle } from "../../utils/truncateMiddle";
import NoData from "../NoData";

export default function Loding() {
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (showNumber < items.length) {
      setShowNumber(showNumber + 10);
      setHasMore(true);
    } else {
      setHasMore(false);
      return;
    }
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  const handleGetRefereeList = async () => {
    if (!token) return;
    const data: any = await GetRefereeList();
    setItems(data.data);
  };
  useEffect(() => {
    if (!token) return;
    handleGetRefereeList();
  }, [token]);

  const [showNumber, setShowNumber] = useState(20);

  return (
    <div>
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={showNumber}
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
              <div className="li"> </div>
              <div className="li">{truncateMiddle(item?.userAddress)}</div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <NoData></NoData>
      )}
    </div>
  );
}
