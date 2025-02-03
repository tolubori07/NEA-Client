import { lazy, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../api/Authcontext";
import { getNextAppointment } from "../../../api/appointmentService";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";

const Header = lazy(() => import("../../../components/DonorHeader"));
const Appointment = lazy(() => import("../../../components/Appointment"));

const DonorDashboard = () => {
  // Correct way to use AuthContext
  const { user } = useContext(AuthContext);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user, redirect to login
    if (!user) {
      navigate("/dlogin");
      return;
    }

    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getNextAppointment(user.token);
        setAppointment(res);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [user, navigate]); // Add dependencies

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!user) {
    return null; // or return a loading state
  }

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-body font-heading text-text ml-14 mt-12">
        Welcome, {user.firstname}
      </h1>
      {!appointment || appointment === 1 ? (
        <div>
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
