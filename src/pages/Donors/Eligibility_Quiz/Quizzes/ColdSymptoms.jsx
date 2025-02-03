import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you had a cough, sore throat or any cold-related symptoms in the last 7 days?"
      }
      next={"/quiz/dental"}
    />
  );
};

export default Heart;
