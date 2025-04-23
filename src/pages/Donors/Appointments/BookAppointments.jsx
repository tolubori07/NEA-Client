import { lazy, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAvailableTimes, getCentre } from "../../../api/appointmentService";

const Header = lazy(() => import("../../../components/DonorHeader"));
const Input = lazy(() => import("../../../components/Input"));
const Select = lazy(() => import("../../../components/Select"));
const Button = lazy(() => import("../../../components/Button"));

const BookAppointments = () => {
  const { id } = useParams();
  const [centre, setCentre] = useState({});
  const [date, setDate] = useState("");
  const [times, setTimes] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); // State to hold the selected time

  // Set the minimum date to today
  const setMinDateHandler = () => {
    const minimum = new Date(Date.now()).toISOString().split("T")[0];
    setMinDate(minimum);
    console.log(minimum);
  };

  // Fetches available times for the selected date and centre
  const getTimes = async () => {
    if (date && centre.ID) {
      try {
        const response = await getAvailableTimes(date, centre.ID);

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filteredTimes = response;

        // If selected date is today, filter out past times
        if (selectedDate.toDateString() === today.toDateString()) {
          const now = new Date();
          const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

          filteredTimes = response.filter((time) => time > currentTime);
        }

        setTimes(filteredTimes);
      } catch (error) {
        console.error("Failed to fetch available times:", error);
        setTimes([]);
      }
    }
  };

  const navigate = useNavigate();

  // Fetches centre details based on ID
  const getPlace = async () => {
    try {
      const centre = await getCentre(id);
      setCentre(centre);
    } catch (error) {
      console.error("Failed to fetch centre:", error);
    }
  };

  // Handle date change
  const onChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate + "T00:00:00Z");
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  //check date and time selected
  const ValidationCheck = () => {
    if (!date || !selectedTime) {
      alert("Please select a date and a time");
      return;
    }

    // Custom validation: ensure selected date is not less than today
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    if (selectedDate < today) {
      alert("The selected date cannot be in the past.");
      return;
    }

    // Proceed to navigate
    navigate(
      `/donor/confirm/${centre.ID}/${date}/${date.split("T")[0] + "T" + selectedTime + ":00Z"}`,
    );
  };

  // Fetch times whenever the date or centre changes
  useEffect(() => {
    getTimes();
    setMinDateHandler();
  }, [date, centre.ID]);

  // Fetch centre information on component mount
  useEffect(() => {
    getPlace();
  }, []);

  return (
    <div>
      <Header />
      <h1 className="text-text font-body font-heading text-4xl mt-12 ml-12">
        {centre.Name}
      </h1>
      <div className="flex justify-center">
        <div className="bg-white shadow-dark border-2 border-black w-[50%] p-5 h-[70%] rounded-base">
          <form className="w-full">
            <div className="flex flex-col">
              <h1 className="text-text text-center font-body font-heading text-3xl mt-12">
                Pick a date
              </h1>

              <Input
                type={"date"}
                className={"mt-12"}
                onChange={onChange}
                min={minDate}
              />
            </div>
          </form>
          <h1 className="text-text font-body font-heading text-3xl mt-12 text-center">
            Pick a time
          </h1>
          <div className="flex justify-center mb-24">
            <Select
              items={
                times.length > 0
                  ? times
                  : ["Sorry, there are no available slots for this date"]
              }
              className={"w-32"}
              onSelect={handleTimeSelect} // Capture the selected time
            />
          </div>
          <div className="flex justify-center w-full">
            <Button disabled={!selectedTime || !date} onClick={ValidationCheck}>
              Confirm your appointment details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointments;
