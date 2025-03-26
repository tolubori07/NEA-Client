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
    <div>
      <Header />
      <h1 className="text-3xl font-body font-heading text-text ml-14 mt-12">
        Welcome, {user.firstname}
      </h1>
      {!event || event === 1 ? (
        <div>
          <h1 className="font-body text-center text-2xl font-bold text-main">
            You have no upcoming events.
          </h1>
        </div>
      ) : (
        <Event
          event={event}
          Message={"Your next event..."}
        />
      )}
    </div>
  );
};

export default Dashboard;
