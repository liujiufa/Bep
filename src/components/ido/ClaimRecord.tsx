import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from "react-i18next";
import { GetRefereeList, GetUserAccountDetail } from '../../API';
import { useSelector } from 'react-redux';
import { dateFormat } from '../../utils/tool';
import { truncateMiddle } from '../../utils/truncateMiddle';

export default function Loding(props: any) {
    const [items, setItems] = useState<any>(Array.from({ length: 20 }));
    const [hasMore, setHasMore] = useState(true); 
    
    const fetchMoreData = () => {
      if (items.length >= 100) {
          setHasMore(false)
        return;
      } 
      setTimeout(() => { 
        setItems(items.concat(Array.from({ length: 20 })))
      }, 1500);
    };
    const { t, i18n } = useTranslation();
    const token = useSelector((state: any) => state?.token);

    const [accounttype, setAccountType] = useState<any>(props.accounttype);
    const [accountTypeList, setAccountTypeList] = useState<any>([]);
    const handleGetUserAccountDetail = async (type: number) => {
      if (!token) {return}
      setAccountType(props.accounttype);
      const { data } = await GetUserAccountDetail(type);
      setAccountTypeList(data);
    }; 
    
    useEffect(() => {
      if (token && props.accounttype) { 
        setAccountTypeList([]);
        setAccountType(props.accounttype)
        handleGetUserAccountDetail(props.accounttype);
      }
      else { 
        setAccountType(1)
        handleGetUserAccountDetail(1);
      }
    }, [props.accounttype, token]); 

    

  return (
    <div> 
        <InfiniteScroll
          style={{display: accountTypeList.length > 0 || token ? 'block' : 'none' }}
          dataLength={accountTypeList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={""} 
        >  
          {accountTypeList.map((item: any, key: any) => (
            <div className="box2-content-main" key={key}>
            <div className="li">{item.amount}</div>
            <div className="li"></div>
            <div className="li">
              {dateFormat("YYYY-mm-dd", new Date(item.createTime))}
            </div>
          </div>
          ))}
        </InfiniteScroll>
      </div>
  );
};
