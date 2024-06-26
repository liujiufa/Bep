import axois from "../utils/axiosExport";
interface LoginData {
  password: string;
  refereeUserAddress: string;
  userAddress: string;
  userPower: number;
}

export function Login(data: LoginData) {
  return axois.request({
    url: "/user/login",
    method: "post",
    data: {
      ...data,
      // Encrypt: true
    },
  });
}

/*获取用户背包信息*/
export function getCardUserList(cardType: number) {
  return axois.request({
    url: `/cCardUser/getCardUserList/${cardType}`,
    method: "get",
  });
}

//获取奖励记录
export function getAllAward(num: number) {
  return axois.request({
    url: "/pPassRefereeCredit/refereeCreditList",
    method: "post",
    data: {
      pageNum: num,
      pageSize: 7,
    },
  });
}

//获取质押记录
export function getPleRec(num: number) {
  return axois.request({
    url: "/pPassPledge/pledgeList",
    method: "post",
    data: {
      pageNum: num,
      pageSize: 7,
    },
  });
}

//获取质押领取记录
export function getGet(num: number) {
  return axois.request({
    url: "/pPassPledgeCredit/creditList",
    method: "post",
    data: {
      pageNum: num,
      pageSize: 7,
    },
  });
}

//取消质押
export function cancelPle(id: number) {
  return axois.request({
    url: "/pPassPledge/pledgeRemove",
    method: "post",
    data: {
      id,
    },
  });
}

//质押页今日总积分
export function PleToday() {
  return axois.request({
    url: "/pPassUser/pledgeInfo",
    method: "post",
  });
}

//查看质押nft
export function WatchNFT(id: number) {
  return axois.request({
    url: "/pPassPledgeNft/getInfo",
    method: "post",
    data: {
      id,
      pageSize: 99999,
    },
  });
}

export function getInoBaseInfo(data: any) {
  return axois.request({
    url: `/lLotteryInfo/LotteryCurrentList`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function lastUserList(data: any) {
  return axois.request({
    url: `/lLotteryWinning/lastUserList`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function lotteryInfo(data: any) {
  return axois.request({
    url: `/pPassUser/lotteryInfo`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function bindBtcAddress(data: any) {
  return axois.request({
    url: `/pPassUser/bindBtcAddress`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function LotteryInfoList(data: any) {
  return axois.request({
    url: `/lLotteryInfo/LotteryInfoList`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function LotteryPayList(data: any) {
  return axois.request({
    url: `/lLotteryPay/LotteryPayList`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function LotteryPay(data: any) {
  return axois.request({
    url: `/lLotteryPay/LotteryPay`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function LotteryPayInfo(data: any) {
  return axois.request({
    url: `/pPassUser/LotteryPayInfo`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function GetRefereeList(data?: any) {
  return axois.request({
    url: `/user/getRefereeList`,
    method: "GET",
    data: {
      ...data,
    },
  });
}
export function getIdoAccountInfo(data?: any) {
  return axois.request({
    url: `/user/getIdoAccountInfo`,
    method: "GET",
    data: {
      ...data,
    },
  });
}
export function getIdoBuyRecord(data?: any) {
  return axois.request({
    url: `/user/getIdoBuyRecord`,
    method: "GET",
    data: {
      ...data,
    },
  });
}

export function drawAward(data: any) {
  return axois.request({
    url: `/user/drawAward`,
    method: "post",
    data: {
      ...data,
    },
  });
}
export function GetUserAccountDetail(data?: any) {
  return axois.request({
    url: `/user/getUserAccountDetail/${data}`,
    method: "GET",
  });
}
// 首页-获取交易数据
export function GetTradeData(data?: any) {
  return axois.request({
    url: `/home/getTradeData`,
    method: "GET",
  });
}

// 首页-获取交易量排名1,持币2
export function GetTradeRank(type?: any) {
  return axois.request({
    url: `/home/getTradeRank/${type}`,
    method: "GET",
  });
}
// 首页-获取交易账户奖励信息
export function GetUserTradeUserAccount(data?: any) {
  return axois.request({
    url: `/home/getTradeUserAccount`,
    method: "GET",
  });
}
// 首页-获取交易账户奖励记录和领取记录 type =1奖励记录 =2 领取记录
export function GetTradeUserAccountDetail(type?: any) {
  return axois.request({
    url: `/home/getTradeUserAccountDetail/${type}`,
    method: "GET",
  });
}
