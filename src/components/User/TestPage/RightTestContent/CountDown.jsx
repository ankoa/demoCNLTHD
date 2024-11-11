import { useState, useEffect } from "react";
const CountDown = (props) => {
  const [count, setCount] = useState(300);
  new Date(10 * 1000).toISOString().substring(11, 16);

  useEffect(() => {
    if (count === 0) {
      props.onTimeUp();
      return;
    }
    const timer = setInterval(() => setCount(count - 1), 1000);
    /*     setTimeout(() =>{
        clearInterval(timer);

    } , 50000) */
    return () => clearInterval(timer);
  }, [count]);

  const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return <div className="countdown-container">{toHHMMSS(count)}</div>;
};
export default CountDown;
