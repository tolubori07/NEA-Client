import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={
        "Have you donated either blood, plasma or platelets in the last 16 weeks?"
      }
      next={"/quiz/endoscopy"}
    />
  );
};

export default Heart;
