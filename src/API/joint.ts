

import axois from '../utils/axiosExport'

/**
 *   TODO:分红
 */


//  分红领取记录集合
export function getDivvyDrawList(pageSize:any,pageNum:any=10) {
    return axois.request({
        url: `/jJointHoldDivvyUser/divvyDrawList?pageSize=${pageSize}?pageNum=${pageNum}`,
        method: 'get'
    })
}


//  分红发放记录集合
export function getDivvyIncomeList(pageSize:any,pageNum:any=10) {
    return axois.request({
        url: `/jJointHoldDivvyUser/divvyIncomeList?pageSize=${pageSize}?pageNum=${pageNum}`,
        method: 'get'
    })
}


//  分红奖励详情查询
export function getDivvyInfo() {
    return axois.request({
        url: "/jJointHoldDivvyUser/divvyInfo",
        method: 'get'
    })
}


//  领取分红奖励
export function handleDrawDivvyIncome() {
    return axois.request({
        url: "/jJointHoldDivvyUser/drawDivvyIncome",
        method: 'get'
    })
}



/**
 *   TODO:排行
 */


// 上期分红排行榜
export function getDivvyRankingList() {
    return axois.request({
        url: "/jJointHoldDivvyUser/divvyRankingList",
        method: 'get'
    })
}


/**
 *   TODO:奖励
 */


// 领取感恩收益
export function handleDrawDynamicGratefulIncome() {
    return axois.request({
        url: "/jJointHoldDynamicUser/drawDynamicGratefulIncome",
        method: 'get'
    })
}


// 领取管理收益
export function handleDrawDynamicManageIncome() {
    return axois.request({
        url: "/jJointHoldDynamicUser/drawDynamicManageIncome",
        method: 'get'
    })
}



// 感恩奖励集合查询
export function getGratefulAwardList(pageSize:any,pageNum:any=10) {
    return axois.request({
        url: `/jJointHoldDynamicUser/gratefulAwardList?pageSize=${pageSize}?pageNum=${pageNum}`,
        method: 'get'
    })
}

// 奖励详情
export function getIncomeInfo() {
    return axois.request({
        url: "/jJointHoldDynamicUser/incomeInfo",
        method: 'get'
    })
}

// 管理奖励集合
export function getManageAwardList(pageSize:any,pageNum:any=10) {
    return axois.request({
        url: `/jJointHoldDynamicUser/manageAwardList?pageSize=${pageSize}?pageNum=${pageNum}`,
        method: 'get'
    })
}

/**
 * TODO:参与
 */

// 领取收益
export function handleDrawStaticIncome() {
    return axois.request({
        url: "/jJointHoldStaticUser/drawStaticIncome",
        method: 'get'
    })
}
// 领取收益
export function handleDrawStaticIncomeHoldUbkx() {
    return axois.request({
        url: "/jJointHoldUbkxUser/drawStaticIncome",
        method: 'get'
    })
}


// 获取退出记录集合
export function getExitList() {
    return axois.request({
        url: "/jJointHoldStaticUser/exitList",
        method: 'get'
    })
}


// 退出质押
export function handleExitPledge(data: any) {
    return axois.request({
        url: "/jJointHoldStaticUser/exitPledge",
        method: 'post',
        data
    })
}
// 退出质押
export function getExitPledgeAccount(data: any) {
    return axois.request({
        url: "/jJointHoldStaticUser/getExitPledgeAccount",
        method: 'post',
        data
    })
}


// 查询退出质押账目
// export function getExitPledgeAccount() {
//     return axois.request({
//         url: "/jJointHoldStaticUser/getExitPledgeAccount",
//         method: 'get'
//     })
// }


// 获取联合坐庄参与详情
export function getJoinInfo() {
    return axois.request({
        url: "/jJointHoldStaticUser/joinInfo",
        method: 'get'
    })
}
// 获取质押全UBKX参与详情
export function getJoinInfoUbkxUser() {
    return axois.request({
        url: "/jJointHoldUbkxUser/joinInfo",
        method: 'get'
    })
}
// 获取质押全UBKX记录
export function getjoinListUbkxUser() {
    return axois.request({
        url: "/jJointHoldUbkxUser/joinList",
        method: 'get'
    })
}
// 获取质押全UBKX收益记录集合
export function staticIncomeList(pageNum:any,pageSize:any=10) {
    return axois.request({
        url: `/jJointHoldUbkxUser/staticIncomeList?pageNum=${pageNum}?pageSize=${pageSize}`,
        method: 'get'
    })
}


// 获取参与记录集合
export function getJoinList() {
    return axois.request({
        url: "/jJointHoldStaticUser/joinList",
        method: 'get'
    })
}
// 获取质押全UBKX参与记录集合
export function getJoinListUbkxUser() {
    return axois.request({
        url: "/jJointHoldUbkxUser/joinList",
        method: 'get'
    })
}


// 获取静态收益记录集合
export function getStaticIncomeList(pageNum:any,pageSize:any=10) {
    return axois.request({
        url: `/jJointHoldStaticUser/staticIncomeList?pageNum=${pageNum}?pageSize=${pageSize}`,
        method: 'get'
    })
}






