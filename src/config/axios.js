import axios from "axios";

axios.interceptors.request.use(function (config) {
  const storage = window.localStorage.getItem("projectlitemanager");
  const auth = storage ? JSON.parse(storage) : null;
  const token = auth ? auth.state.jwt : null;

  if (config.headers) {
    config.headers.Authorization = "Bearer " + (!token ? "logged_out" : token);
  } else {
    config.headers = {
      Authorization: "Bearer " + (!token ? "logged_out" : token),
    };
  }

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
      window.localStorage.setItem("projectlitemanager", JSON.stringify({ user: null, jwt: null }));
      // window.localStorage.setItem("currentUser", JSON.stringify(null));
    }
    return Promise.reject(error);
  }
);

export default axios;
