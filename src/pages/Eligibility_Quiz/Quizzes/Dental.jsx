import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you had, or are you undergoing any dental treatment currently?"
      }
    />
  );
};

export default Heart;
