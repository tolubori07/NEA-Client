import { lazy, Suspense, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUnsignedEvents } from "../../api/event";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import useDocumentTitle from "../../hooks/useDocumentTitles";
const EventCard = lazy(() => import("../../components/EventCard"));
const Header = lazy(() => import("../../components/VolunteerHeader"));

const Bookevent = () => {
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await getUnsignedEvents(user.token);
      setEvents(res);
    } catch (error) {
      console.error("Failed to fetch Events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (isAuthenticated && user.id.startsWith("D"))
      navigate("/volunteer/announcements");
  }, [navigate, isAuthenticated]);
  useDocumentTitle("Book Event");

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      {Array.isArray(events) && events.length !== 0 ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-3xl text-main font-display font-heading text-center">
          There no events to sign up for or you've signed up for all events
          available. Thank You.
        </p>
      )}
    </Suspense>
  );
};

export default Bookevent;
