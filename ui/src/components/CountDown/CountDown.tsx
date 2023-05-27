import React from 'react';
import "./CountDown.css";

const Countdown = (props: { countdownData: Date, name: string }) => {
    const {countdownData, name} = props;

    return (
        <div>

            <div className='countdown-wrapper'>
                <div className='countdown-box'>
                    {countdownData.getDay()}
                    <span className='legend'>Jours</span>
                </div>
                <div className='countdown-box'>
                    {countdownData.getHours()}
                    <span className='legend'>Heures</span>
                </div>
                <div className='countdown-box'>
                    {countdownData.getMinutes()}
                    <span className='legend'>Minutes</span>
                </div>
                <div className='countdown-box'>
                    {countdownData.getSeconds()}
                    <span className='legend'>Seconds</span>
                </div>
            </div>
        </div>
    );

};

export default Countdown;