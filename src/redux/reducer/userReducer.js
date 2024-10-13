
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS, LOGOUT } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log(action)
            return {
                ...state, account: {
                    access_token: action?.payload?.DT?.token?.AccessToken,
                    refresh_token: action?.payload?.DT?.token?.RefreshToken,
                    username: action?.payload?.DT?.user?.Username,
                    // image: action?.payload?.DT?.image,
                    // role: action?.payload?.DT?.role,
                    // email: action?.payload?.DT?.email,
                },
                isAuthenticated: true
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: '',
                },
            };
        default: return state;
    }
};

export default userReducer;