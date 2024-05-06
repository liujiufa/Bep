import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import { MenuProps, Tooltip } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { useConnectWallet, injected, ChainId } from "../web3";
import {
  addMessage,
  AddrHandle,
  GetQueryString,
  NumSplic1,
  showLoding,
  startWord,
} from "../utils/tool";
import { Login } from "../API/index";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";
import Web3 from "web3";
import { createLoginSuccessAction, savePriceAction } from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";
import logo from "../assets/image/logo.png";
import allContainerBg from "../assets/image/allContainerBg.png";

import personIcon from "../assets/image//Layout/personIcon.svg";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import useConnectWallet from "../hooks/useConnectWallet";
import { buyCoin, contractAddress, isMain, LOCAL_KEY } from "../config";
import { useViewport } from "../components/viewportContext";
import NoData from "../components/NoData";
import { group } from "console";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../components/FlexBox";
import { useSign } from "../hooks/useSign";
import { truncateMiddle } from "../utils/truncateMiddle";
import { showLoding as showLodingFun } from "../utils/tool";
const { Header, Content, Footer, Sider } = Layout;

let refereeUserAddress: any;
let langObj = [
  { value: "中文", key: "zh" },
  { value: "EN", key: "en" },
];

const ContainerBg1 = styled(FlexSBCBox)<{ src: any }>`
  position: absolute;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
  height: 1462px;
  width: 2341.5px;
  background-image: ${({ src }) => `url(${src})`};
  background-position: center;
  background-size: 100% 100%; //根据你图片的大小自定义
  background-repeat: no-repeat;
  /* z-index: -1; */
`;

const HeaderContainer = styled(Header)`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(11.600000381469727px);
`;
const ConnectContainer = styled(FlexCCBox)`
  margin-left: 20px;
  padding: 8px;
  white-space: nowrap;
  color: #27d2ac;
  font-family: "PingFang SC";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  border-radius: 10px;
  border: 1px solid #9dd1ab;
  @media (max-width: 1024px) {
    margin-left: 10px;
  }
`;

const Radio = styled.div<{ type: any }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background: ${(type) => (Number(type) === 1 ? "#18EECF" : "#FF3729")};
`;

const ContentContainer = styled(Layout)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
  overflow-y: auto;
  z-index: 2;
  background: transparent;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    /* padding: 40px 0px; */
  }
`;

const FooterContainer = styled(FlexCCBox)`
  height: 80px;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12.100000381469727px);
  @media (max-width: 768px) {
    /* margin-bottom: 26px; */
    padding: 32px 0px 12px;
  }
`;

const RightSider = styled(FlexBox)`
  width: fit-content;
  align-items: center;
  justify-content: flex-end;
`;

const SiderSwitchBox = styled(FlexCCBox)`
  margin-left: 8px;
  > img {
    width: 34px;
    height: 34px;
  }
`;

const SiderContainer = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 25px 20px;
  > img {
  }
`;
const AddressContainer = styled(FlexCCBox)`
  width: 100%;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 114.286% */
  text-transform: uppercase;
  margin: 6px 0px;
`;

const BNBBalance = styled.div`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 160% */
  text-transform: uppercase;
`;
const ManageContainer = styled(FlexSBCBox)`
  max-width: 230px;
  width: 100%;
  margin-top: 15px;
`;
const ManageItem = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  width: 94px;
  padding: 6px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 160% */
  border-radius: 6px;
  background: #5d606f;
  > img {
    margin-bottom: 2px;
    width: 12px;
    height: 12px;
  }
`;

const MenuContainer = styled(FlexBox)`
  margin-top: 15px;
  flex-direction: column;
  align-items: center;
  .MenuItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 100% */
    padding: 0px 24px;
    text-transform: uppercase;
    margin-top: 20px;
    .setBox {
      border: 1px solid #fff;
      border-radius: 33px;
      padding: 8px 12px;

      .LangBox {
        img {
          margin: 0px 12px;
        }
      }
    }
  }
  .LangMenuItem {
    margin-top: 40px;
  }

  .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #18eecf;
  }
`;
const PersonContainer = styled(FlexCCBox)`
  > img {
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-left: 8px;
    }
  }
`;

const MainLayout: React.FC = () => {
  let dispatch = useDispatch();
  const token = useSelector((state: any) => state?.token);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  let [ItemActive, setItemActive] = useState("/");
  let [SwitchState, setSwitchState] = useState(false);
  const { signFun } = useSign();

  const { connectWallet } = useConnectWallet();
  const { width } = useViewport();
  const [BNBBalanceAmount, setBNBBalanceAmount] = useState<any>("0");
  const [infoCollapsed, setInfoCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const web3 = new Web3();
  const pathname = startWord(location.pathname);
  console.log(pathname, location.pathname);

  function changeLanguage(lang: any) {
    window.localStorage.setItem(LOCAL_KEY, lang.key);
    i18n.changeLanguage(lang.key);
  }

  const menu = (
    <Menu
      onClick={changeLanguage}
      items={langObj.map((item: any) => {
        return {
          label: <span className="LangItem">{item.value}</span>,
          key: item?.key,
        };
      })}
    />
  );

  const headerIconObj: any = {
    "/": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
    "/invite": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
    "/APP": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
    "/Game": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
    "/Lottery": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
    "/Activity": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
    "/NFT": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
    },
  };

  function menuActive(path: string) {
    if (
      ItemActive === path ||
      (path === "/Lottery" && /^\/Lottery.*/.test(ItemActive))
    ) {
      return headerIconObj[path]?.menuActive;
    } else {
      return headerIconObj[path]?.menu;
    }
  }

  // 导航
  const navigateFun = (path: string) => {
    setInfoCollapsed(true);
    // if (path === "/NFT") {
    //   return window.open(`https://www.bitdexnft.com/sale`);
    // }
    if (path === "/Soon") {
      return addMessage(t("Open soon"));
    }
    navigate("/View" + path);
  };

  function invitation() {
    if (!web3React.account) {
      return addMessage(t("Please link wallet"));
    } else {
      copy(web3React.account);
      addMessage(t("Copied successfully"));
    }
  }

  const ConnectBox = (account: any) => {
    console.log("nihao", account);
    if (account) {
      return (
        <PersonContainer>
          <ConnectContainer>{AddrHandle(account as string)}</ConnectContainer>
          <img src={personIcon} alt="" />
        </PersonContainer>
      );
    } else if (false) {
      return (
        <ConnectContainer>
          <Radio type={1}></Radio>Network error
        </ConnectContainer>
      );
    } else {
      return (
        <ConnectContainer
          onClick={() => {
            connectWallet && connectWallet();
          }}
          className="pointer"
        >
          Connect Wallet
        </ConnectContainer>
      );
    }
  };

  const LoginFun = useCallback(async () => {
    if (web3React.account) {
      let tag = await web3.utils.isAddress(window.location.pathname.slice(1));
      if (tag) {
        refereeUserAddress = window.location.pathname.slice(1);
      } else {
        refereeUserAddress = "";
      }
      await signFun((res: any) => {
        Login({
          ...res,
          userAddress: web3React.account as string,
          userPower: 0,
          password: "123",
          ethAddress: "",
          refereeUserAddress,
        }).then((res: any) => {
          if (res.code === 200) {
            showLodingFun(false);
            dispatch(
              createLoginSuccessAction(
                res.data.token,
                web3React.account as string
              )
            );
          } else {
            showLodingFun(false);
            addMessage(res.msg);
          }
        });
      }, `userAddress=${web3React.account as string}&refereeUserAddress=${refereeUserAddress}`);
    }
  }, [web3React.account, refereeUserAddress]);

  useEffect(() => {
    connectWallet && connectWallet();
  }, [connectWallet]);

  useEffect(() => {
    LoginFun();
  }, [web3React.account]);

  useEffect(() => {
    if (web3React.account) {
      Contracts.example.getBalance(web3React.account).then((res: any) => {
        console.log(res, "我的绑定");
        let amounted = Web3.utils.fromWei(res);
        setBNBBalanceAmount(amounted);
      });
    }
  }, [web3React.account]);

  useEffect(() => {
    if (pathname) {
      setItemActive(pathname);
    }
  }, [pathname]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showLoding, setShowLoding] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.style.overflow = showLoding ? "hidden" : "auto";
  }, [showLoding]);

  return (
    <div className="UUContainer">
      <ContainerBg1 src={allContainerBg}></ContainerBg1>

      <div className="home">
        <div className="harder">
          <img className="logo" src={logo} alt="" />
          <div style={{ flex: 1 }}></div>
          <div
            className="connectWallet"
            onClick={() => {
              connectWallet();
            }}
          >
            {truncateMiddle(web3React?.account) || "Connect Wallet"}
          </div>
          <svg
            onClick={() => {
              setShowLoding(!showLoding);
            }}
            style={{ display: showLoding ? "none" : "block" }}
            className="tag"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.45 22.5H2.55C1.9695 22.5 1.5 22.0305 1.5 21.45V19.35C1.5 18.7695 1.9695 18.3 2.55 18.3H21.45C22.0305 18.3 22.5 18.7695 22.5 19.35V21.45C22.5 22.0305 22.029 22.5 21.45 22.5ZM21.45 14.1H2.55C1.9695 14.1 1.5 13.6305 1.5 13.05V10.95C1.5 10.3695 1.9695 9.9 2.55 9.9H21.45C22.0305 9.9 22.5 10.3695 22.5 10.95V13.05C22.5 13.6305 22.029 14.1 21.45 14.1ZM21.45 5.7H2.55C1.9695 5.7 1.5 5.2305 1.5 4.65V2.55C1.5 1.9695 1.9695 1.5 2.55 1.5H21.45C22.029 1.5 22.5 1.9695 22.5 2.55V4.65C22.5 5.2305 22.029 5.7 21.45 5.7Z"
              fill="white"
            />
          </svg>
          <svg
            onClick={() => {
              setShowLoding(!showLoding);
            }}
            className="tag"
            style={{ display: showLoding ? "block" : "none" }}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M11.6611 10.3363L7.32605 6.00002L11.6623 1.66377C12.0298 1.29627 12.0311 0.703772 11.6636 0.336272C11.2973 -0.029978 10.7023 -0.029978 10.3373 0.336272L5.9998 4.67252L1.66231 0.336272C1.29731 -0.029978 0.703555 -0.029978 0.336055 0.336272C-0.0289451 0.702522 -0.0289452 1.29752 0.338555 1.66502L4.67355 6.00002L0.337305 10.335C-0.0301951 10.7013 -0.0301951 11.295 0.336055 11.6625C0.519805 11.8475 0.762305 11.9375 0.999805 11.9375C1.2373 11.9375 1.47981 11.8475 1.66231 11.6638L5.9998 7.32752L10.3373 11.6638C10.5211 11.8463 10.7611 11.9375 10.9998 11.9375C11.2398 11.9375 11.4798 11.8475 11.6623 11.6638C12.0286 11.295 12.0298 10.7025 11.6611 10.3363Z"
              fill="white"
            />
          </svg>
          <div
            className="harder-mask"
            style={{ display: showLoding ? "block" : "none" }}
          >
            <div className="harder-mask-li">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.0001 1.71429C11.2855 1.71429 10.5817 1.79008 9.88879 1.93084C9.42323 2.02828 9.12007 2.48302 9.21751 2.95941C9.31496 3.42497 9.76969 3.72813 10.2461 3.63069C10.8199 3.51159 11.4154 3.44663 12.0001 3.44663C16.7207 3.44663 20.5535 7.27941 20.5535 12C20.5535 16.7206 16.7207 20.5534 12.0001 20.5534C7.27947 20.5534 3.44669 16.7206 3.44669 12C3.44669 10.2893 3.95556 8.63279 4.90834 7.21444C5.18984 6.79219 5.51466 6.40241 5.87195 6.03429C6.20759 5.68783 6.19676 5.14647 5.8503 4.81084C5.50383 4.4752 4.96248 4.48602 4.62684 4.83249C4.20458 5.26557 3.81481 5.74196 3.46834 6.25084C2.32067 7.95069 1.71436 9.94287 1.71436 12C1.71436 17.6734 6.32669 22.2857 12.0001 22.2857C17.6735 22.2857 22.2858 17.6734 22.2858 12C22.2858 6.32663 17.6735 1.71429 12.0001 1.71429Z"
                  fill="url(#paint0_linear_23_279)"
                />
                <path
                  d="M6.00039 10.5503C6.00039 11.0322 6.37504 11.4264 6.83295 11.4264H17.1671C17.5001 11.4264 17.8123 11.2183 17.9372 10.8898C18.0621 10.5613 17.9996 10.189 17.7603 9.93708L15.0753 7.11173C14.7526 6.77225 14.2219 6.77225 13.8993 7.11173C13.5767 7.45121 13.5767 8.00971 13.8993 8.34919L15.1689 9.68521H6.84335C6.37504 9.67426 6.00039 10.0685 6.00039 10.5503ZM17.9996 13.4523C17.9996 12.9705 17.625 12.5763 17.1671 12.5763H6.83295C6.49992 12.5763 6.18772 12.7843 6.06283 13.1129C5.93795 13.4414 6.00039 13.8137 6.23975 14.0656L8.92475 16.891C9.09126 17.0662 9.2994 17.1428 9.51794 17.1428C9.73649 17.1428 9.94463 17.0552 10.1111 16.891C10.4338 16.5515 10.4338 15.993 10.1111 15.6535L8.84149 14.3175H17.1671C17.625 14.3284 17.9996 13.9342 17.9996 13.4523Z"
                  fill="url(#paint1_linear_23_279)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_23_279"
                    x1="12.0001"
                    y1="1.71429"
                    x2="12.0001"
                    y2="22.2857"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#06D7EE" />
                    <stop offset="1" stop-color="#0177FB" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_23_279"
                    x1="12"
                    y1="6.85712"
                    x2="12"
                    y2="17.1428"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#06D7EE" />
                    <stop offset="1" stop-color="#0177FB" />
                  </linearGradient>
                </defs>
              </svg>
              Trading
            </div>
            <div
              className="harder-mask-li"
              onClick={() => {
                navigate(`${web3React.account}/IDO`);
                setShowLoding(!showLoding);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2.40002C6.8805 2.40002 3.021 4.30652 3.021 6.83702V17.1645C3.021 19.6935 6.8805 21.6 12 21.6C17.1195 21.6 20.979 19.6935 20.979 17.163V6.83702C20.979 4.30802 17.1195 2.40002 12 2.40002ZM12 3.90002C16.281 3.90002 19.479 5.45102 19.479 6.83702C19.479 8.22302 16.2795 9.77402 12 9.77402C7.7205 9.77402 4.521 8.22302 4.521 6.83702C4.521 5.45102 7.719 3.90002 12 3.90002ZM12 20.1C7.719 20.1 4.521 18.549 4.521 17.163V14.5215C6.1035 15.6945 8.8065 16.437 12 16.437C15.195 16.437 17.898 15.6945 19.479 14.5215V17.163C19.479 18.549 16.281 20.1 12 20.1ZM12 14.937C7.719 14.937 4.521 13.386 4.521 12V9.35852C6.1035 10.5315 8.8065 11.274 12 11.274C15.195 11.274 17.898 10.5315 19.479 9.35852V12C19.479 13.386 16.281 14.937 12 14.937Z"
                  fill="#A3A3A3"
                />
              </svg>
              IDO
            </div>
            <div
              className="harder-mask-li"
              onClick={() => {
                navigate("/account");
                setShowLoding(!showLoding);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.15 12.7688C9.39141 12.7688 7.14844 10.5258 7.14844 7.76719C7.14844 5.00859 9.39141 2.76562 12.15 2.76562C14.9086 2.76562 17.1516 5.00859 17.1516 7.76719C17.1516 9.10313 16.6312 10.3594 15.6867 11.3039C14.7422 12.2484 13.4859 12.7688 12.15 12.7688ZM12.15 4.40391C10.2961 4.40391 8.78906 5.91094 8.78906 7.76484C8.78906 9.61875 10.2961 11.1258 12.15 11.1258C14.0039 11.1258 15.5109 9.61875 15.5109 7.76484C15.5109 5.91094 14.0039 4.40391 12.15 4.40391ZM18.5602 21.9797H6.01406C4.03594 21.9797 2.42578 20.3695 2.42578 18.3914V17.6742C2.42578 15.6961 4.03594 14.0859 6.01406 14.0859H18.5625C20.5406 14.0859 22.1508 15.6961 22.1508 17.6742V18.3914C22.1484 20.3695 20.5383 21.9797 18.5602 21.9797ZM6.01406 15.7266C4.94062 15.7266 4.06641 16.6008 4.06641 17.6742V18.3914C4.06641 19.4648 4.94062 20.3391 6.01406 20.3391H18.5625C19.6359 20.3391 20.5102 19.4648 20.5102 18.3914V17.6742C20.5102 16.6008 19.6359 15.7266 18.5625 15.7266H6.01406Z"
                  fill="#A3A3A3"
                />
              </svg>
              账号
            </div>
            <div className="harder-mask-li">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 6.75C11.3086 6.75 10.6336 6.68906 9.97969 6.57422C10.5938 4.10859 11.5172 2.8125 12 2.8125C12.4828 2.8125 13.4062 4.10859 14.0203 6.57422C13.3664 6.68672 12.6914 6.75 12 6.75ZM15.2977 6.27188C14.9789 4.96641 14.5523 3.86719 14.0531 3.05156C15.5437 3.39375 16.8961 4.09922 18.0141 5.06953C17.1867 5.58047 16.2727 5.98594 15.2977 6.27188ZM8.70234 6.27188C7.72734 5.98594 6.81563 5.57812 5.98828 5.06953C7.10625 4.09922 8.45625 3.39609 9.94687 3.05391C9.44766 3.86719 9.02344 4.96641 8.70234 6.27188ZM15.9258 11.3438C15.8953 9.99609 15.7687 8.72109 15.5648 7.56094C16.7953 7.20938 17.9391 6.68672 18.9586 6.01875C20.2102 7.47187 21.0094 9.31641 21.1547 11.3438H15.9258ZM2.84531 11.3438C2.99063 9.31875 3.7875 7.47422 5.03672 6.02109C6.05625 6.68906 7.20234 7.20703 8.43516 7.55859C8.23125 8.72109 8.10469 9.99609 8.07422 11.3438H2.84531ZM9.38672 11.3438C9.41719 10.0383 9.53672 8.87344 9.7125 7.85859C10.4531 7.98984 11.2148 8.0625 12 8.0625C12.7828 8.0625 13.5469 7.99219 14.2875 7.86094C14.4633 8.87578 14.5805 10.0406 14.6133 11.3438H9.38672ZM18.9586 17.9813C17.9391 17.3133 16.7953 16.7906 15.5648 16.4391C15.7687 15.2766 15.8953 14.0016 15.9258 12.6562H21.1547C21.0094 14.6836 20.2102 16.5281 18.9586 17.9813ZM9.7125 16.1414C9.53672 15.1266 9.41953 13.9617 9.38672 12.6562H14.6109C14.5805 13.9594 14.4633 15.1242 14.2852 16.1391C13.5469 16.0078 12.7828 15.9375 12 15.9375C11.2172 15.9375 10.4531 16.0102 9.7125 16.1414ZM5.03906 17.9789C3.78984 16.5258 2.99063 14.6812 2.84766 12.6562H8.07656C8.10703 14.0039 8.23359 15.2789 8.4375 16.4414C7.20469 16.793 6.05859 17.3109 5.03906 17.9789ZM12 21.1875C11.5172 21.1875 10.5938 19.8914 9.97969 17.4258C10.6336 17.3133 11.3086 17.25 12 17.25C12.6914 17.25 13.3664 17.3133 14.0203 17.4258C13.4062 19.8914 12.4828 21.1875 12 21.1875ZM14.0531 20.9484C14.5523 20.1328 14.9789 19.0336 15.2977 17.7281C16.275 18.0141 17.1867 18.4195 18.0141 18.9281C16.8961 19.9008 15.5437 20.6062 14.0531 20.9484ZM9.94687 20.9484C8.45625 20.6062 7.10625 19.9031 5.98828 18.9328C6.81328 18.4219 7.725 18.0164 8.70234 17.7305C9.02344 19.0336 9.44766 20.1328 9.94687 20.9484Z"
                  fill="#A3A3A3"
                />
              </svg>
              繁体中文
            </div>
          </div>
        </div>
      </div>

      <ContentContainer className="MainContent">
        <Outlet />
      </ContentContainer>

      {/* <FooterContainer></FooterContainer> */}
    </div>
  );
};
export default MainLayout;
