import { lazy } from "react";

const Quiz = lazy(() => import("../../../components/Quiz"));
const Heart = () => {
  return (
    <Quiz question={"Do you have, or have you had, any heart conditions"} />
  );
};

export default Heart;
