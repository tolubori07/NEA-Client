import axios from "axios";
const DEV = false;
const API_URL = DEV
  ? "http://localhost:3000"
  : "https://onehealthapi.koyeb.app";

export const sendMessage = async (message, subject, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const emailData = { message: message, subject: subject };
    await axios
      .post(`${API_URL}/sendmessage`, emailData, config)
      .then(alert("Message sent succesfully"));
  } catch (error) {
    alert(error);
  }
};
