import axios from "axios";
const DEV = true;
const API_URL = DEV
  ? "http://localhost:3000"
  : "https://onehealthapi.koyeb.app";

export const donorRequest = async (token, pints, type, location, contact) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post(
        `${API_URL}/donorrequest`,
        { pints, type, location, contact },
        config,
      )
      .then(alert("Message sent successfully"));
  } catch (error) {
    alert(error);
  }
};
