import axios from "axios";

const DEV = false;
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

export const createAnnouncement = async (title, body, token) => {
  try {
    if (!title || !body || !token) {
      alert("Please fill all fields");
      throw new Error("Missing required parameters");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${url}/announcements`,
      { Title: title, Body: body },
      config,
    );
    alert("Announcement made successfully");
  } catch (error) {
    alert("Error creating announcement:", error.message);

    return { error: true, message: error.message };
  }
};
