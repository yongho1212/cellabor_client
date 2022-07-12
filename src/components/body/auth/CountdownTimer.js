import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';
import ResendEmail from './ResendEmail';


const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        
    
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </a>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountdown(targetDate);

  if ( minutes + seconds <= 0) {
    return <ResendEmail />;
  } else {
    return (
      <ShowCounter
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
