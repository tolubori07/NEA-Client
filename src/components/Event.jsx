/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
const Button = lazy(() => import("../components/Button"));
const Event = ({ user, event, children, className, Message }) => {
  const navigate = useNavigate();
  const date = new Date(event.Date);

  const start_time = new Date(event.Start_Time);
  const end_time = new Date(event.End_Time);
  const location = event.Center;
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
      <div className="flex justify-center">
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
                children="Manage event"
                className="p-3 text-text font-body font-bold"
                onClick={() => navigate(`/volunteer/manageevent/${event.ID}`)}
              />
            </div>
          </div>
          <h1 className="font-display text-text font-heading text-3xl">
            Name: {event.Name}
          </h1>
          <h3 className="font-body text-text font-heading text-3xl mt-12 text-center">
            Date:{" "}
            {`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
          </h3>
          <h3 className="font-body text-text font-heading text-3xl mt-6 text-center">
            Start:
            {start_time.getHours() == "0" ? "00" : `${start_time.getHours()}`}:
            {start_time.getMinutes() < 10
              ? `0${start_time.getMinutes()}`
              : `${start_time.getMinutes()}`}{" "}
            <br />
            End:
            {end_time.getHours() == "0" ? "00" : `${end_time.getHours()}`}:
            {end_time.getMinutes() < 10
              ? `0${end_time.getMinutes()}`
              : `${end_time.getMinutes()}`}{" "}
          </h3>
          <h3 className="font-body text-main font-heading text-2xl mt-6 text-center">
            Donation Centre: {location.Name}
          </h3>
          <a href={`tel:${location.Phone}`}>
            <h3 className="font-body text-main font-heading text-2xl mt-6 text-center">
              {" "}
              Phone: {location.Phone}
            </h3>
          </a>

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

export default Event;
