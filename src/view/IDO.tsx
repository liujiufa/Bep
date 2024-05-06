import "../assets/style/Invite.scss";
import BuyContainerBg from "../assets/image/IDO/BuyContainerBg.png";
import { Pagination, Tooltip } from "antd";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllAward, getAllInvite, getAlldata } from "../API";
import { AddrHandle, addMessage } from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import copyFun from "copy-to-clipboard";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSCBox } from "../components/FlexBox";
import { ToGoIcon } from "../assets/image/IDO";

interface Data {
  refereeCreditAll: number;
  refereeNum: number;
  refereePassNum: number;
}

const AllContainer = styled.div`
  width: 100%;
  padding: 30px 18px;
`;

const AllContainer_Title = styled.div`
  color: #fff;
  font-family: "Inter";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BuyContainer = styled.div`
  position: relative;
  margin-top: 30px;
  width: 100%;
  padding: 20px 18px;
  border-radius: 16px;
  background: #23262c;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
  > img {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 144px;
  }
`;
const BuyContainer_Info = styled.div`
  > div {
    color: #fff;
    font-family: "Inter";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 16px;
    &:nth-child(3) {
      color: rgba(255, 255, 255, 0.8);
      font-family: "Inter";
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 32px;
    }
  }
`;

const ProcessContainer = styled(FlexCCBox)`
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Inter";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 32px;
`;

const ProcessBox = styled(FlexBox)`
  width: 100%;
  border-radius: 10px;
  background: #31353f;
  height: fit-content;
  > div {
    height: 12px;
    border-radius: 10px;
    background: linear-gradient(90deg, #06d7ee 0%, #0177fb 100%);
  }
`;

const Btn = styled(FlexCCBox)<{ active: Boolean }>`
  max-width: 130px;
  width: 100%;
  padding: 8px 14px;
  color: #000;
  font-family: "Inter";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 8px;
  background: ${({ active }) =>
    active
      ? `linear-gradient(90deg, #06d7ee 0%, #0177fb 100%)`
      : "linear-gradient(90deg, rgba(6, 215, 238, 0.50) 0%, rgba(1, 119, 251, 0.50) 100%)"};
`;

const BtnContainer = styled(FlexSCBox)`
  width: 100%;
  margin-bottom: 12px;

  > span {
    margin-left: 12px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Invite = () => {
  const { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  const token = useSelector<any>((state) => state.token);

  const spanRef = useRef<HTMLSpanElement>(null);

  const [type, setType] = useState(0);
  const [alldata, setAlldata] = useState({
    refereeCreditAll: 0,
    refereeNum: 0,
    refereePassNum: 0,
  });
  const [headArr, setHead] = useState<string[]>([]);
  const [tbodyArr, setBody] = useState<any>([1, 2]);
  const [totalData, setTotal] = useState(0);
  const [curPage, setPage] = useState(1);
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [lan, setLan] = useState<any>();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    getAlldata().then((res: { data: Data }) => {
      setAlldata(res.data);
    });
    if (type === 0) {
      getAllInvite(curPage).then((res) => {
        setBody(res.data.list);
        setTotal(res.data.total);
      });
    } else {
      getAllAward(curPage).then((res: { data: any }) => {
        setBody(res.data.list);
        setTotal(res.data.total);
      });
    }
  }, [token, type, curPage]);

  return (
    <AllContainer>
      <AllContainer_Title>IDO</AllContainer_Title>
      <BuyContainer>
        <BuyContainer_Info>
          <div>MIN：100U=1万币</div>
          <div>MAX：1000U=10万币</div>
          <div>
            *募资代币锁定钱包，开始交易后需要购买IDO金额的10%来触发解锁IDO代币。
          </div>
        </BuyContainer_Info>
        <ProcessContainer>
          <ProcessBox>
            <div style={{ width: "50%" }}></div>
          </ProcessBox>
          50%
        </ProcessContainer>
        <BtnContainer>
          <Btn active={false}>认购</Btn>{" "}
          <span>
            认购记录 <ToGoIcon />
          </span>
        </BtnContainer>
        <Btn active={true}>领取</Btn> <img src={BuyContainerBg} alt="" />
      </BuyContainer>
    </AllContainer>
  );
};

export default Invite;
