import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Loding() {
  const [items, setItems] = useState<any>(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        style={{ display: items.length > 0 || token ? "block" : "none" }}
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
        {items.map((i: any, index: any) => (
          <div className="box4-content-main" key={index}>
            <div className="li">2024.04.{index}</div>
            <div className="li">123456{index}</div>
            <div className="li">{index === 1 ? t("22") : t("failed")}</div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
