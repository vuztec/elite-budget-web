import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

axios.interceptors.request.use(function (config) {
  const storage = window.localStorage.getItem("elite-budget");
  const auth = storage ? JSON.parse(storage) : null;
  const token = auth ? auth.state.jwt : null;

  if (config.headers) {
    config.headers.Authorization = "Bearer " + (!token ? "logged_out" : token);
  } else {
    config.headers = {
      Authorization: "Bearer " + (!token ? "logged_out" : token),
    };
  }

  config.baseURL = SERVER_URL;

  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data?.code === "jwt_error") {
      window.localStorage.setItem("elite-budget", JSON.stringify({ user: null, jwt: null }));
      // window.localStorage.setItem("currentUser", JSON.stringify(null));
    }
    return Promise.reject(error);
  }
);

export default axios;
