import { lazy, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../api/Authcontext";
import { getNextAppointment } from "../../api/appointmentService";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
const Header = lazy(() => import("../../components/DonorHeader"));
const Appointment = lazy(() => import("../../components/Appointment"));

const DonorDashboard = () => {
  const user = JSON.parse(useContext(AuthContext));
  const [appointment, setAppointment] = useState(null); // Changed initial state to null
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();
  const navIfNoUser = () => {
    if (!user) {
      navigate("/dlogin");
    }
  };
  const getNext = async () => {
    try {
      const res = await getNextAppointment(user.token);
      setAppointment(res);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false); // Set loading to false whether request succeeds or fails
    }
  };
  useEffect(() => {
    getNext(); // Call the function to fetch the next appointment
    navIfNoUser();
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-body font-heading text-text ml-14 mt-12">
        Welcome, {user.firstname}
      </h1>
      {appointment == 1 ? (
        <div>
          {" "}
          <h1 className="font-body text-center text-2xl font-bold text-main">
            You have no upcoming appointments.
          </h1>
        </div>
      ) : (
        <Appointment
          appointment={appointment}
          Message={"Your next appointment..."}
        />
      )}
    </div>
  );
};

export default DonorDashboard;
