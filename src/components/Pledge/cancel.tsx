import { useState, forwardRef, useImperativeHandle } from "react";
import "./cancel.scss";
import close from "../../assets/image/Pledge/close.svg";
import { cancelPle } from "../../API";
import { useWeb3React } from "@web3-react/core";
import { addMessage, showLoding } from "../../utils/tool";
import { Contracts } from "../../web3";
import { useTranslation } from "react-i18next";

interface Myprops {
  type0: () => void;
}

interface Myref {
  openCancel: (item: number) => void;
}

const Cancel = forwardRef<Myref, Myprops>((props, ref) => {
  const { t } = useTranslation();
  const web3React = useWeb3React();

  useImperativeHandle(
    ref,
    () => ({
      openCancel,
    }),
    []
  );

  const [show, setShow] = useState("none");
  const [id, setId] = useState<number>();

  const openCancel = (item: number) => {
    setShow("flex");
    setId(item);
  };

  const closeCancel = () => {
    setShow("none");
  };

  const handleCancel = () => {
    cancelPle(id as number).then(async (res) => {
      setShow("none");
      props.type0();

      if (res.data !== null) {
        if (web3React.account) {
          showLoding(true);
          let value = await Contracts.example.unStakeNFT(
            web3React.account as string,
            res.data
          );
          showLoding(false);
          if (value?.status) {
            setShow("none");
            props.type0();
          } else {
            addMessage(t("1"));
          }
        }
      }
    });
  };

  return (
    <div className="mask" style={{ display: show }}>
      <div className="cancelBox">
        <div className="header">
          <span>{t("2")}</span>
          <img onClick={closeCancel} alt="" src={close} />
        </div>
        <div className="Ccolor" />

        <span>{t("3")}</span>
        <div className="btn">
          <div onClick={handleCancel}>{t("4")}</div>
        </div>
      </div>
    </div>
  );
});

export default Cancel;
