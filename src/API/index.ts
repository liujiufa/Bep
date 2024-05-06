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

//获取邀请页面下，的数据总览
export function getAlldata() {
  return axois.request({
    url: "/pPassUser/passRefereeInfo",
    method: "post",
  });
}

//获取邀请记录
export function getAllInvite(num: number) {
  return axois.request({
    url: "/pPassUser/refereePledgeList",
    method: "post",
    data: {
      pageNum: num,
      pageSize: 7,
    },
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
export function WatchNFT(id:number){
    return axois.request({
        url:'/pPassPledgeNft/getInfo',
        method:'post',
        data:{
            id,
            pageSize:99999,
        }
    })
}

export function  HaveNFT(){
  return axois.request({
    url:'/pPassNftUser/userNftList',
    method:'post',
    data:{
        pageSize:99999,
    }
})
}

export function getInoBaseInfo(data:any) {
    return axois.request({
      url: `/lLotteryInfo/LotteryCurrentList`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function lastUserList(data:any) {
    return axois.request({
      url: `/lLotteryWinning/lastUserList`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function lotteryInfo(data:any) {
    return axois.request({
      url: `/pPassUser/lotteryInfo`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function bindBtcAddress(data:any) {
    return axois.request({
      url: `/pPassUser/bindBtcAddress`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function LotteryInfoList(data:any) {
    return axois.request({
      url: `/lLotteryInfo/LotteryInfoList`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function LotteryPayList(data:any) {
    return axois.request({
      url: `/lLotteryPay/LotteryPayList`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function LotteryPay(data:any) {
    return axois.request({
      url: `/lLotteryPay/LotteryPay`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function LotteryPayInfo(data:any) {
    return axois.request({
      url: `/pPassUser/LotteryPayInfo`,
      method: "post",
      data: {
        ...data
      },
    });
  }
  export function GetRefereeList(data?:any) {
    return axois.request({
      url: `/user/getRefereeList`,
      method: "GET",
      data: {
        ...data
      },
    });
  } 

  