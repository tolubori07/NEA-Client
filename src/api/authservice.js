// src/api/authservice.js
import axios from "axios";
const DEV = true;
const API_URL = DEV
  ? "http://localhost:3000"
  : "https://onehealthapi.koyeb.app";
//const API_URL = "http://localhost:3000";
export const dlogin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/dlogin`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const vlogin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/vlogin`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const dsignup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/dsignup`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const vsignup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/vsignup`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const updatePassword = async (token, current, newpassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/updatepassword`,
      { current, newpassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update password",
    );
  }
};

export const vupdatePassword = async (token, current, newpassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/vupdatepassword`,
      { current, newpassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update password",
    );
  }
};

export const dresetPassword = async (email, password) => {
  try {
    await axios.put(`${API_URL}/dforgotpassword`, {
      email,
      password,
    });
  } catch (error) {
    alert("error");
  }
};

export const vresetPassword = async (email, password) => {
  try {
    await axios.put(`${API_URL}/vforgotpassword`, {
      email,
      password,
    });
  } catch (error) {
    alert("error");
  }
};

const authService = {
  dlogin,
  vlogin,
  logout,
  dsignup,
  vsignup,
  updatePassword,
};

export default authService;
