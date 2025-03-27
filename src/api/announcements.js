import axios from "axios";

const DEV = true;
const url = DEV ? "http://localhost:3000" : "https://onehealthapi.koyeb.app";

export const getAnnouncements = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${url}/announcements`, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
