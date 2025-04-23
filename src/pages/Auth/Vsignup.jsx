import { lazy, useEffect, useState } from "react";
import { AuthContext } from "../../api/Authcontext";
import checkPasswordRequirements from "../../utils/checkpass";
import { vsignup } from "../../api/authservice";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitles";
import { useAuth } from "../../hooks/useAuth";

const Header = lazy(() => import("../../components/WelcomeHeader"));
const Input = lazy(() => import("../../components/Input"));
const Button = lazy(() => import("../../components/Button"));
const Select = lazy(() => import("../../components/Select2"));
const services = [
  "Photography/videography",
  "Outreach Volunteer",
  "Social Media Management",
  "Web development",
  "Graphic Design",
  "Content creation",
  "Others",
];

const occupations = ["Employed", "Self-employed", "Student"];

const Vsignup = () => {
  const navigate = useNavigate();
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
    skills: [],
  });
  const [missing, setMissing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useDocumentTitle("Volunteer Sign Up");

  const {
    email,
    firstname,
    lastname,
    password,
    confirmPassword,
    postcode,
    city,
    phoneNumber,
    DOB,
  } = formData;

  const { setUser, user, isAuthenticated } = useAuth();
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
  const handleSelectOccupation = (selectedOccupation) => {
    setFormdata((prevState) => ({
      ...prevState,
      occupation: selectedOccupation,
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

  const handleCheck = (skill) => {
    setFormdata((prevState) => {
      const newSkills = prevState.skills.includes(skill)
        ? prevState.skills.filter((s) => s !== skill) // Remove if already checked
        : [...prevState.skills, skill]; // Add if not checked
      console.log({
        ...prevState,
        skills: newSkills,
      });
      return {
        ...prevState,
        skills: newSkills,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMissing([]); // Reset missing requirements

    if (validatePass()) {
      setLoading(true);
      try {
        const response = await vsignup(formData);
        setUser(response);
        navigate("/volunteer/announcements");
      } catch (err) {
        setError("Registration failed. Please try again.");
        alert(error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/donor/dashboard");
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
            <Input
              name="DOB"
              type={"date"}
              placeholder={"Date of Birth"}
              className={"w-full"}
              value={DOB}
              onChange={onChange}
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
            <Select
              placeholder={"Select your Occupation"}
              items={occupations}
              className={"w-full"}
              onSelect={handleSelectOccupation}
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

          <div className="flex flex-col justify-center w-full px-12">
            <h1 className="text-text font-heading text-2xl">
              How will you like to volunteer your skill?
            </h1>
            {services.map((service) => (
              <div key={service}>
                <Input
                  type="checkbox"
                  className="accent-mainAccent mr-3"
                  checked={formData.skills.includes(service)}
                  onChange={() => handleCheck(service)}
                />
                <label className="text-text font-body text-lg">{service}</label>
              </div>
            ))}
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

export default Vsignup;
