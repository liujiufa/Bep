import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from "react-i18next";
import { GetRefereeList } from '../../API';
import { useSelector } from 'react-redux';
import { dateFormat } from '../../utils/tool';
import { truncateMiddle } from '../../utils/truncateMiddle';

export default function Loding() {
    const [items, setItems] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true); 
    
    const fetchMoreData = () => { 
      handleGetRefereeList()
    };
    const { t, i18n } = useTranslation();
    const token = useSelector((state: any) => state?.token);
 
    const handleGetRefereeList = async () => {
      if (!token) return; 
      const data:any = await GetRefereeList();
      if (items.length >= data) {
          setHasMore(false)
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
        <InfiniteScroll 
          style={{display: items.length > 0 ? 'block' : 'none'}}
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: "center", color: "#16191e", padding: "10px 0px" }}>Loading...</h4>} 
        >  
          {items.map((item: any, key: any) => ( 
            <div className="box4-content-main" key={key}>
              <div className="li">
                {dateFormat("YYYY-mm-dd", new Date(item?.createTime))}
              </div>
              <div className="li"> </div>
              <div className="li">
                {truncateMiddle(item?.userAddress)}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
  );
};
