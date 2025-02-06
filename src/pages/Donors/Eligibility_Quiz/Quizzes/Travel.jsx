import { lazy } from "react";

const Quiz = lazy(() => import("../../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz question={"Have you been outside the UK in the last 4 months?"} next={"/quiz/vaccine"}/>
  );
};

export default Heart;
