import { lazy } from "react"

const Quiz = lazy(() => import("../../../components/Quiz"))
const Heart = () => {
  const handleSubmit = (answer) => {
    if (answer == false) {
      navigate("/")
    }
  };

  return (
    <Quiz question={"Do you have, or have you had, any heart conditions"} onClick={handleSubmit(answer)} />
  )
}

export default Heart
