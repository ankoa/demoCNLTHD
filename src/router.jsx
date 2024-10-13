import { Routes, Route } from "react-router-dom";
import { ROUTERS } from "./util/router";
import Homepage from "./components/User/Homepage/Homepage";
import MasterLayout from "./components/User/MasterLayout/index";
import TestLibrary from "./components/User/TestLibrary/TestLibrary";
import MainText from "./components/User/TestPage/MainTest";
import Login from "./components/User/Login/Login";
import OnlineCourse from "./components/User/OnlineCourse/OnlineCourse";
import Register from "./components/User/Register/Register";

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
      component: <MainText />,
    },
    {
      path: ROUTERS.USER.LOGIN,
      component: <Login />,
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
