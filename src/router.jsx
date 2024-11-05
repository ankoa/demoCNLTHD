import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./util/router";
import Homepage from "./components/User/Homepage/Homepage";
import MasterLayout from "./components/User/MasterLayout/index";
import TestLibrary from "./components/User/TestLibrary/TestLibrary";
import TestDetail from "./components/User/TestPage/TestDetail";
import Login from "./components/User/Login/Login";
import OnlineCourse from "./components/User/OnlineCourse/OnlineCourse";
import Register from "./components/User/Register/Register";
import ConfirmCode from "./components/User/ConfirmCode/ConfirmCode";
import FindAccount from "./components/User/FindAccount/FindAccount";
import ResetPassword from "./components/User/ResetPassword/ResetPassword";
import UserCourse from "./components/User/UserCourse/UserCourse";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import MainTest from "./components/User/TestPage/MainTest/MainTest";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOMEPAGE,
      component: <Homepage />,
    },
    {
      path: ROUTERS.USER.LIBRARY_TEST,
      component: <TestLibrary />,
    },
    {
      path: ROUTERS.USER.TEST_PAGE,
      component: <TestDetail />,
    },
    {
      path: ROUTERS.USER.MAIN_TEST,
      component: <MainTest />,
    },
    {
      path: ROUTERS.USER.ONLINECOURSE,
      component: <OnlineCourse />,
    },
    {
      path: ROUTERS.USER.LOGIN,
      component: <Login />,
    },
    {
      path: ROUTERS.USER.REGISTER,
      component: <Register />,
    },
    {
      path: ROUTERS.USER.FINDACCOUNT,
      component: <FindAccount />,
    },
    {
      path: ROUTERS.USER.CONFIRMCODE,
      component: <ConfirmCode />,
    },
    {
      path: ROUTERS.USER.RESETPASSWORD,
      component: <ResetPassword />,
    },
    {
      path: ROUTERS.USER.USERCOURSE,
      component: <UserCourse />,
    },
    {
      path: ROUTERS.USER.CHANGEPASSWORD,
      component: <ChangePassword />,
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
