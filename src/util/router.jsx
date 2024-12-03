export const ROUTERS = {
  USER: {
    HOMEPAGE: "/",
    LIBRARY_TEST: "/library-test",
    TEST_PAGE: "/test/:testId",
    MAIN_TEST: "/test/:testId/:type",
    ONLINECOURSE: "/onlinecouse",
    COURSEDETAILS: "/onlinecouse/:courseId/details",
    LOGIN: "/login",
    REGISTER: "/register",
    CONFIRMCODE: "/confirmCode",
    USERCOURSE: "/usercourse",
    FINDACCOUNT: "/findAccount",
    RESETPASSWORD: "/resetPassword",
    CHANGEPASSWORD: "/changePassword",
    TESTRESULT: "/testResults/:historyID",
    LESSON: "/lesson/:courseId",
  },
  ADMIN: {
    DASHBOARD: "dashboard", // Chỉ cần để "dashboard" mà không có /
    TEST: "test",
    USER: "user",
    PART: "part",
    QUESTION: "question",
    COURSE: "course",
  },
};
