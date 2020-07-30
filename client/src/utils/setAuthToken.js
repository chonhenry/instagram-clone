import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    console.log('set x-auth-token');
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    console.log('remove x-auth-token');
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
