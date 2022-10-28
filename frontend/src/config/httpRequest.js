import axios from "axios";
import { store } from "../redux/store";
import authAction from "@iso/redux/auth/actions";

const { logout, updateToken } = authAction;
const base = process.env.REACT_APP_API_SERVER;
const REFRESH_TOKEN = 'refresh-token';

// const getRefreshTokenRequest = async (refreshToken) => {
//   const body = JSON.stringify({ refreshToken });
//   return await axios.post(`${base}/${REFRESH_TOKEN.replace(/^\//, "")}`, body);
// }

// const checkExpirity = async (token) => {
//   try {
//     const profile = jwtDecode(token);
//     const expiredAt = profile.expiredAt || profile.exp * 1000;

//     if (new Date().getTime() >= expiredAt) {
//       const response = await getRefreshTokenRequest(token);
//       store.dispatch(updateToken(response.data));
//       return response.data?.access_token;
//     }
//     return token;
//   } catch (e) {
//     return false;
//   }
// };

const getHeaders = () => {
  const idToken = store.getState()?.Auth?.idToken;

  return {
    Accept: "*/*",
    "content-type": "application/json",
    Authorization: `Bearer ${idToken}`,
  };
}

axios.interceptors.request.use(
  (config) => {
    let params = config.params || {};

    return {
      ...config,
      params: params,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

function getApi(path, option = {}) {
  return axios.get(`${base}/${path.replace(/^\//, "")}`, {
    ...option,
    headers: getHeaders()
  });
}

function postApi(path, body, option = {}) {
  return axios.post(`${base}/${path.replace(/^\//, "")}`, body, {
    ...option,
    headers: getHeaders(),
  });
}

function putApi(path, body, option = {}) {
  return axios.put(`${base}/${path.replace(/^\//, "")}`, body, {
    ...option,
    headers: getHeaders(),
  });
}

function deleteApi(path, option = {}) {
  return axios.delete(`${base}/${path.replace(/^\//, "")}`, {
    ...option,
    headers: getHeaders(),
  });
}

function deleteMultipleApi(path, data = {}) {
  return axios.delete(`${base}/${path.replace(/^\//, "")}`, {
    headers: getHeaders(),
    data
  });
}

function postBasic(path, body, option = {}) {
  return axios.post(`${base}/${path.replace(/^\//, "")}`, body, {
    ...option,
  });
}

function getBasic(path, option = {}) {
  return axios.get(`${base}/${path.replace(/^\//, "")}`, {
    ...option
  });
}

function putBasic(path, body, option = {}) {
  return axios.put(`${base}/${path.replace(/^\//, "")}`, body, {
    ...option,
  });
}

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  deleteMultipleApi: deleteMultipleApi,
  postBasic: postBasic,
  getBasic: getBasic,
  putBasic: putBasic,
};

export default Api;