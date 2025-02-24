import { Suspense, lazy, useContext, useState, useEffect } from "react";
import {
  cancelAppointment,
  getAppointment,
  getAvailableTimes,
  rescheduleAppointment,
} from "../../../api/appointmentService";
import { AuthContext } from "../../../api/Authcontext";
import Loading from "../../../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { days, months } from "../../../utils/daysandmonths";

const Alert = lazy(() => import("../../../components/Alerts"));
const Header = lazy(() => import("../../../components/DonorHeader"));
const Button = lazy(() => import("../../../components/Button"));
const Modal = lazy(() => import("../../../components/Modal"));
const Input = lazy(() => import("../../../components/Input"));

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

  // Log selectedTime whenever it changes
  useEffect(() => {
    console.log("Selected Time:", selectedTime);
  }, [selectedTime]);

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

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time before rescheduling.");
      return;
    }

    const fields = ["Date", "Time"]; // Fields to update
    const values = [
      `${selectedDate}T00:00:00Z`, // Format date correctly
      `${selectedDate}T${selectedTime}:00Z`, // Format time correctly
    ];
    const appointmentId = appointment.ID; // Assuming the appointment object has an ID field

    try {
      setLoading(true);
      const response = await rescheduleAppointment(
        user?.token, // User's token
        fields, // Array of fields to update
        values, // Array of values for the fields
        appointmentId, // Appointment ID
      );

      console.log("Appointment Rescheduled:", response.data);
      alert("Appointment rescheduled successfully!");

      // Optionally, navigate to a different page or update the UI
      navigate("/donor/appointments");
    } catch (error) {
      console.error(
        "Failed to reschedule appointment:",
        error.response?.data || error.message,
      );
      alert("Failed to reschedule appointment. Please try again.");
    } finally {
      setLoading(false);
      setIsModal2Active(false); // Close the reschedule modal
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
    setSelectedTime(time); // Update the selected time
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await cancelAppointment(user?.token, id);
      navigate("/donor/dashboard");
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
                className="text-text text-center justify-center font-heading w-[30rem] text-xl py-5"
              >
                Reschedule this appointment
              </Button>
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
                          className={`p-2 ${selectedTime === time
                              ? "bg-slate-800 text-white"
                              : " "
                            }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  <Button
                    onClick={handleReschedule}
                    className="mt-4 w-full bg-main text-white py-2"
                    disabled={!selectedDate || !selectedTime} // Disable if no date/time is selected
                  >
                    Confirm Reschedule
                  </Button>
                </div>
              </Modal>{" "}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ManageAppointments;
