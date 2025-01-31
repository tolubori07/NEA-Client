/*import { Suspense, lazy, useContext, useState, useEffect } from "react";
import {
  cancelAppointment,
  getAppointment,
} from "../../api/appointmentService";
import { AuthContext } from "../../api/Authcontext";
import Loading from "../../components/Loading";
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

export default ManageAppointments;*/

import { Suspense, lazy, useContext, useState, useEffect } from "react";
import {
  cancelAppointment,
  getAppointment,
  getAvailableTimes,
} from "../../api/appointmentService";
import { AuthContext } from "../../api/Authcontext";
import Loading from "../../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { days, months } from "../../utils/daysandmonths";

const Alert = lazy(() => import("../../components/Alerts"));
const Header = lazy(() => import("../../components/DonorHeader"));
const Button = lazy(() => import("../../components/Button"));
const Modal = lazy(() => import("../../components/Modal"));
const Input = lazy(() => import("../../components/Input"));

const ManageAppointments = () => {
  // States
  const [appointment, setAppointment] = useState(null);
  const [isModal1Active, setIsModal1Active] = useState(false);
  const [isModal2Active, setIsModal2Active] = useState(false);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Set the minimum date to today
  useEffect(() => {
    const minimum = new Date().toISOString().split("T")[0];
    setMinDate(minimum);
  }, []);

  // Check authentication
  useEffect(() => {
    if (!user) {
      navigate("/dlogin");
      return;
    }
  }, [user, navigate]);

  // Fetch appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAppointment(user?.token, id);
        setAppointment(res);
      } catch (err) {
        setError(err.message || "Failed to fetch appointment");
        console.error("Failed to fetch appointment:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchAppointment();
    }
  }, [user, id]);

  // Fetch available times
  const fetchAvailableTimes = async (date, centreId) => {
    try {
      setLoading(true);
      const response = await getAvailableTimes(date, centreId);
      setTimes(response);
    } catch (err) {
      setError(err.message || "Failed to fetch available times");
      console.error("Failed to fetch available times:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (appointment?.Donation_Centre?.ID) {
      fetchAvailableTimes(date, appointment.Donation_Centre.ID);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await cancelAppointment(user?.token, id);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to cancel appointment");
      console.error("Failed to cancel appointment:", err);
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

  if (!appointment) {
    return <div>No appointment found</div>;
  }

  const appointmentDate = new Date(appointment.Date);
  const appointmentTime = new Date(appointment.Time);
  const location = appointment.Donation_Centre;

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
              {`${days[appointmentDate.getDay()]}, ${appointmentDate.getDate()} ${months[appointmentDate.getMonth()]
                } ${appointmentDate.getFullYear()}`}
            </h2>

            <h2 className="text-text font-heading font-body text-2xl text-center mb-5">
              Time:{" "}
              {`${appointmentTime.getUTCHours().toString().padStart(2, "0")}:${appointmentTime
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
                onClick={() => setIsModal2Active(true)}
                className="text-white text-center justify-center font-heading w-[30rem] text-xl py-5"
              >
                Reschedule this appointment
              </Button>

              <Button
                onClick={() => setIsModal1Active(true)}
                className="text-white text-center justify-center font-heading font-body w-[30rem] text-xl bg-mainAccent py-5"
              >
                Cancel this appointment
              </Button>

              {/* Cancel Modal */}
              <Modal
                active={isModal1Active}
                setActive={setIsModal1Active}
                onClick={handleCancel}
              >
                <h1 className="text-text font-body text-3xl text-center">
                  Attention! You're about to cancel an appointment, this action
                  is irreversible
                </h1>
              </Modal>

              {/* Reschedule Modal */}
              <Modal active={isModal2Active} setActive={setIsModal2Active}>
                <h1 className="text-text font-body text-3xl text-center mb-4">
                  Reschedule Appointment
                </h1>
                <div className="space-y-4">
                  <Input
                    type="date"
                    min={minDate}
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full"
                  />
                  {times.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {times.map((time) => (
                        <Button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-2 ${selectedTime === time ? "bg-main" : "bg-gray-200"
                            }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ManageAppointments;
