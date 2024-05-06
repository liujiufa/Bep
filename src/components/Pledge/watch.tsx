import Modal from "antd/lib/modal/Modal";
import close from "../../assets/image/Pledge/close.svg";
import "./watch.scss";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { WatchNFT } from "../../API";
import { useTranslation } from "react-i18next";

const WatchModal = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      handleOpen,
    }),
    []
  );
const {t}=useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number>(-1);
  const [arr, setArr] = useState<any>([]);

  const handleOpen = (id: number) => {
    setIsModalOpen(true);
    setId(id);
  };

  useEffect(() => {
    if (id === -1) return;
    WatchNFT(id).then((res) => {
      setArr(res.data.list);
    });
  }, [id]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setId(-1);
  };

  return (
    <Modal className="mod" open={isModalOpen} destroyOnClose={true}>
      <div className="headerw">
        <span>{t("20")}</span>
        <img onClick={handleCancel} alt="" src={close} />
      </div>
      <div className="colors" />
      <div className="item_box">
        {arr.length > 0 ? (
          arr.map((item: any, index: number) => {
            return (
              <div className="item" key={index}>
                {item.nftNum}
              </div>
            );
          })
        ) : (
          <div className="Nodata">{t("21")}</div>
        )}
      </div>
    </Modal>
  );
});

export default WatchModal;
