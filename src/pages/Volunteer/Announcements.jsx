import { lazy, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getAnnouncements } from "../../api/announcements";
import Loading from "../../components/Loading";
import useDocumentTitle from "../../hooks/useDocumentTitles";

const Header = lazy(() => import("../../components/VolunteerHeader"));
const Announcement = lazy(() => import("../../components/Announcement"));

const Announcements = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/vlogin");
    }
    useDocumentTitle("Announcements");
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAnnouncements(user.token);
        setAnnouncements(res);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="text-text font-bold font-display text-4xl ml-4">
        Announcements
      </h1>
      {announcements.map((announcement) => (
        <Announcement
          key={announcement.ID}
          body={announcement.Body}
          title={announcement.Title}
          by={announcement.Announcer}
          time={announcement.Time}
        />
      ))}
    </div>
  );
};

export default Announcements;
