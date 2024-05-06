import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import { MenuProps, Tooltip } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import { useConnectWallet, injected, ChainId } from "../web3";
import {
  addMessage,
  GetQueryString,
  NumSplic1,
  startWord,
} from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";

import { savePriceAction } from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";
import logo from "../assets/image/logo.png";
import Icon1 from "../assets/image/Layout/Icon1.svg";
import Icon2 from "../assets/image/Layout/Icon2.svg";
import Icon3 from "../assets/image/Layout/Icon3.svg";
import Icon4 from "../assets/image/Layout/Icon4.svg";
import Icon5 from "../assets/image/Layout/Icon5.svg";
import Icon6 from "../assets/image/Layout/Icon6.svg";
import Icon7 from "../assets/image/Layout/Icon7.svg";
import Icon8 from "../assets/image/Layout/Icon8.svg";
import activeIcon1 from "../assets/image/Layout/activeIcon1.svg";
import activeIcon2 from "../assets/image/Layout/activeIcon2.svg";
import activeIcon3 from "../assets/image/Layout/activeIcon3.svg";
import activeIcon4 from "../assets/image/Layout/activeIcon4.svg";
import activeIcon6 from "../assets/image/Layout/activeIcon6.svg";
import outLink1 from "../assets/image/outLink1.svg";
import outLink2 from "../assets/image/outLink2.svg";
import outLink3 from "../assets/image/outLink3.svg";
import outLink4 from "../assets/image/outLink4.svg";
import outLink5 from "../assets/image/outLink5.svg";
import outLink6 from "../assets/image/outLink6.svg";
import allContainerBg from "../assets/image/allContainerBg.png";

import lang from "../assets/image/Layout/lang.svg";
import footballBg from "../assets/image/Layout/footballBg.png";
import footballLogo from "../assets/image/Layout/footballLogo.svg";
import tw from "../assets/image/Layout/tw.svg";
import ms from "../assets/image/Layout/ms.svg";
import dc from "../assets/image/Layout/dc.svg";
import tg from "../assets/image/Layout/tg.svg";
import switchIcon from "../assets/image/Layout/switch.svg";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import useConnectWallet from "../hooks/useConnectWallet";
import { buyCoin, contractAddress, isMain, LOCAL_KEY } from "../config";
import { useViewport } from "../components/viewportContext";
import NoData from "../components/NoData";
import { group } from "console";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../components/FlexBox";
const { Header, Content, Footer, Sider } = Layout;

let refereeUserAddress = isMain
  ? startWord(window?.location?.pathname) || ""
  : GetQueryString("address") || "";
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
  background-size: cover; //根据你图片的大小自定义
  background-repeat: no-repeat;
  /* z-index: -1; */
`;

const HeaderContainer = styled.div`
  width: 100%;
  .HeaderRef {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(11.600000381469727px);
  }
`;
const ConnectContainer = styled(FlexCCBox)`
  margin-left: 20px;
  padding: 10px 14px;
  white-space: nowrap;
  border-radius: 54px;
  background: #fff;
  color: #000;
  text-align: right;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 100% */
`;

const Radio = styled.div<{ type: any }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;

  background: ${(type) => (Number(type) === 1 ? "#18EECF" : "#FF3729")};
`;

const ContentContainer = styled.div`
  z-index: 2;
`;

const FooterContainer = styled(FlexCCBox)`
  position: relative;
  width: 100%;
  padding: 62px 0px;
  background: #18eecf;
  > img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    /* z-index: -1; */
  }
`;
const FooterBox = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  > div {
    width: 100%;
  }
`;

const FooterTop = styled(FlexSBCBox)``;
const FooterTop_Left = styled.div``;

const FooterTop_Right = styled(FlexSBCBox)`
  max-width: 232px;
  width: 100%;
`;
const FooterBottom = styled(FlexCCBox)`
  margin-top: 140px;
  padding-top: 32px;
  border-top: 1px solid #000;
`;

const ModalContainer = styled(FlexBox)<{ src: any }>`
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 90px 20px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 100% 135%;
  background-repeat: no-repeat;
`;
const ModalClose = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 58px;
  height: 58px;
`;

const ModalTitle = styled.div`
  color: #fff;
  font-family: Alibaba PuHuiTi 3;
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: 60px; /* 187.5% */
  text-align: left;
  margin-bottom: 28px;
`;

const ModalContent = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  > img {
    width: 100%;
    max-width: 212px;
  }
  > span {
    color: #18eecf;
    text-shadow: 3px 4px 0px #000;
    font-family: Alibaba PuHuiTi 3;
    font-size: 61px;
    font-style: normal;
    font-weight: 900;
    line-height: 60px; /* 98.361% */
    margin: 35px 0px;
  }
  > input {
    margin: 30px 0px 70px;
    width: 100%;
    max-width: 365px;
    border-radius: 34px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    text-align: center;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    font-family: Alibaba PuHuiTi 3;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    padding: 14px 20px;
    background: transparent;
  }
`;

const ConfirmBtn = styled(FlexCCBox)`
  padding: 30px;
  max-width: 334px;
  width: 100%;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 93.75% */
  letter-spacing: -0.32px;
  background: #fff;
`;

const MainLayout: React.FC = () => {
  let dispatch = useDispatch();
  let state = useSelector<stateType, stateType>((state) => state);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  let [ItemActive, setItemActive] = useState("");
  let [SwitchState, setSwitchState] = useState(false);
  let [CardUserList, setCardUserList] = useState<any>([]);
  let [FragmentCardUserList, setFragmentCardUserList] = useState<any>([]);
  const Navigate = useNavigate();
  const { connectWallet } = useConnectWallet();
  const { width } = useViewport();
  const [collapsed, setCollapsed] = useState(false);
  const [InviteModal, setInviteModal] = useState(false);
  const [infoCollapsed, setInfoCollapsed] = useState(true);
  const [Balance1, setBalance1] = useState<any>("0");
  const [Balance2, setBalance2] = useState<any>("0");
  const [TeamContributeValue, setTeamContributeValue] = useState<any>("0");
  const [InputValue, setInputValue] = useState<any>("");

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

  const location = useLocation();
  const navigate = useNavigate();

  const headerIconObj: any = {
    "/LP": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon1,
      activeIcon: activeIcon1,
    },
    "/APP": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon6,
      activeIcon: activeIcon6,
    },
    "/Game": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon2,
      activeIcon: activeIcon2,
    },
    "/NodeRank": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon3,
      activeIcon: activeIcon3,
    },
    "/MyCommunity": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon4,
      activeIcon: activeIcon4,
    },
    "/Pledge": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon4,
      activeIcon: activeIcon4,
    },
    "/MintRewards": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon1,
      activeIcon: activeIcon1,
    },
    "/NFT": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon2,
      activeIcon: activeIcon2,
    },
    "/Swap": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon1,
      activeIcon: activeIcon1,
    },

    "/LastOrderGame": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon3,
      activeIcon: activeIcon3,
    },
    "/pledge": {
      menu: "MenuItem pointer",
      menuActive: "MenuItem pointer active",
      LangItem: "LangItem",
      activeLangItem: "LangItem activeLangItem",
      Icon: Icon1,
      activeIcon: activeIcon1,
    },
  };

  function menuActive(path: string) {
    if (
      location.pathname === path ||
      (path === "/NFTMint" && location.pathname === "/MintRewards") ||
      (path === "/NFTMint" && location.pathname === "/Pledge")
    ) {
      return headerIconObj[location.pathname]?.menuActive;
    } else if (
      path === "/MiningMachine/MessageIndex" &&
      /^\/MiningMachine.*/.test(location.pathname)
    ) {
      return headerIconObj[location.pathname]?.menuActive;
    } else if (path === "/Joint" && /^\/Joint.*/.test(location.pathname)) {
      return headerIconObj[location.pathname]?.menuActive;
    } else {
      return headerIconObj[path]?.menu;
    }
  }

  function menuDropdownActive(path: string) {
    if (location.pathname === path) {
      return headerIconObj[location.pathname]?.activeLangItem;
    } else {
      return headerIconObj[path]?.LangItem;
    }
  }
  function menuDropdownActiveIcon(path: string) {
    if (location.pathname === path) {
      return headerIconObj[location.pathname]?.activeIcon;
    } else {
      return headerIconObj[path]?.Icon;
    }
  }

  const inputFun = (e: any) => {
    // let value = e.target.value
    // let value = e.target.value.replace(/^[^1-9]+|[^0-9]/g, '')
    let str = e.target.value.trim();
    setInputValue(str);
  };

  // 导航
  const navigateFun = (path: string) => {
    setInfoCollapsed(true);
    if (path === "/outLink") {
      return window.open(
        `https://pancakeswap.finance/swap?outputCurrency=${contractAddress.Token}`
      );
    }
    if (path === "/Soon") {
      // if (path === "/Soon"||path === "/MiningMachine") {
      // if (path === "/Soon" || path.match(RegExp(/Joint/))) {
      return addMessage(t("Open soon"));
    }
    navigate(path);
  };

  const onClickMenu = (e: any) => {
    if (e.key === "/MiningMachine1") return;
    setCollapsed(true);
    setInfoCollapsed(true);
    // if (e.key === '/APP' || e.key.match(RegExp(/Joint/))) return addMessage(t("Open soon"))
    if (e.key === "/APP") return addMessage(t("Open soon"));
    // if (e.key === "/APP"||e.key === "/MiningMachine") return addMessage(t("Open soon"));
    Navigate(e.key);
  };

  const navMenu = (
    <Menu
      onClick={onClickMenu}
      items={[
        {
          label: (
            <span className={menuDropdownActive("/")}>
              <img src={menuDropdownActiveIcon("/")} alt="" /> {t("1")}
            </span>
          ),
          key: "/",
        },

        {
          label: (
            <span className={menuDropdownActive("/MiningMachine1")}>
              {/* <span className={menuDropdownActive("/MiningMachine")}> */}{" "}
              <img src={menuDropdownActiveIcon("/MiningMachine1")} alt="" />
              {t("331")}
            </span>
          ),
          key: "/MiningMachine1",
        },
        {
          label: (
            <span className={menuDropdownActive("/MiningMachine/MessageIndex")}>
              {" "}
              <div className="space"></div> {t("377")}
            </span>
          ),
          key: "/MiningMachine/MessageIndex",
        },
        {
          label: (
            <span className={menuDropdownActive("/MiningMachine")}>
              {" "}
              <div className="space"></div> {t("378")}
            </span>
          ),
          key: "/MiningMachine",
        },
        {
          label: (
            <span className={menuDropdownActive("/MiningMachine/Rewards")}>
              {" "}
              <div className="space"></div> {t("333")}
            </span>
          ),
          key: "/MiningMachine/Rewards",
        },
      ]}
    />
  );

  useEffect(() => {
    if (!infoCollapsed && state.token) {
    
    }
  }, [state.token, infoCollapsed, web3React.account]);

  useEffect(() => {
    if (location.pathname) {
      setItemActive(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="UUContainer">
      <ContainerBg1 src={allContainerBg}></ContainerBg1>
      {/* {location.pathname !== "/" && (
        <ContainerBg4 src={LPContainerBg}></ContainerBg4>
      )} */}

      <HeaderContainer>
        <Header className="HeaderRef">
          <div className="Header-Edition-Center HeaderNav">
            <div className="switchItem">
              {width < 1024 && (
                <Dropdown
                  overlay={navMenu}
                  placement="bottom"
                  overlayClassName="MenuDropDown"
                  trigger={["click"]}
                  getPopupContainer={(triggerNode) => triggerNode}
                >
                  <div
                    className="box"
                    onClick={() => {
                      setCollapsed(!collapsed);
                    }}
                  >
                    {collapsed ? (
                      <MenuUnfoldOutlined rev={undefined} />
                    ) : (
                      <MenuFoldOutlined rev={undefined} />
                    )}
                  </div>
                </Dropdown>
              )}
              <img
                className="HeadMenu"
                src={logo}
                onClick={() => {
                  navigate("/");
                }}
                alt=""
              />
            </div>
            {/* 大屏 */}
            {width >= 1024 && (
              <div className="MenuList">
                <div
                  className={menuActive("/pledge")}
                  onClick={() => {
                    navigateFun("/pledge");
                  }}
                >
                  质押
                </div>
                <div
                  className={menuActive("/NodeRank")}
                  onClick={() => {
                    navigateFun("/NodeRank");
                  }}
                >
                  抽奖
                </div>
                <div
                  className={menuActive("/MyCommunity")}
                  onClick={() => {
                    navigateFun("/MyCommunity");
                  }}
                >
                  活动
                </div>

                <div
                  className={menuActive("/NFT")}
                  onClick={() => {
                    navigateFun("/NFT");
                  }}
                >
                  Invite friends
                </div>
              </div>
            )}

            <div className="setBox">
              <Dropdown
                overlay={menu}
                placement="bottom"
                overlayClassName="LangDropDown"
                trigger={["click"]}
                arrow={false}
                getPopupContainer={(triggerNode) => triggerNode}
                onOpenChange={(value) => {
                  setSwitchState(value);
                }}
              >
                <div className="LangBox">
                  <img src={lang} alt="" className="langIcon" />
                  {
                    langObj.find(
                      (item: any) => String(item.key) === String(i18n.language)
                    )?.value
                  }
                  <img
                    src={switchIcon}
                    alt=""
                    className={
                      SwitchState
                        ? "rotetaOpen switchIcon"
                        : "rotetaClose switchIcon"
                    }
                  />
                </div>
              </Dropdown>
            </div>
            <ConnectContainer>
              <Radio type={1}></Radio>Network error
            </ConnectContainer>
          </div>
        </Header>
      </HeaderContainer>

      <ContentContainer>
        <Layout
          style={{
            padding: "100px 0px ",
          }}
          className="MainContent"
          onClick={() => {
            setCollapsed(true);
            setInfoCollapsed(true);
          }}
        >
          <Outlet />
          {!infoCollapsed && <div className="mask"></div>}
        </Layout>
      </ContentContainer>

      <FooterContainer>
        <img src={footballBg} alt="" />
        <FooterBox>
          <FooterTop>
            <FooterTop_Left>
              <img src={footballLogo} alt="" />
            </FooterTop_Left>
            <FooterTop_Right>
              <img src={tg} alt="" />
              <img src={ms} alt="" />
              <img src={dc} alt="" />
              <img src={tw} alt="" />
            </FooterTop_Right>
          </FooterTop>
          <FooterBottom>
            Copyright @ 2023. Al Rights Reserved By BITDEX
          </FooterBottom>
        </FooterBox>
      </FooterContainer>
    </div>
  );
};
export default MainLayout;
