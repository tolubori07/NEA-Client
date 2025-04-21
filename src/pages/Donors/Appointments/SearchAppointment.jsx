import { lazy, useState, useEffect } from "react";
import { getCentres } from "../../../api/appointmentService";
import { useNavigate, Link } from "react-router-dom";

const Header = lazy(() => import("../../../components/DonorHeader"));
const Loading = lazy(() => import("../../../components/Loading"));

const SearchAppointment = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false initially
  const [searched, setSearched] = useState(false);

  const fetchCentres = async () => {
    try {
      setLoading(true);
      const res = await getCentres();
      setCentres(res);
      console.log(res);
    } catch (error) {
      console.error("Failed to fetch donation centres", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCentres();
  }, []);
  // Only show loading component when actually loading data
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Header />
      <h1 className="text-text font-heading text-3xl ml-12 my-12">
        Find a donation centre near you...
      </h1>
      <div className="results mt-12">
        <div className="flex justify-center flex-wrap gap-12">
          {centres.map((centre, index) => (
            <div
              key={index}
              className="bg-white shadow-dark w-full max-w-lg border-2 border-black text-center rounded-lg p-5"
            >
              <Link to={`/donor/book/${centre.ID}`}>
                <h1 className="text-main text-2xl font-display cursor-pointer">
                  {centre.Name}
                </h1>
                <h1 className="text-main text-2xl font-display cursor-pointer">
                  <a href={`tel:${centre.Phone}`}>{centre.Phone}</a>
                </h1>
              </Link>
              <h2 className="text-text text-lg font-body">
                {centre.Address}, {centre.City}, {centre.Postcode}
              </h2>
              <hr className="h-px my-2 bg-gray-200 border-0" />
              <h1 className="text-main text-2xl font-heading">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    centre.Name,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click to view on maps
                </a>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAppointment;
