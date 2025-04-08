import { useState, lazy, useEffect } from "react";
import { donorRequest } from "../../api/request";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = lazy(() => import("../../components/DonorHeader"));
const Input = lazy(() => import("../../components/Input"));
const Button = lazy(() => import("../../components/Button"));

const DonorRequestForm = () => {
  const navigate = useNavigate()
  const [pints, setPints] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const { user, isAuthenticated } = useAuth();

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/vlogin")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pints == "" || type == "" || location == "" || contact == "") {
      alert("Please fill all fields");
    } else {
      await donorRequest(user.token,pints, type, location, contact);
    }
  };
  const style = "block mb-2 font-display text-lg text-text";

  return (
    <>
      <Header />
      <h1 className="text-text font-display font-bold text-3xl text-center">
        Request an emergency donor
      </h1>
      <form onSubmit={handleSubmit} className="p-4 ">
        <label className={style}>
          Pints Needed:
          <Input
            type="number"
            value={pints}
            onChange={(e) => setPints(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <label className={style}>
          Blood Type:
          <Input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <label className={style}>
          Location:
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <label className={style}>
          Contact Number:
          <Input
            type="tel"
            pattern="^(\+44|0)\d{10}$"
            placeholder="e.g. 07123456789 or +447123456789"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <Button
          type="submit"
          className="bg-red-500 text-white p-2 rounded w-full mt-4 font-display text-centre"
        >
          <p className="w-full text-centre">Submit Request</p>
        </Button>
      </form>
    </>
  );
};

export default DonorRequestForm;
