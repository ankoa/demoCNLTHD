import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./util/router";
import Homepage from "./components/User/Homepage/Homepage";
import MasterLayout from "./components/User/MasterLayout/index";
import TestPage from "./components/User/TestPage/Testpage";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Register/Register";
const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOMEPAGE,
            component: <Homepage />
        },
        {
            path: ROUTERS.USER.TESTPAGE,
            component: <TestPage />
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <Register />
        },
    ];

    return (
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </MasterLayout>

    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
