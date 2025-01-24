import { ChevronLeft } from "lucide-react";
import { lazy, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = lazy(() => import("./DonorHeader"));
const Radios = lazy(() => import("./Radio"));
const Button = lazy(() => import("./Button"));

const Quiz = ({ question, onClick }) => {
  const navigate = useNavigate();
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const [answer,setAnswer] = useState(true);

  useEffect(()=>{
  })
    return (
    <>
      <Header />
      <div className="">
        <Link to={".."}>
          <Button className={"flex ml-32"}>
            <span className="flex font-display text-2xl">
              <ChevronLeft /> Go Back
            </span>
          </Button>
        </Link>
        <div className="flex justify-center mb-12 mt-12">
          <div className="bg-white p-12 shadow-dark w-1/2 rounded-base">
            <h1 className="font-bold font-body text-2xl mb-5">{question}</h1>
            <Radios options={options} />
          </div>
        </div>
        <div className="flex justify-center">
          <Button className={"bg-green-600 text-white w-1/3 h-12"} onClick={onClick}>
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
