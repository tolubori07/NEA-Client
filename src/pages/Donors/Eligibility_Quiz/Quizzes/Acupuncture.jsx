import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz
      question={"Have you had acupuncture in the last 4 months?"}
      next={"/quiz/coldsore"}
    />
  );
};

export default Heart;
