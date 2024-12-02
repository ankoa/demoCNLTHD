import { useEffect, useState } from "react";

const CountdownTimer = ({ handelNext }) => {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Hàm để reset bộ đếm
    const resetCountdown = () => {
      setCountdown(15);
    };

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Dừng bộ đếm
          handelNext(); // Gọi hàm chuyển tiếp
          resetCountdown(); // Reset bộ đếm về 15 giây
          return 15; // Đảm bảo bộ đếm được reset
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp bộ đếm khi component bị hủy
  }, [handelNext]);

  return (
    <div>
      <p>You have {countdown} seconds to choose an answer</p>
    </div>
  );
};

export default CountdownTimer;
