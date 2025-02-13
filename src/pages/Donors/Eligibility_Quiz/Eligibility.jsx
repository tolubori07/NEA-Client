import { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = lazy(() => import("../../../components/DonorHeader"));
const Alert = lazy(() => import("../../../components/Alerts"));
const Button = lazy(() => import("../../../components/Button"));

const Eligibility = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <h1 className="font-display text-heading text-4xl text-center">
        Check You Can Donate
      </h1>
      <main className="px-72 text-text">
        <div className="py-12">
          <p className="font-base font-body">
            Answer this series of short questions to help you check if you can
            donate blood, plasma or platelets. This could save you time, or even
            a wasted journey.
          </p>
          <Alert
            message={
              "These questions cover the most common reasons why people can't donate, but other eligibility criteria may apply."
            }
            className={"mt-4"}
          />
          <p className="font-base font-body mt-5">
            Our eligibility criteria ensures it is safe for you to donate and
            safe for patients to receive your donation.
          </p>
        </div>

        <div className="">
          <h1 className="text-heading font-display text-4xl text-center">
            Before you start
          </h1>
          <ul>
            <li>
              <p className=" font-base font-body mt-5">
                Any timings in the questions are from the date of your
                appointment, not from today's date.
              </p>
            </li>
            <li>
              <p className="font-base font-body mt-5">
                Your responses are anonymous and will not be saved in your donor
                record.
              </p>
            </li>
            <li>
              <p className="font-base font-body mt-5">
                Our staff make the final decision on whether you can donate on
                the day, when you attend your appointment.
              </p>
            </li>
          </ul>
        </div>
        <Button className={"mt-12 text-text font-bold font-xl"} onClick={() => navigate("/quiz/heart")}>
          Start Now
        </Button>
      </main>
    </div>
  );
};

export default Eligibility;
