import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return <Quiz question={"Have you had any piercings in the last 4 months?"} />;
};

export default Heart;
