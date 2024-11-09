import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./util/router";
import Homepage from "./components/User/Homepage/Homepage";
import MasterLayout from "./components/User/MasterLayout/index";
import AdminLayout from "./components/Admin/AdminLayout/index";
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
import TestManagement from "./components/Admin/Content/TestManagement/TestManagement";

const renderUserRouter = () => {
  const userRouters = [
    { path: ROUTERS.USER.HOMEPAGE, element: <Homepage /> },
    { path: ROUTERS.USER.LIBRARY_TEST, element: <TestLibrary /> },
    { path: ROUTERS.USER.TEST_PAGE, element: <TestDetail /> },
    { path: ROUTERS.USER.MAIN_TEST, element: <MainTest /> },
    { path: ROUTERS.USER.ONLINECOURSE, element: <OnlineCourse /> },
    { path: ROUTERS.USER.LOGIN, element: <Login /> },
    { path: ROUTERS.USER.REGISTER, element: <Register /> },
    { path: ROUTERS.USER.FINDACCOUNT, element: <FindAccount /> },
    { path: ROUTERS.USER.CONFIRMCODE, element: <ConfirmCode /> },
    { path: ROUTERS.USER.RESETPASSWORD, element: <ResetPassword /> },
    { path: ROUTERS.USER.USERCOURSE, element: <UserCourse /> },
    { path: ROUTERS.USER.CHANGEPASSWORD, element: <ChangePassword /> },
  ];

  return userRouters.map((route, key) => (
    <Route key={key} path={route.path} element={route.element} />
  ));
};

const renderAdminRouter = () => {
  const adminRouters = [
    { path: ROUTERS.ADMIN.DASHBOARD, element: <TestManagement /> },
    { path: ROUTERS.ADMIN.TEST, element: <TestManagement /> },
  ];

  return adminRouters.map((route, key) => (
    <Route key={key} path={route.path} element={route.element} />
  ));
};

const RouterCustom = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route element={<MasterLayout />}>{renderUserRouter()}</Route>

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        {renderAdminRouter()}
      </Route>
    </Routes>
  );
};

export default RouterCustom;
