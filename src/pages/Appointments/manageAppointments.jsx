import { Suspense, lazy, useContext, useState, useEffect } from "react";
import {
  cancelAppointment,
  getAppointment,
} from "../../api/appointmentService";
import { AuthContext } from "../../api/Authcontext";
import Loading from "../../Loading";
import { useParams, useNavigate } from "react-router-dom";
import { days, months } from "../../utils/daysandmonths";

const Alert = lazy(() => import("../../components/Alerts"));
const Header = lazy(() => import("../../components/DonorHeader"));
const Button = lazy(() => import("../../components/Button"));
const Modal = lazy(() => import("../../components/Modal"));
const Input = lazy(() => import("../../components/Input"));

const ManageAppointments = () => {
  const [appointment, setAppointment] = useState([]);
  const [isModal1Active, setIsModal1Active] = useState(false);
  const [isModal2Active, setIsModal2Active] = useState(false);
  const { id } = useParams();
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();
  const user = JSON.parse(useContext(AuthContext));
  const [minDate, setMinDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); // State to hold the selected time

  // Set the minimum date to today
  const setMinDateHandler = () => {
    const minimum = new Date(Date.now()).toISOString().split("T")[0];
    setMinDate(minimum);
  };

  // Fetches available times for the selected date and centre
  const getTimes = async () => {
    if (date && centre.ID) {
      try {
        const response = await getAvailableTimes(date, centre.ID);
        setTimes(response);
      } catch (error) {
        console.error("Failed to fetch available times:", error);
        setTimes([]);
      }
    }
  };

  const getThisAppointment = async () => {
    try {
      const res = await getAppointment(user.token, id);
      setAppointment(res);
    } catch (error) {
      console.error("Failed to fetch appointments:");
    } finally {
      setLoading(false); // Set loading to false whether request succeeds or fails
    }
  };
  const onClick = async () => {
    await cancelAppointment(user.token, id);
    navigate("/");
  };
  const onChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate + "T00:00:00Z");
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Fetch times whenever the date or centre changes
  useEffect(() => {
    getTimes();
    setMinDateHandler();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/dlogin");
    }
  }, [navigate, user]);

  useEffect(() => {
    getThisAppointment();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const date = new Date(appointment.Date);
  const time = new Date(appointment.Time);
  const location = appointment.Donation_Centre;

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Suspense>
          <Header />
        </Suspense>
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
              {`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
            </h2>
            <h2 className="text-text font-heading font-body text-2xl text-center mb-5">
              Time:{" "}
              {`${time.getUTCHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`}
              (24-Hour time)
            </h2>
            <h2 className="text-main font-[600] font-body text-2xl text-center mb-5">
              Donation Centre: {location.Name}
            </h2>
            <h2 className="text-main font-base font-heading font-body text-2xl text-center mb-5">
              Location: {location.Address}, {location.Postcode}
            </h2>
            <h2 className="text-main font-body font-base text-2xl text-center mb-5">
              (Click to view on maps)
            </h2>
            <div className="flex flex-col items-center px-48 gap-12 ">
              <Button
                children="Reschedule this appointment"
                className="text-white text-center justify-center font-heading w-[30rem] text-xl py-5"
              />

              <Button
                onClick={() => {
                  setIsModal1Active(true);
                }}
                children="Cancel this appointment"
                className="text-white  text-center  justify-center font-heading font-body w-[30rem] text-xl bg-mainAccent py-5"
              />
              <Modal
                active={isModal1Active}
                setActive={setIsModal1Active}
                onClick={onClick}
              >
                <h1 className="text-text font-body text-3xl text-center">
                  Attention! You're about to cancel an appointment, this action
                  is irreversible
                </h1>
              </Modal>

              <Modal
                active={isModal2Active}
                setActive={setIsModal1Active}
                onClick={onClick}
              ></Modal>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ManageAppointments;
