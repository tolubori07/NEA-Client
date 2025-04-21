import { lazy } from "react";
import { Check } from "lucide-react";

const Header = lazy(() => import("../../../components/DonorHeader"));
const Yes = () => {
  return (
    <div>
      <Header />
      <main className="text-center px-12 text-text font-body">
        <h1 className="text-text text-4xl flex font-bold text-display text-center justify-center">
          <span className="flex">
            Seems like you selected yes for a question.
          </span>
        </h1>
        <p className="text-text text-lg font-body">
          If you answered 'yes' to anything, please follow the guidance
          provided.
          <br />
          These questions cover the most common reasons why people can't donate,
          but other eligibility criteria may apply.
        </p>
        <h3 className="text-3xl text-text text-center font-bold mt-8">
          Next Steps
        </h3>
        <p className="text-lg text-text font-body">
          If you have more questions you can email us at
          <span className="text-main font-display font-bold ml-2">
            <a href="mailto:olifesavers@gmail.com">olifesavers@gmail.com</a>
          </span>
        </p>
        <h3 className="font-bold text-text font-display text-2xl mt-8">
          If you have an appointment booked
        </h3>
        <p className="text-text font-body text-lg">
          If anything changes before your appointment, please answer these
          questions again.
          <br />
          Please come to the donation venue at your allocated time. Our staff
          will make the final decision on the day as to whether it is safe for
          you to donate.
        </p>
      </main>
    </div>
  );
};

export default Yes;
