import style from "./CountDown.module.scss";
import moment from "moment";
import Countdown, {calcTimeDelta, CountdownTimeDelta, zeroPad} from 'react-countdown';
import {Flex, Text, useColorModeValue} from "@chakra-ui/react";
import SmoothBox from "../SmoothBox/SmoothBox";


function timeDeltaToString(date: CountdownTimeDelta) {
    return `${date.days} jours, ${date.hours} heures, ${date.minutes} minutes et ${date.seconds} secondes`
}


const Viewer = (props: {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    status: 'completed' | 'running' | 'notStarted',
    timeLeft?: CountdownTimeDelta,
}) => {

    const {days, hours, minutes, seconds, status, timeLeft} = props;
    const color = {
        completed: "green.500",
        running: "yellow",
        notStarted: "red",
    }
    const bgColor = color[status];
    const textColor = color[status] === "yellow" ? "black" : "white";
    const bgBox = useColorModeValue("gray.100", "gray.700");
    const competitionStatus = status === "completed" ?
        "La compétition est terminé" : status === "notStarted" ?
            `Commence dans ${timeDeltaToString(timeLeft)}` : "La compétition est en cours";
    return (
        <div>
            <SmoothBox className={style.title} bg={bgBox} w={"100%"}>
                {competitionStatus}
            </SmoothBox>
            <div className={style.countdownWrapper}>
                <Flex bg={bgColor} className={style.countdownBox} textColor={textColor}>
                    {zeroPad(days)}
                    <Text className={style.legend}>
                        Jours
                    </Text>
                </Flex>
                <Flex bg={bgColor} className={style.countdownBox} textColor={textColor}>
                    {zeroPad(hours)}
                    <Text className={style.legend}>Heures</Text>
                </Flex>
                <Flex bg={bgColor} className={style.countdownBox} textColor={textColor}>
                    {zeroPad(minutes)}
                    <Text className={style.legend}>Minutes</Text>
                </Flex>
                <Flex bg={bgColor} className={style.countdownBox} textColor={textColor}>
                    {zeroPad(seconds)}
                    <Text className={style.legend}>Seconds</Text>
                </Flex>
            </div>
        </div>
    )
        ;

};
const renderer = (data: {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    completed: boolean,
    props: any
    api: any,
}) => {
    const {days, hours, minutes, seconds, completed, props} = data;
    const {startDate, endDate} =
        props as { startDate: moment.Moment, endDate: moment.Moment };
    const isNotStarted = moment().isBefore(startDate);
    if (completed) {
        // Render a completed state
        return <Viewer days={days}
                       hours={hours}
                       minutes={minutes}
                       seconds={seconds}
                       status={"completed"}
        />

    } else if (isNotStarted) {
        return <Viewer days={days}
                       hours={hours}
                       minutes={minutes}
                       seconds={seconds}
                       status={"notStarted"}
                       timeLeft={calcTimeDelta(startDate.toDate())}
        />

    } else {
        // Render a countdown
        return <Viewer days={days} hours={hours} minutes={minutes} seconds={seconds} status={"running"}/>
    }
};
const CountDown = (
    props: {
        startDate: moment.Moment,
        endDate: moment.Moment,

    }
) => {
    const {startDate: start, endDate: end} = props;

    return (
        // @ts-ignore
        <Countdown date={end.toDate()} renderer={renderer} now={
            () => {
                return start.isAfter(moment()) ? start.toDate() : moment().toDate()
            }
        }
                   startDate={start}

        />
    )
}
export default CountDown;