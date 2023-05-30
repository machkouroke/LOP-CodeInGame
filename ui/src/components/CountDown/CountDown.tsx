import {useEffect, useState} from 'react';
import "./CountDown.css";
import moment from "moment";

function getTimeRemaining(endDate: moment.Moment, startDate: moment.Moment): moment.Duration {
    const duration = moment.duration(endDate.diff(startDate));
    return duration.asMilliseconds() > 0 ? duration : moment.duration(0);
}

// const moment1 = moment();
// const moment2 = moment("2023-05-28T05:30:00");
const moment1 = moment();
const moment2 = moment("2023-05-28T05:30:00");

// @ts-ignore


const Countdown = (props: { startDate: moment.Moment, endDate: moment.Moment, name: string }) => {
    const {startDate, endDate, name} = props;
    const [countdownData, setCountdownData] = useState<moment.Duration>(
        getTimeRemaining(endDate, startDate));
    useEffect(() => {
        if (moment().isAfter(startDate) && moment().isBefore(endDate)) {
            const updateCountdownData = () => {
                setCountdownData(getTimeRemaining(endDate, moment()));

            }

            updateCountdownData();
        }
    }, [startDate, endDate, moment()]);
    return (
        <div>

            <div className='countdown-wrapper'>
                <div className='countdown-box'>
                    {countdownData.days()}
                    <span className='legend'>Jours</span>
                </div>
                <div className='countdown-box'>
                    {countdownData.hours()}
                    <span className='legend'>Heures</span>
                </div>
                <div className='countdown-box'>
                    {countdownData.minutes()}
                    <span className='legend'>Minutes</span>
                </div>
                <div className='countdown-box'>
                    {countdownData.seconds()}
                    <span className='legend'>Seconds</span>
                </div>
            </div>
        </div>
    );

};

export default Countdown;