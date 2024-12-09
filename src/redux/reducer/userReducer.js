import {
  FETCH_USER_LOGIN_SUCCESS,
  LOGOUT,
  RENEW_TOKEN,
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    userid: "",
    username: "",
    role: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log("Login successful:", action);
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.token?.AccessToken || "",
          refresh_token: action?.payload?.DT?.token?.RefreshToken || "",
          username: action?.payload?.DT?.user?.Username || "",
          userid: action?.payload?.DT?.user?.UserID || "",
          email: action?.payload?.DT?.user?.Email || "",
          firstName: action?.payload?.DT?.user?.FirstName || "",
          lastName: action?.payload?.DT?.user?.LastName || "",
          // Nếu có thông tin bổ sung từ server, bạn có thể đưa vào đây
          role: action?.payload?.DT?.role || "",

        },
        isAuthenticated: true,
      };

    case LOGOUT:
      console.log("User logged out.");
      return {
        ...state,
        isAuthenticated: false,
        account: INITIAL_STATE.account, // Reset lại thông tin tài khoản
      };

    case RENEW_TOKEN:
      console.log("Token refreshed:", action);
      return {
        ...state,
        account: {
          ...state.account, // Giữ lại thông tin cũ của tài khoản
          access_token: action?.payload?.DT?.token?.AccessToken || "",
          refresh_token: action?.payload?.DT?.token?.RefreshToken || "",
        },
      };

    default:
      return state;
  }
};

export default userReducer;
