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
import lang from "../assets/image/Layout/lang.svg";
import switchIcon from "../assets/image/Layout/switch.svg";
import SwitchIcon from "../assets/image/Layout/SwitchIcon.svg";
import avtorIcon from "../assets/image/Layout/avtorIcon.svg";
import disconnectIcon from "../assets/image/Layout/disconnectIcon.svg";
import copyIcon from "../assets/image/Layout/copyIcon.svg";

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
  padding: 80px 0px;
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
  >img{
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
            showLoding(false);
            dispatch(
              createLoginSuccessAction(
                res.data.token,
                web3React.account as string
              )
            );
          } else {
            showLoding(false);
            addMessage(res.msg);
          }
        });
      }, `userAddress=${web3React.account as string}&refereeUserAddress=${refereeUserAddress}`);
    }
  }, [web3React.account,refereeUserAddress]);

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

  return (
    <div className="UUContainer">
      <ContainerBg1 src={allContainerBg}></ContainerBg1>
      {/* {String(ItemActive) === "/" && (
        <ContainerBg1 src={allContainerBg2}></ContainerBg1>
      )} */}
      <HeaderContainer>
        <div className="Header-Edition-Center HeaderNav">
          <div className="switchItem">
            <img
              className="HeadMenu"
              src={logo}
              onClick={() => {
                navigate("/View/");
              }}
              alt=""
            />
          </div>
          {/* 大屏 */}
          {width >= 1024 && (
            <div className="MenuList">
              <div
                className={menuActive("/")}
                onClick={() => {
                  navigateFun("/");
                }}
              >
                {t("6")}
              </div>
              <div
                className={menuActive("/Lottery")}
                onClick={() => {
                  navigateFun("/Lottery/1");
                }}
              >
                {t("22")}
              </div>
              <div
                className={menuActive("/Activity")}
                onClick={() => {
                  navigateFun("/Activity");
                }}
              >
                {t("23")}
              </div>

                <div
                  className={menuActive("/invite")}
                  onClick={() => {
                    navigateFun("/invite");
                  }}
                >
                  {t("24")}
                </div>
              </div>
            )}

          <RightSider>
            {width > 1024 && (
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
                    <div>
                      {
                        langObj.find(
                          (item: any) =>
                            String(item.key) === String(i18n.language)
                        )?.value
                      }
                    </div>
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
            )}
            {ConnectBox(web3React.account)}
            {width < 1024 && (
              <SiderSwitchBox>
                <img
                  src={SwitchIcon}
                  alt=""
                  onClick={() => {
                    setInfoCollapsed(!infoCollapsed);
                  }}
                />
              </SiderSwitchBox>
            )}
          </RightSider>
        </div>
      </HeaderContainer>

      <ContentContainer className="MainContent">
        <Sider
          width={width > 425 ? 425 : "100%"}
          className="rightSider"
          collapsedWidth="0"
          trigger={null}
          collapsible
          collapsed={infoCollapsed}
          style={{
            background: "rgba(0,0,0,0.8)",
            overflow: "auto",
            height: "100%",
            position: "fixed",
            right: 0,
            top: 80,
            bottom: 0,
            paddingTop: 0,
            zIndex: 999,
          }}
        >
          <SiderContainer>
            <img src={avtorIcon} alt="" />
            <AddressContainer>
              {AddrHandle(web3React.account as string, 6, 6)}
            </AddressContainer>
            {/* <BNBBalance>{NumSplic1(BNBBalanceAmount, 2)} BNB</BNBBalance> */}
            <ManageContainer>
              <ManageItem
                onClick={() => {
                  invitation();
                }}
              >
                <img src={copyIcon} alt="" />
                Copy Address
              </ManageItem>
              <ManageItem
                onClick={() => {
                  web3React.deactivate();
                }}
              >
                <img src={disconnectIcon} alt="" />
                Disconnect
              </ManageItem>
            </ManageContainer>

            <MenuContainer>
              <div
                className={menuActive("/")}
                onClick={() => {
                  navigateFun("/");
                }}
              >
                {t("6")}
              </div>
              <div
                className={menuActive("/Lottery")}
                onClick={() => {
                  navigateFun("/Lottery/1");
                }}
              >
                {t("22")}
              </div>
              <div
                className={menuActive("/Activity")}
                onClick={() => {
                  navigateFun("/Activity");
                }}
              >
                {t("23")}
              </div>

              <div
                className={menuActive("/invite")}
                onClick={() => {
                  navigateFun("/invite");
                }}
              >
                {t("24")}
              </div>
              <div className="MenuItem LangMenuItem">
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
                          (item: any) =>
                            String(item.key) === String(i18n.language)
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
              </div>
            </MenuContainer>
          </SiderContainer>
        </Sider>

        <Outlet />
        {!infoCollapsed && (
          <div
            className="mask"
            onClick={() => {
              setInfoCollapsed(true);
            }}
          ></div>
        )}
      </ContentContainer>

      <FooterContainer></FooterContainer>
    </div>
  );
};
export default MainLayout;
