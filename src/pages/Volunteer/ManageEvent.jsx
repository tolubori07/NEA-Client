import { Suspense, lazy, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { days, months } from "../../utils/daysandmonths";
import { useAuth } from "../../hooks/useAuth";
import { cancelEvent, getEvent } from "../../api/event";

const Alert = lazy(() => import("../../components/Alerts"));
const Header = lazy(() => import("../../components/VolunteerHeader"));
const Button = lazy(() => import("../../components/Button"));
const Modal = lazy(() => import("../../components/Modal"));

const Manageevents = () => {
  // States
  const [event, setEvent] = useState(null);
  const [isModal1Active, setIsModal1Active] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check authentication
  useEffect(() => {
    if (!user || user.id.startsWith("D")) {
      navigate("/donor/dashboard");
      return;
    }
  }, [user, navigate]);

  // Fetch appointment details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getEvent(id);
        setEvent(res);
      } catch (err) {
        setError(err.message || "Failed to fetch event");
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchEvent();
    }
  }, [user, id]);

  const handleCancel = async () => {
    try {
      setLoading(true);
      await cancelEvent(user?.token, id);
      alert("Successfully deleted");
      navigate("/volunteer/dashboard");
    } catch (err) {
      setError(err.message || "Failed to cancel event");
      console.error("Failed to cancel Event:", err);
    } finally {
      setLoading(false);
      setIsModal1Active(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  const eventDate = new Date(event.Date);
  const startTime = new Date(event.Start_Time);
  const endTime = new Date(event.End_Time);
  const location = event.Location;

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Header />

        <h1 className="text-text font-heading text-center text-4xl">
          Manage your upcoming appointments
        </h1>

        <Alert
          message="If you want to reschedule or cancel your appointment, please try to give us at least 3 days notice"
          className="w-[40%] mt-12 ml-5"
        />

        <div className="flex justify-center mt-12">
          <div className="bg-white shadow-dark rounded-base w-[70%] border-2 border-black p-5">
            <h2 className="text-text font-heading font-body text-2xl text-center mb-5">
              Date:{" "}
              {`${days[eventDate.getDay()]}, ${eventDate.getDate()} ${
                months[eventDate.getMonth()]
              } ${eventDate.getFullYear()}`}
            </h2>

            <h2 className="text-text font-heading font-body text-2xl text-center mb-5">
              Start:{" "}
              {`${startTime.getUTCHours().toString().padStart(2, "0")}:${startTime
                .getMinutes()
                .toString()
                .padStart(2, "0")}`}{" "}
              (24-Hour time)
            </h2>

            <h2 className="text-text font-heading font-body text-2xl text-center mb-5">
              Start:{" "}
              {`${endTime.getUTCHours().toString().padStart(2, "0")}:${endTime
                .getMinutes()
                .toString()
                .padStart(2, "0")}`}{" "}
              (24-Hour time)
            </h2>

            <h2 className="text-main font-[600] font-body text-2xl text-center mb-5">
              Donation Centre: {location.Name}
            </h2>

            <h2 className="text-main font-base font-heading font-body text-2xl text-center mb-5">
              Location: {location.Address}, {location.Postcode}
            </h2>

            <div className="flex flex-col items-center px-48 gap-12">
              <Button
                onClick={() => setIsModal1Active(true)}
                className="text-text text-center justify-center font-heading font-body w-[30rem] text-xl bg-mainAccent py-5"
              >
                Cancel this appointment
              </Button>
              {/* Cancel Modal */}
              <Modal active={isModal1Active} setActive={setIsModal1Active}>
                <h1 className="text-text font-body text-3xl text-center">
                  Attention! You're about to cancel an appointment, this action
                  is irreversible!
                </h1>
                <button
                  className="mt-5 cursor-pointer rounded-base border-2 border-border dark:border-darkBorder bg-white px-4 py-1.5 font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                  onClick={handleCancel}
                >
                  Confirm Cancellation
                </button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Manageevents;
