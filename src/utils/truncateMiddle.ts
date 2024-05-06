// 地址格式化
export function truncateMiddle(str: any) {
    const maxLength = 8; // 前后总共截取的字符数
    const frontLength = 4; // 前面截取的字符数
  
    if(!str) {return}

    if (str.length <= maxLength) {
      return str; // 如果字符串长度小于等于最大长度，直接返回原字符串
    }
  
    const frontPart = str.slice(0, frontLength); // 截取前4位
    const backPart = str.slice(-frontLength); // 截取后4位
  
    return `${frontPart}...${backPart}`; // 拼接前后部分及省略号
  }