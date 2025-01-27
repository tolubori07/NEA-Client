import { ChevronLeft } from "lucide-react";
import { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = lazy(() => import("./DonorHeader"));
const Radios = lazy(() => import("./Radio"));
const Button = lazy(() => import("./Button"));
const Alert = lazy(() => import("./Alerts"));

const Quiz = ({ question }) => {
  const navigate = useNavigate();
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const [unfilled, setUnfilled] = useState(false);
  const [answer, setAnswer] = useState("");
  const next = "/quiz/acupuncture";

  return (
    <>
      <Header />
      <div className="">
        <div className="flex flex-row">
          <Link to={".."} className="grow">
            <Button className={"flex ml-32"}>
              <span className="flex font-display text-2xl">
                <ChevronLeft /> Go Back
              </span>
            </Button>
          </Link>

          {unfilled && (
            <Alert
              message={
                "You haven't selected an option. You must select and option before proceeding."
              }
              className={"grow w-12 py-5 mr-5"}
            />
          )}
        </div>
        <div className="flex justify-center mb-12 mt-12">
          <div className="bg-white p-12 shadow-dark w-1/2 rounded-base">
            <h1 className="font-bold font-body text-2xl mb-5">{question}</h1>
            <Radios
              options={options}
              onClick={(e) => {
                if (e.target.value == "yes") {
                  setAnswer(e.target.value);
                } else {
                  setAnswer(e.target.value);
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className={"bg-green-600 text-white w-1/3 h-12"}
            onClick={(e) => {
              e.preventDefault();
              if (answer == "") {
                setUnfilled(true);
              } else if (answer == "yes") {
                navigate("/");
              } else if (answer == "no") {
                navigate(next);
              }
            }}
          >
            <div className="flex align-center justify-center w-full h-full">
              <p className="text-center font-display text-base">Submit</p>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
