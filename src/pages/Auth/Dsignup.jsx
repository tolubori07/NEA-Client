import { lazy, useEffect, useState } from "react";
import checkPasswordRequirements from "../../utils/checkpass";
import { dsignup } from "../../api/authservice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useDocumentTitle from "../../hooks/useDocumentTitles";
import regmatch from "../../utils/regexmatcher";

const Header = lazy(() => import("../../components/DonorHeader"));
const Input = lazy(() => import("../../components/Input"));
const Button = lazy(() => import("../../components/Button"));
const Select = lazy(() => import("../../components/Select2"));

const Dsignup = () => {
  const navigate = useNavigate();
  useDocumentTitle("Donor Sign up");
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    firstname: "",
    lastname: "",
    DOB: "",
    title: "",
    phoneNumber: "",
    city: "",
    postcode: "",
    bloodgroup: "",
    genotype: "",
  });
  const [missing, setMissing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    email,
    firstname,
    lastname,
    password,
    confirmPassword,
    occupation,
    postcode,
    city,
    phoneNumber,
    DOB,
  } = formData;

  const { setUser, isAuthenticated, user } = useAuth();
  const genotypes = ["AA", "AS", "SS", "AC", "SC"];
  const titles = ["Mr", "Ms", "Mrs"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectGenotype = (selectedGenotype) => {
    setFormdata((prevState) => ({
      ...prevState,
      genotype: selectedGenotype,
    }));
  };
  const handleSelectTitle = (selectedTitle) => {
    setFormdata((prevState) => ({
      ...prevState,
      title: selectedTitle,
    }));
  };
  const handleSelectGroup = (selectedGroup) => {
    setFormdata((prevState) => ({
      ...prevState,
      bloodgroup: selectedGroup,
    }));
  };

  const validatePass = () => {
    const password = formData.password;
    const confirm = formData.confirmPassword;
    let errors = [];

    if (password !== confirm) {
      errors.push("Passwords do not match.");
    }

    const missingRequirements = checkPasswordRequirements(password);
    if (missingRequirements.length > 0) {
      errors = [...errors, ...missingRequirements];
    }

    setMissing(errors);
    return errors.length === 0;
  };

  const phoneRegex =
    "^((((\\+44\\s?([0–6]|[8–9])\\d{3}|\\(?0([0–6]|[8–9])\\d{3}\\)?)\\s?\\d{3}\\s?(\\d{2}|\\d{3}))|((\\+44\\s?([0–6]|[8–9])\\d{3}|\\(?0([0–6]|[8–9])\\d{3}\\)?)\\s?\\d{3}\\s?(\\d{4}|\\d{3}))|((\\+44\\s?([0–6]|[8–9])\\d{1}|\\(?0([0–6]|[8–9])\\d{1}\\)?)\\s?\\d{4}\\s?(\\d{4}|\\d{3}))|((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4})))(?:[\\s-]?(?:x|ext\\.?|#)\\d{3,4})?$";

  const postRegex =
    "^(([A-Z]{1,2}\\d[A-Z\\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\\d[A-Z]{2}|BFPO ?\\d{1,4}|(KY\\d|MSR|VG|AI)[ -]?\\d{4}|[A-Z]{2} ?\\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMissing([]); // Reset missing requirements

    if (validatePass()) {
      if (!regmatch(phoneRegex, phoneNumber)) {
        alert("Please ensure that your phone number is in the right format.");
        return;
      }
      if (!regmatch(postRegex, postcode)) {
        alert("Please ensure that your postcode is in the right format.");
        return;
      }
      setLoading(true);
      try {
        const response = await dsignup(formData);
        setUser(response);
        navigate("/donor/dashboard");
      } catch (err) {
        setError("Registration failed. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (isAuthenticated && user.id.startsWith("D")) {
      navigate("/donor/dashboard");
    } else if (isAuthenticated && user.id.startsWith("V")) {
      navigate("/volunteer/dashboard");
    }
  }, []);

  return (
    <div>
      <Header />
      <h3 className="text-text font-display text-xl text-center px-2 mb-12">
        Become a vital part of our lifesaving community, uniting hearts and
        sharing life through voluntary blood donations and medical outreach.
      </h3>
      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">
          <div className="flex justify-center w-full px-12">
            <Input
              name="firstname"
              placeholder={"First Name"}
              className={"w-full"}
              value={firstname}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="lastname"
              placeholder={"Last Name"}
              className={"w-full"}
              value={lastname}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <label className="text-text font-display text-xl">
              Date Of Birth
            </label>
            <Input
              name="DOB"
              type={"date"}
              placeholder={"Date of Birth"}
              className={"w-full"}
              value={DOB}
              onChange={onChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Select
              placeholder={"Select your title"}
              items={titles}
              className={"w-full"}
              onSelect={handleSelectTitle}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="email"
              placeholder={"Email"}
              className={"w-full"}
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="phoneNumber"
              placeholder={"Phone number"}
              className={"w-full"}
              value={phoneNumber}
              onChange={onChange}
              type="tel"
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="city"
              placeholder={"City/Town"}
              className={"w-full"}
              value={city}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="postcode"
              placeholder={"Post Code"}
              className={"w-full"}
              value={postcode}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="occupation"
              placeholder={"Occupation"}
              className={"w-full"}
              value={occupation}
              onChange={onChange}
            />
          </div>

          <div className="flex justify-center w-full px-12">
            <Select
              items={bloodGroups}
              placeholder={"Select your bloodgroup"}
              className={"w-full"}
              onSelect={handleSelectGroup}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Select
              placeholder={"Select your genotype"}
              items={genotypes}
              className={"w-full"}
              onSelect={handleSelectGenotype}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="password"
              type="password"
              placeholder={"Password"}
              className={"w-full"}
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center w-full px-12">
            <Input
              name="confirmPassword"
              type="password"
              placeholder={"Confirm Password"}
              className={"w-full"}
              value={confirmPassword}
              onChange={onChange}
            />
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div>
            <ul>
              {missing.length > 0 ? (
                missing.map((missings, index) => (
                  <li
                    className="text-lg text-main font-bold font-display ml-5"
                    key={index}
                  >
                    {missings}
                  </li>
                ))
              ) : (
                <ul className="ml-5 font-bold text-text font-body">
                  <li>Password must be 8 or more characters long</li>
                  <li>Password must have an upper case letter</li>
                  <li>Password must have a lower case letter</li>
                  <li>Password must have a special character</li>
                </ul>
              )}
            </ul>
            <div className="flex justify-center">
              <Button
                type="submit"
                className={"text-center"}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dsignup;
