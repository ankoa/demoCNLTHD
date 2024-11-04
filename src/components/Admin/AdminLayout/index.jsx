import { memo, useState } from "react";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
import "./index.scss"
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AdminLayout = ({ children, ...props }) => {
    const color = "#36d7b7"; // màu sắc loader
    const loading = useSelector(state => state.loadingReducer.loading);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`app-container ${loading ? "loading" : ""}`} {...props}>
            <div className="admin-container">
                <div className="admin-header">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
                </div>
                <div className="admin-content">
                    <div className="admin-sidebar">
                        {/* <PerfectScrollbar> */}
                        <AdminSidebar collapsed={collapsed}></AdminSidebar>
                        {/* </PerfectScrollbar> */}
                    </div>
                    <div className="admin-main">
                        {/* <PerfectScrollbar> */}
                        {children}
                        {/* </PerfectScrollbar> */}
                    </div>
                </div >
            </div >

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



export default memo(AdminLayout);