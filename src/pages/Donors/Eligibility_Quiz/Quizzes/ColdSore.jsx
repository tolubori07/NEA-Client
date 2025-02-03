import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return <Quiz question={"Do you have an active cold sore?"} next={"/quiz/cold"}/>;
};

export default Heart;
