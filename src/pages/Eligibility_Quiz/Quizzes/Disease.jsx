import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you been in contact with anyone with an infectious disease within the last 4 weeks?"
      }
    />
  );
};

export default Heart;
