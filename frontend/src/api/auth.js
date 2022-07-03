import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const authSignup = async ({ username, email, password }) => {
  try {
    const res = await axios.post("/app/up", {
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
    const { data } = await axios.post("/app/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    return { message: error.message };
  }
};

export const authUpdatePassword = async (userData) => {
  const { userId, password, newPassword } = userData;
  try {
    const response = await axios.post(
      "/app/updatePassword",
      {
        userId,
        password,
        newPassword,
      }
    );
    
    return response;
  } catch (error) {
    return { message: error.message };
  }
};
