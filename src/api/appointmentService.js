import axios from "axios";

const url = "https://onehealthapi.koyeb.app/";

export const getUserAppointments = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${url}/appointments`, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getNextAppointment = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${url}/nextAppointment`, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCentres = async (city) => {
  try {
    const response = await axios.post(`${url}/getcentres`, {
      crossDomain: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch donation centres", error);
    return []; // Return an empty array on error to avoid breaking the app
  }
};

export const getCentre = async (id) => {
  try {
    const response = await axios.get(`${url}/getcentre?id=${id}`, {
      crossDomain: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getAvailableTimes = async (date, id) => {
  try {
    const response = await axios.get(
      `${url}/availableSlots?date=${date}&id=${id}`,
      { crossDomain: true },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createAppointment = async (date, time, centre, token) => {
  try {
    // Ensure all required parameters are provided
    if (!date || !time || !centre || !token) {
      throw new Error("Missing required parameters");
    }

    // Set up headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request to create an appointment
    const response = await axios.post(
      `${url}/appointments`,
      { date, time, centre },
      config,
    );

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error.message);

    // Return a more descriptive error object
    return { error: true, message: error.message };
  }
};

export const getAppointment = async (token, ID) => {
  try {
    if (!ID || !token) throw new Error("Missing required parameters");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${url}/appointment`, { ID }, config);

    // Return the response data
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const cancelAppointment = async (token, id) => {
  try {
    console.log(id);
    if (!token || !id) throw new Error("Missing required parameters");
    /*const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };*/
    const response = await axios.delete(
      `${url}/cancelappointment?id=${id}` /*config*/,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
