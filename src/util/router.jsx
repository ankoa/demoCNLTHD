export const ROUTERS = {
  USER: {
    HOMEPAGE: "/",
    LIBRARY_TEST: "/library-test",
    TEST_PAGE: "/test/:testId",
    MAIN_TEST: "/test/:testId/:type",
    ONLINECOURSE: "/onlinecouse",
    LOGIN: "/login",
    REGISTER: "/register",
    CONFIRMCODE: "/confirmCode",
    USERCOURSE: "/usercourse",
    FINDACCOUNT: "/findAccount",
    RESETPASSWORD: "/resetPassword",
    CHANGEPASSWORD: "/changePassword",
    TESTRESULT: "/testResults/:historyID",
    USERPROFILE:"/userprofile",
    PRACTICERESULTS:"/practiceresults"
  },
  ADMIN: {
    DASHBOARD: "dashboard", // Chỉ cần để "dashboard" mà không có /
    TEST: "test",
    USER: "user",
    PART: "part",
    QUESTION: "question",
    COURSE: "manage-course",
    COURSE_DETAIL: "courseDetail",
    COURSE_EXISTING: "manage-courseExisting",
    LESSON: "manage-lesson",
    LESSON_DETAIL: "manage-lessonDetail",
  },
};
