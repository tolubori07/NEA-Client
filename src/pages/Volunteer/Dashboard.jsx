import { lazy, useEffect, useState } from "react";
import { getNextEvent } from "../../api/event";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Header = lazy(() => import("../../components/VolunteerHeader"));
const Event = lazy(() => import("../../components/Event"));

const Dashboard = () => {
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user, redirect to login
    if (!user || user.id.startsWith("D")) {
      navigate("/donor/dashboard");
      return;
    }
    const fetchNextEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getNextEvent(user.token);
        setEvent(res);
      } catch (error) {
        alert(error);
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNextEvent()
  }, [navigate, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Event event={event} Message={"Your next event..."}/>
    </>
  );
};

export default Dashboard;
