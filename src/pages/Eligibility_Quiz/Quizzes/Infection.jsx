import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you had an infection in the last 2 weeks, or taken antibiotics in the last 7 days?"
      }
      next={"/quiz/partner"}
    />
  );
};

export default Heart;
