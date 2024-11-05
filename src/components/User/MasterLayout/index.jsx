import { memo } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
import "./index.scss";
const MasterLayout = ({ children, ...props }) => {
  const color = "#36d7b7"; // màu sắc loader
  const loading = useSelector((state) => state.loadingReducer.loading);
  return (
    <div className={`app-container ${loading ? "loading" : ""}`} {...props}>
      <Header />
      <div className="app-container-content">{children}</div>
      <Footer></Footer>

      {true && (
        <div className="loader-container">
          <BarLoader
            color={color}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default memo(MasterLayout);
