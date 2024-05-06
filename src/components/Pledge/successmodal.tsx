import { forwardRef, useState, useImperativeHandle } from "react";
import "./successmodal.scss";
import dui from "../../assets/image/Pledge/dui.svg";
import { useTranslation } from "react-i18next";

const SuccessModal = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [show, setShow] = useState("none");

  const toFlex = () => {
    setShow("flex");
  };

  useImperativeHandle(
    ref,
    () => ({
      toFlex,
    }),
    []
  );

  return (
    <div className="mask" style={{ display: show }}>
      <div className="dui">
        <div className="text">{t("19")}</div>
        <img src={dui} alt="" />
        <div className="btn">
          <div onClick={() => setShow("none")}>ok</div>
        </div>
      </div>
    </div>
  );
});

export default SuccessModal;
