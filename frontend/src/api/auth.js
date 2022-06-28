import axios from "axios";

export const authSignup = async ({ username, email, password }) => {
  try {
    const res = await axios.post("http://localhost:3000/app/up", {
      username: username,
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const authLogin = async ({ email, password }) => {
  try {
    const { data } = await axios.post("http://localhost:3000/app/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    return { message: error.message };
  }
};
