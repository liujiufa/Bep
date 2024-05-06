import { Modal, message } from "antd";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import close from "../../assets/image/Pledge/close.svg";
import key from "../../assets/image/Pledge/key.png";
import "./modal.scss";
import { HaveNFT } from "../../API";
import { Contracts } from "../../web3";
import { useWeb3React } from "@web3-react/core";
import { addMessage, showLoding } from "../../utils/tool";
import { configConsumerProps } from "antd/lib/config-provider";
import NoData from "../NoData";
import { useTranslation } from "react-i18next";

interface Mysuccess {
  toFlex: () => void;
}
interface Myprops {
  successref: React.RefObject<Mysuccess>;
  type0: () => void;
}

interface Myref {
  openmodal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelfModal = forwardRef<Myref, Myprops>((props, ref) => {
  const { t } = useTranslation();
  const web3React = useWeb3React();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arr, setArr] = useState<any>([]);
  const [arr2, setArr2] = useState<any>([]);
  const [chooseArr, setChoose] = useState<any>([]); //这里定义的是，选择上了的质押代币

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setChoose([]);
  };

  const addPle = (item: any) => {
    if (chooseArr.includes(item)) {
      const newArr = chooseArr;
      newArr.splice(newArr.indexOf(item), 1);
      setChoose([...newArr]);
    } else {
      setChoose([...chooseArr, item]);
    }
  };

  const zhiya = async () => {
    if (chooseArr.length <= 0) return;
    let params: any[] = [];
    chooseArr.map((item: any) => {
      return params.push(item.nftNum - 0);
    });
    if (web3React.account) {
      showLoding(true);
      let value = await Contracts.example.stakeNFT(
        web3React.account as string,
        params
      );
      showLoding(false);
      if (value?.status) {
        handleCancel();
        props.type0();
        props.successref.current?.toFlex();
        const filteredArray = arr.filter((itemA: any) => {
          return !chooseArr.some(
            (itemB: any) => JSON.stringify(itemA) === JSON.stringify(itemB)
          );
        });
        setArr2(filteredArray);
      } else {
        addMessage(t("1"));
      }
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      openmodal: setIsModalOpen,
    }),
    []
  );

  useEffect(() => {
    if (!isModalOpen) return;
    HaveNFT().then((res: any) => {
      setArr(res.data.list);
    });
  }, [isModalOpen]);

  return (
    <>
      <Modal
        className="mymodal"
        title={t("5")}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={handleCancel}
      >
        <div className="headerm">
          <span>{t("5")}</span>
          <img onClick={handleCancel} alt="" src={close} />
        </div>

        <div className="color" />

        <div
          className="content"
          style={{
            alignItems: arr.length <= 0 ? "center" : "",
            justifyContent: arr.length <= 0 ? "center" : "",
          }}
        >
          {arr2.length <= 0 ? (
            arr.length > 0 ? (
              arr.map((item: any, index: number) => {
                return (
                  <div
                    onClick={() => addPle(item)}
                    style={{
                      marginLeft: index % 3 === 0 ? "1.5rem" : "2.8333rem",
                    }}
                    className={
                      "box " +
                      (chooseArr.indexOf(item) !== -1 ? "havedata" : "")
                    }
                    key={index}
                  >
                    <div>ID:{item.nftNum}</div>
                    <img src={key} alt="" />
                  </div>
                );
              })
            ) : (
              <NoData />
            )
          ) : (
            arr2?.map((item: any, index: number) => {
              return (
                <div
                  onClick={() => addPle(item)}
                  style={{
                    marginLeft: index % 3 === 0 ? "1.5rem" : "2.8333rem",
                  }}
                  className={
                    "box " + (chooseArr.indexOf(item) !== -1 ? "havedata" : "")
                  }
                  key={index}
                >
                  <div>ID:{item.nftNum}</div>
                  <img src={key} alt="" />
                </div>
              );
            })
          )}
        </div>

        <div className="btn">
          <div
            onClick={zhiya}
            className={chooseArr.length > 0 ? "havedata" : ""}
          >
            {t("6")}
          </div>
        </div>
      </Modal>
    </>
  );
});

export default SelfModal;
