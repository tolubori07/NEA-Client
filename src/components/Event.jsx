/*import { lazy } from "react";

const Button = lazy(() => import("./Button"));
const Event = ({ className, name, date, location, target }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`nextappointment bg-white p-10  mt-12 w-[70%] rounded-base border-2 border-black ${className}`}
      >
        <h1 className=" font-display text-main text-3xl">
          Your Upcoming Events...
        </h1>
        <div className="text-center">
          <h2 className="text-2xl text-text font-display mt-2">
            Name: Pop-up at somewhere
          </h2>
          <h2 className="text-lg text-text font-display mt-2">
            Date: 3/03/2025
          </h2>
          <h2 className="text-lg text-text font-display mt-2">
            Location: Somewhere, Somewhere
          </h2>
          <h2 className="text-lg text-text font-display mt-2">
            Target: 200 pints
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Event;*/

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
  const location = event.Location;
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
            Name:{" "}{event.Name}
          </h1>
          <h3 className="font-body text-text font-heading text-3xl mt-12 text-center">
            Date:{" "}
            {`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
          </h3>
          <h3 className="font-body text-text font-heading text-3xl mt-6 text-center">
            Start:
            {start_time.getUTCHours() == "0"
              ? "00"
              : `${start_time.getUTCHours()}`}
            :
            {start_time.getMinutes() < 10
              ? `0${start_time.getUTCMinutes()}`
              : `${start_time.getMinutes()}`}{" "}
            <br />
            End:
            {end_time.getUTCHours() == "0"
              ? "00"
              : `${end_time.getUTCHours()}`}
            :
            {end_time.getMinutes() < 10
              ? `0${end_time.getUTCMinutes()}`
              : `${end_time.getMinutes()}`}{" "}
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

export default Event;
