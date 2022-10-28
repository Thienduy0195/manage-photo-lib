import actions from "./actions";

const initState = {
  idToken: null,
  isLoading: false,
  isLoginSuccess: false,
  isLoginFail: false,
  profile: {},
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        idToken: action.data?.access_token,
        isLoginSuccess: true,
      };

    case actions.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoginFail: true,
      };

    case actions.SET_IS_FAILED:
      return {
        ...state,
        isLoginFail: false,
      };

    case actions.UPDATE_TOKEN:
      localStorage.setItem("id_token", action.payload?.access_token);
      localStorage.setItem("refresh_token", action.payload?.refresh_token);
      localStorage.setItem("expires_in", action.payload?.expires_in);

      return {
        ...state,
        idToken: action.payload.access_token,
      };

    case actions.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case actions.REFRESH_TOKEN_SUCCESS:
      localStorage.setItem("id_token", action.payload?.newToken);
      return {
        ...state,
        idToken: action.payload?.newToken,
      };

    case actions.LOGOUT:
      return initState;

    case actions.CLEAR:
      return initState;
    default:
      return state;
  }
}
