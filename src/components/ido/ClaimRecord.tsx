import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { GetRefereeList, GetUserAccountDetail } from "../../API";
import { useSelector } from "react-redux";
import { dateFormat } from "../../utils/tool";
import { truncateMiddle } from "../../utils/truncateMiddle";
import NoData from "../NoData";

export default function Loding(props: any) {
  const [hasMore, setHasMore] = useState(true);

  const [showNumber, setShowNumber] = useState(20);
  const fetchMoreData = () => {
    if (showNumber < accountTypeList.length) {
      setShowNumber(showNumber + 10);
    } else {
      setHasMore(false);
      return;
    }
  };
  const { t, i18n } = useTranslation();
  const token = useSelector((state: any) => state?.token);

  const [accounttype, setAccountType] = useState<any>(props.accounttype);
  const [accountTypeList, setAccountTypeList] = useState<any>([]);
  const handleGetUserAccountDetail = async (type: number) => {
    if (!token) {
      return;
    }
    setAccountType(props.accounttype);
    const data: any = await GetUserAccountDetail(type);
    setAccountTypeList(data.data);
  };

  useEffect(() => {
    if (token && props.accounttype) {
      setAccountTypeList([]);
      setAccountType(props.accounttype);
      handleGetUserAccountDetail(props.accounttype);
    } else {
      setAccountType(1);
      handleGetUserAccountDetail(1);
    }
  }, [props.accounttype, token]);

  return (
    <div>
      {accountTypeList.length > 0 ? (
        <InfiniteScroll
          dataLength={showNumber}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={""}
        >
          {accountTypeList.map((item: any, key: any) => (
            <div
              className="box2-content-main"
              key={key}
              style={{ display: key < showNumber ? "flex" : "none" }}
            >
              <div className="li">{item.amount}</div>
              <div className="li"></div>
              <div className="li">
                {dateFormat("YYYY-mm-dd", new Date(item.createTime))}
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
