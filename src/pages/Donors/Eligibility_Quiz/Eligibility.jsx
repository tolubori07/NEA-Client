import { lazy } from "react";
import { useNavigate } from "react-router-dom";

const Header = lazy(() => import("../../../components/DonorHeader"));
const Alert = lazy(() => import("../../../components/Alerts"));
const Button = lazy(() => import("../../../components/Button"));

const Eligibility = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <h1 className="font-display text-heading text-3xl sm:text-4xl text-center mt-6 sm:mt-10">
        Check You Can Donate
      </h1>

      <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-72 text-text">
        <section className="py-8 sm:py-12">
          <p className="font-body text-base sm:text-lg">
            Answer this series of short questions to help you check if you can
            donate blood. This could save you time, or even a wasted journey.
          </p>

          <Alert
            message={
              "These questions cover the most common reasons why people can't donate, but other eligibility criteria may apply."
            }
            className="mt-4"
          />

          <p className="font-body text-base sm:text-lg mt-5">
            Our eligibility criteria ensure it is safe for you to donate and
            safe for patients to receive your donation.
          </p>
        </section>

        <section>
          <h2 className="text-heading font-display text-2xl sm:text-3xl text-center">
            Before you start
          </h2>
          <ul className="mt-4 space-y-4">
            <li>
              <p className="font-body text-base sm:text-lg">
                Any timings in the questions are from the date of your
                appointment, not from today's date.
              </p>
            </li>
            <li>
              <p className="font-body text-base sm:text-lg">
                Your responses are anonymous and will not be saved in your donor
                record.
              </p>
            </li>
            <li>
              <p className="font-body text-base sm:text-lg">
                Our staff make the final decision on whether you can donate on
                the day, when you attend your appointment.
              </p>
            </li>
          </ul>
        </section>

        <div className="flex justify-center mt-10 sm:mt-12">
          <Button
            className="text-text font-bold text-base sm:text-lg"
            onClick={() => navigate("/quiz/heart")}
          >
            Start Now
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Eligibility;
