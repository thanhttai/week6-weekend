import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + JSON.parse(localStorage.getItem('token')),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);
 
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
   
    if(response.data.message === "Successfully login user"){
      // request.headers.authorization = "Bearer " + response.data.data;
    }
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);

    // Error Handling here

    return Promise.reject(error);
  }
);

export default api;
