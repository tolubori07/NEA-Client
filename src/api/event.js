import axios from "axios";
const DEV = true;
const API_URL = DEV
  ? "http://localhost:3000"
  : "https://onehealthapi.koyeb.app";

export const getSignedEvents = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${API_URL}/signedevents`, config);
    return res.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const getUnsignedEvents = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${API_URL}/unsignedevents`, config);
    return res.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const getNextEvent = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${API_URL}/upcomingevent`, config);
    return res.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const getEvent = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/event?id=${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const bookEvent = async (Event, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post(
      `${API_URL}/bookevent`,
      { Event: Event },
      config,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export const cancelEvent = async (token, id) => {
  try {
    if (!token || !id) throw new Error("Missing required parameters");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${API_URL}/cancelevent?id=${id}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createEvent = async (
  name,
  center,
  date,
  start_time,
  end_time,
  target,
  token,
) => {
  try {
    if (
      !name ||
      !center ||
      !date ||
      !start_time ||
      !end_time ||
      !target ||
      !token
    ) {
      alert("Please fill all fields");
      throw new Error("Missing required parameters");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${API_URL}/events`,
      {
        name,
        center,
        date,
        start_time,
        end_time,
        target,
      },
      config,
    );

    alert("Event created successfully");
    return response.data;
  } catch (error) {
    alert("Error creating event: " + (error.response?.data || error.message));
    return { error: true, message: error.message };
  }
};
