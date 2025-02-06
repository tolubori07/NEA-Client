import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you had a flexible endoscopy or colonoscopy in the last 4 months?"
      }
      next={"/quiz/infection"}
    />
  );
};

export default Heart;
