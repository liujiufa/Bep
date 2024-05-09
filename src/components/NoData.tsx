import React from "react";
import { useTranslation } from "react-i18next";
import noDataImg from "../assets/image/noData.png";

export default function NoData() {
  const { t } = useTranslation();
  return (
    <div className="NoData flexCenter pt-20 pb-10 bottom-0">
      <div className="box">
        <img src={noDataImg} alt="" />
        <div className="title">{t("No Data")}</div>
      </div>
    </div>
  );
}
