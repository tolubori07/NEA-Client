import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you had any immunisations, vaccinations, or jabs in the last 8 weeks?"
      }
      next={"/quiz/complete"}
    />
  );
};

export default Heart;
