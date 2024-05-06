import React, { useState, forwardRef, useEffect } from "react";
import "./self.scss";
import { Button } from "antd";
import NoData from "../NoData";
import { useTranslation } from "react-i18next";

interface MyCancel {
  openCancel: (item: number) => void;
}
interface MyWatch {
  handleOpen: (id: number) => void;
}

interface Myref {
  arr: number;
}
interface MyProps {
  type: number;
  cancel: React.RefObject<MyCancel>;
  tbodyArr: any;
  watchRef: React.RefObject<MyWatch>;
}

const SelfTab = forwardRef<Myref, MyProps>((props, ref) => {
  const { t } = useTranslation();
  const [headArr, setHead] = useState<string[]>([]);

  //用useLayoutEffect,避免切换的时候，带来的DOM闪烁
  useEffect(() => {
    //这里定义的是表头的数据
    const typeOneHead = ["7", "8", "9", "10", "11"];
    const typeTwoHead = ["7", "8", "9", "12"];

    if (props.type === 0) {
      setHead(typeOneHead);
    } else {
      setHead(typeTwoHead);
    }
  }, [props.type]);

  const openModal = (item: number, status: number) => {
    if (status === 1 || status === 3) return;
    console.log(status);
    props.cancel.current?.openCancel(item);
  };

  const handleWatchNFT = (id: number) => {
    props.watchRef.current?.handleOpen(id);
  };

  return (
    <div className={props.tbodyArr.length <= 0 ? "noSelf" : ""}>
      <div className={props.type === 0 ? "typeone" : "typetwo"} id="thead">
        {headArr.map((item, index) => {
          return (
            <div className="th" key={index}>
              {props.type === 0 && index === headArr.length - 1 ? (
                <span>{t(item)}</span>
              ) : (
                t(item)
              )}
            </div>
          );
        })}
      </div>
      <div className="colorr" />
      <div>
        {props.tbodyArr.length > 0 ? (
          props.tbodyArr.map((item: any, index: number) => {
            return (
              <div key={index}>
                {props.type === 0 ? (
                  <div className="tbody">
                    <div>{item.pledgeTime}</div>
                    <div onClick={() => handleWatchNFT(item.id)}>{t("13")}</div>
                    <div>{item.credit}</div>
                    <div>
                      {item.status === 0
                        ? t("14")
                        : item.status === 1
                        ? t("15")
                        : item.status === 2
                        ? t("16")
                        : t("17")}
                    </div>
                    <div>
                      <Button
                        className={
                          item.status === 1 || item.status === 3
                            ? "btn_mask"
                            : ""
                        }
                        onClick={() => openModal(item.id, item.status)}
                      >
                        {item.status === 0
                          ? t("2")
                          : item.status === 1
                          ? t("15")
                          : item.status === 2
                          ? t("16")
                          : t("17")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="tbody">
                    <div>{item.pledgeTime}</div>
                    <div onClick={() => handleWatchNFT(item.id)}>
                    {t("13")}
                    </div>
                    <div>{item.credit}</div>
                    <div>{item.status === 1 ? t("18") : item.status}</div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
});

export default SelfTab;
