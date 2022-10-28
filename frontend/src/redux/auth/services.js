import httpRequest from '@iso/config/httpRequest';

const LOGIN_ENDPOINT = 'login';
const PROFILE_ENDPOINT = 'profile';

const login = async (email, password) => {
  const response = await httpRequest.postBasic(LOGIN_ENDPOINT, { email, password });

  return response;
};

const getProfile = async () => {
  const response = await httpRequest.get(PROFILE_ENDPOINT);
  return response.data;
}

export {
  login,
  getProfile
};