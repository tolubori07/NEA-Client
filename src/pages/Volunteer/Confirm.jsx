import { lazy, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { bookEvent, getEvent } from "../../api/event";

const Header = lazy(() => import("../../components/VolunteerHeader"));
const Button = lazy(() => import("../../components/Button"));
const Alert = lazy(() => import("../../components/Alerts"));

const Confirm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const book = async () => {
    try {
      const token = user.token;
      const response = await bookEvent(id,token);
      if (response) {
        setSuccess(true);
        navigate("/volunteer/dashboard");
      }
    } catch (error) {
      setError(true);
      console.error("Failed to book Event:", error);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvent(id);
        if (response) {
          setEvent(response);
        }
      } catch (error) {
        setError(true);
        alert(error);
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  const eventDate = new Date(event.Date);
  const startTime = new Date(event.Start_Time);
  const endTime = new Date(event.End_Time);

  return (
    <div>
      <Header />
      <h1 className="text-text text-4xl mt-12 ml-12 font-body font-heading mb-12">
        Confirm your Event sign up
      </h1>
      {error && (
        <Alert
          message={
            "Oops! Looks like there was an error while booking your event, please try again."
          }
        />
      )}

      <div className="flex justify-center">
        <div className="bg-white border-2 border-black w-[50%] p-5 rounded-base shadow-dark">
          <h3 className="text-text font-heading font-body text-lg mb-4">
            <span className="flex items-center">Location📍:</span>{" "}
            {`${event.Center.Name}, ${event.Center.Address}, ${event.Center.Postcode}`}
          </h3>
          <h3 className="text-text font-heading font-body text-lg mb-4">
            <span>Date:</span>{" "}
            {`${days[eventDate.getUTCDay()]}, ${eventDate.getDate()} ${months[eventDate.getUTCMonth()]} ${eventDate.getUTCFullYear()}`}
          </h3>
          <h3 className="text-text font-heading font-body text-xl">
            <span>Start</span>{" "}
            {`${startTime.getHours()}:${startTime.getMinutes().toString().padStart(2, "0")}`}{" "}
            (24-hour time)
          </h3>
          <h3 className="text-text font-heading font-body text-xl">
            <span>End</span>{" "}
            {`${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, "0")}`}{" "}
            (24-hour time)
          </h3>

          <div className="flex justify-center">
            <Button
              className={" bg-green-500 px-12"}
              onClick={book}
              type={success ? "disabled" : ""}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
