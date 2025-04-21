import { useState, useEffect, lazy } from "react";
import { createEvent } from "../../api/event";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitles";
import { getCentres } from "../../api/appointmentService";

const Input = lazy(() => import("../../components/Input"));
const Button = lazy(() => import("../../components/Button"));
const Header = lazy(() => import("../../components/VolunteerHeader"));
const Select = lazy(() => import("../../components/Select2"));
const Alert = lazy(() => import("../../components/Alerts"));

export default function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    center: "",
    date: "",
    start_time: "",
    end_time: "",
    target: "",
  });
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(false);
  useDocumentTitle("Post an Announcement");
  useEffect(() => {
    if (!user) {
      navigate("/dlogin");
      return;
    }

    if (!user.admin || !user.id.startsWith("V")) {
      navigate(
        user.id.startsWith("D")
          ? "/donor/dashboard"
          : "/volunteer/announcements",
      );
    }
  }, [navigate, user]);
  const fetchCentres = async () => {
    const res = await getCentres();
    setCentres(res);
  };

  const toLocalDateTimeString = (dateStr, timeStr) => {
    return `${dateStr}T${timeStr}`;
  };

  useEffect(() => {
    fetchCentres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateString = minDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, center, date, start_time, end_time, target } = formData;

    if (!name || !center || !date || !start_time || !end_time || !target) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const startISOString = toLocalDateTimeString(
        formData.date,
        formData.start_time,
      );
      const endISOString = toLocalDateTimeString(
        formData.date,
        formData.end_time,
      );

      // use these when sending to the backend

      const result = await createEvent(
        name,
        center,
        startISOString,
        startISOString,
        endISOString,
        target,
        user.token,
      );

      if (result?.error) {
        throw new Error(result.message);
      }

      setFormData({
        name: "",
        center: "",
        date: "",
        start_time: "",
        end_time: "",
        target: "",
      });
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-10 p-6 shadow-dark bg-white text-text w-full max-w-md bg-white p-6 rounded-base border-2 border-border  shadow-dark">
        <h1 className="text-2xl font-heading mb-6 text-center">Create Event</h1>
        <Alert
          message={
            "Event Dates are set Such that you can only create them a week in Advance"
          }
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <label htmlFor="" className="font-display text-text">
              Event Name
            </label>
            <Input
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleChange}
              className={"w-full"}
            />
          </div>
          <div className="w-full">
            <Select
              items={centres.map((c) => c.Name)}
              placeholder={"Select a centre"}
              className="w-full"
              onSelect={(selectedName) => {
                const selectedCentre = centres.find(
                  (c) => c.Name === selectedName,
                );
                setFormData((prev) => ({
                  ...prev,
                  center: selectedCentre.ID || "",
                }));
              }}
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="font-display text-text">
              Date
            </label>
            <Input
              name="date"
              type="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              className="w-full"
              min={minDateString}
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="font-display text-text">
              Start Time
            </label>
            <Input
              name="start_time"
              type="time"
              placeholder="Start Time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="font-display text-text">
              End Time
            </label>
            <Input
              name="end_time"
              type="time"
              placeholder="End Time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="font-display text-text">
              Target
            </label>
            <Input
              name="target"
              type="number"
              placeholder="Target"
              value={formData.target}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            <p className="text-center text-lg w-full">
              {loading ? "Creating..." : "Create Event"}
            </p>
          </Button>
        </form>
      </div>
    </>
  );
}
