import { Suspense, lazy, useContext, useState, useEffect } from "react";
import { getSignedEvents } from "../../api/event";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useDocumentTitle from "../../hooks/useDocumentTitles";

const Event = lazy(() => import("../../components/Event"));
const Header = lazy(() => import("../../components/VolunteerHeader"));

const Allevents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();
useDocumentTitle("My events")
  const getEvents = async () => {
    try {
      const res = await getSignedEvents(user.token);
      setEvents(res);
    } catch (error) {
      console.error("Failed to fetch Events:");
    } finally {
      setLoading(false); // Set loading to false whether request succeeds or fails
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/vlogin");
    }
  }, [navigate, user]);

  useEffect(() => {
    getEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <Event key={event.ID} user={user} event={event} />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-12">No events found.</div>
      )}
    </Suspense>
  );
};

export default Allevents;
