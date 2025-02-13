// src/api/authservice.js
import axios from "axios";

const API_URL = process.env.DEV
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
    const response = await axios.post(`${API_URL}/dsignup`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const updatePassword = async (token, newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-password`,
      { password: newPassword },
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

const authService = {
  dlogin,
  vlogin,
  logout,
  dsignup,
  vsignup,
  updatePassword,
};

export default authService;
