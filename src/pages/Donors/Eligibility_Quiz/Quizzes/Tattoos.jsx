import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "In the last 4 months, have you had a tattoo or any cosmetic treatments that involved piercing the skin?"
      }
      next={"/quiz/travel"}
    />
  );
};

export default Heart;
