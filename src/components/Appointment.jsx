/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
const Button = lazy(() => import("../components/Button"));
const Appointment = ({ user, appointment, children, className, Message }) => {
  const navigate = useNavigate();
  const date = new Date(appointment.Date);
  const time = new Date(appointment.Time);
  const location = appointment.Donation_Centre;
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
    "Novermber",
    "December",
  ];
  return (
    <div>
      <div className="flex justify-center font-display">
        <div
          className={`nextappointment bg-white p-10  mt-12 w-[70%] rounded-base border-2 border-black ${className}`}
        >
          <div className="flex justify-between">
            <h1 className="text-text font-heading font-body text-3xl">
              {Message}
            </h1>
            <div className="flex justify-between">
              {children}
              <Button
                children="Manage appointment"
                className="p-3 text-text font-body font-bold"
                onClick={() =>
                  navigate(`/donor/manageappointment/${appointment.ID}`)
                }
              />
            </div>
          </div>
          <h3 className="font-body text-text font-heading text-3xl mt-12 text-center">
            Date:{" "}
            {`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
          </h3>
          <h3 className="font-body text-text font-heading text-3xl mt-6 text-center">
            Time:{time.getUTCHours() == "0" ? "00" : `${time.getUTCHours()}`}:
            {time.getMinutes() < 10
              ? `0${time.getUTCMinutes()}`
              : `${time.getMinutes()}`}{" "}
          </h3>
          <h3 className="font-body text-main font-heading text-2xl mt-6 text-center">
            Donation Centre: {location.Name}
          </h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.Name)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-body text-main font-heading text-2xl mt-6 text-center">
              Location: {location.Address}, {location.Postcode}
              <br />
              (Click to view on map)
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
