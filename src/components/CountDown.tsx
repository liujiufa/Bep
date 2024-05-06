import React, { useCallback } from "react";
import moment from 'moment';
const { useState, useEffect, useRef } = React;

let timer: any = null;

function CountDown(props: any) {
    //react Hooks
    console.log(props.timeStamp, 'props.timeStamp');

    // 当前时间
    const [currentTime, setCurrentTime] = useState(moment());
    // 终止时间
    const [endTime, setEndTime] = useState<any>(moment().add(Number(props.timeStamp), "s"));
    // 时间差 /倒计时时间
    const [diffTime, setDiffTime] = useState<any>(moment().add(Number(props.timeStamp), "s").diff(currentTime, "s"));
    // const timer = useRef();
    useEffect(() => {
        // 开启定时器
        if (diffTime == 0) {
            window.clearInterval(timer);
            console.log("清除定时器");
        }
        if (timer) return;
        timer = window.setInterval(() => {
            setDiffTime((diffTime: any) => diffTime - 1);
        }, 1000);
    }, [diffTime, props.timeStamp]);

    useEffect(() => {
        // setEndTime(moment().add(Number(props.timeStamp), "s"))
        // setDiffTime(moment().add(Number(props.timeStamp), "s").diff(currentTime, "s"))
        // 清除副作用
        return () => {
            clearInterval(timer);
        };
    }, []);

    // 将秒转成时分秒
    const convertSecToHHmmss = (sec: any) => {
        let currentSec = moment.duration(sec, "seconds");
        return moment({
            h: currentSec.hours(),
            m: currentSec.minutes(),
            s: currentSec.seconds(),
        }).format("HH:mm:ss");
    }

    return (
        <>
            {convertSecToHHmmss(diffTime)}
        </>
    );
}

export default CountDown;