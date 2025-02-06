import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Are you pregnant or have you had a baby, miscarriage or termination in the last 6 months?"
      }
      next={"/quiz/tattoos"}
    />
  );
};

export default Heart;
