export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const RENEW_TOKEN = 'RENEW_TOKEN';

export const doLogIn = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const doLogOut = () => {
    return {
        type: LOGOUT,
    };
};

export const doRenewToken = (data) => {
    return {
        type: RENEW_TOKEN,
        payload: data
    };
};