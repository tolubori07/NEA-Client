import { Suspense, lazy, useContext, useState, useEffect } from "react";
import { getUserAppointments } from "../../../api/appointmentService";
import { AuthContext } from "../../../api/Authcontext";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";

const Appointment = lazy(() => import("../../../components/Appointment"));
const Header = lazy(() => import("../../../components/DonorHeader"));

const AllAppointments = () => {
  const { user,isAuthenticated } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  const getAppointment = async () => {
    try {
      const res = await getUserAppointments(user.token);
      setAppointments(res);
    } catch (error) {
      console.error("Failed to fetch appointments:");
    } finally {
      setLoading(false); // Set loading to false whether request succeeds or fails
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if(isAuthenticated && user.id.startsWith('V')) navigate("/volunteer/dashboard")
  }, [navigate, user]); // Empty dependency array to run the effect only once

  useEffect(() => {
    getAppointment();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      {Array.isArray(appointments) && appointments.length !== 0 ? (
        appointments.map((appointment) => (
          <Appointment
            key={appointment.ID}
            user={user}
            appointment={appointment}
          />
        ))
      ) : (
        <div className="text-center text-text mt-12 font-bold">
          Looks like your appointment list is feeling a bit lonely... 🥲 Why not
          book one and give it some company?
        </div>
      )}
    </Suspense>
  );
};

export default AllAppointments;
