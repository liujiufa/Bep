


export const decimalNum = (num: string | number = 0, decimal?: string|number, delimiter = "", currencySymbol = "") => {

    decimal ??= 2

    const big = num ? num.toString() : "0"

    const negativeNChar = Number(big) < 0 ? "-" : ""

    const bigArr = ((Number(big) < 0) ? big.slice(1) : big).toString().split(".")
    let intStr = ''
    let decStr = bigArr[1]?.slice(0, Number(decimal)) || ""

    while (!Number(decStr[decStr.length-1]) && !!decStr) {
        decStr = decStr.slice(0, decStr.length-1)
    }
    bigArr[0].split("").reverse().forEach((item, idx) => {
        if (!!idx && !(idx % 3) && (idx !== (bigArr[0].length))) {
            intStr = item + delimiter + intStr
        } else {
            intStr = item + intStr
        }
    })

    if (Number(decimal)) {
        if(decStr) {
            intStr += "." + decStr
        }
    }

    return currencySymbol + negativeNChar + intStr
}


export const decimalNumRedundancy = (num: string | number = 0, decimal?: string|number, delimiter = "", currencySymbol = "") => {

    decimal ??= 2


    const value = decimalNum(num, Number(decimal), delimiter, currencySymbol)


    const str = value.replaceAll(currencySymbol, "");

    const str1 = str.replaceAll(delimiter, "");

    let decStr = "0."
    let handleData = false

    for (let index = 0; index < (Number(decimal) - 1); index++) {
        decStr += "0"
    }

    if (!!Number(Number(decimal)) && !!Number(num.toString()) && !Number(str1.toString())) {
        decStr += "1"
        handleData = true
    }

    return handleData ? `<${decimalNum(decStr, Number(decimal), "", currencySymbol)}` : value
}
