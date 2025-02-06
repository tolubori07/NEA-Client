import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you had sex with a new partner or more than one partner in the last 3 months?"
      }
      next={"/quiz/piercing"}
    />
  );
};

export default Heart;
