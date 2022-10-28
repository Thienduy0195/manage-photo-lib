const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  UPDATE_TOKEN: 'UPDATE_TOKEN',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',
  GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
  SET_PROFILE: 'SET_PROFILE',
  CLEAR: 'CLEAR',
  SET_IS_FAILED: 'SET_IS_FAILED',

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),

  login: ({ email, password }) => ({
    type: actions.LOGIN_REQUEST,
    payload: { email, password },
  }),

  updateToken: (data) => ({
    type: actions.UPDATE_TOKEN,
    payload: data
  }),

  getProfileRequest: () => ({
    type: actions.GET_PROFILE_REQUEST
  }),

  getProfileSuccess: (profile) => ({
    type: actions.SET_PROFILE,
    payload: profile,
  }),

  logout: () => ({
    type: actions.LOGOUT,
  }),

  refreshTokenSuccess: (newToken) => ({
    type: actions.REFRESH_TOKEN_SUCCESS,
    payload: { newToken },
  }),

  clear: () => ({
    type: actions.CLEAR
  }),

  setIsFailed: () => ({
    type: actions.SET_IS_FAILED
  })
};
export default actions;