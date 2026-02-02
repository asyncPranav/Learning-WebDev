import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  // Increment seconds every second
  // But only set up the interval once when the component mounts
  // But problem is seconds will not update correctly inside setInterval callback

  /*   
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  }, []);
 */

  // To solve the above problem we should clean up the interval on unmount
  useEffect(() => {
    console.log("component mounted");
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      console.log("component un-mounted");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h2>Seconds: {seconds}</h2>
    </div>
  );
};

export default Timer;
