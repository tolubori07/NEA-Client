import { lazy, useState, useEffect, Suspense } from "react";
import { vupdatePassword } from "../../api/authservice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import useDocumentTitle from "../../hooks/useDocumentTitles";
import checkPasswordRequirements from "../../utils/checkpass";

const Input = lazy(() => import("../../components/Input"));
const Modal = lazy(() => import("../../components/Modal"));
const Header = lazy(() => import("../../components/VolunteerHeader"));
const Button = lazy(() => import("../../components/Button"));

const Profile = () => {
  // Context and Navigation
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const services = user.service;

  // States
  const [isModalActive, setIsModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useDocumentTitle("Volunteer profile");
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/vlogin");
    }
  }, [isAuthenticated, navigate]);

  // Handle password form input
  const onChange = (e) => {
    setPasswordData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    // Validate passwords
    const passwordErrors = checkPasswordRequirements(passwordData.newPassword);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      passwordErrors.push("Passwords do not match");
    }

    if (passwordErrors.length > 0) {
      setError(passwordErrors.join("\n"));
      return;
    }

    try {
      setLoading(true);

      await vupdatePassword(
        user.token,
        passwordData.currentPassword,
        passwordData.newPassword,
      );

      setSuccess("Password updated successfully");
      alert("Password Updated successfully");
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
      });
      setIsModalActive(false);
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <>
        <Header />
        <h1 className="text-text font-heading font-body text-4xl ml-12 mt-12">
          Your details...
        </h1>

        {/* Donor Details Card */}
        <div className="flex justify-center mt-12">
          <div className="bg-white text-center shadow-dark rounded-base py-8 border-2 border-black w-[50%]">
            <h1 className="text-text font-heading font-body text-2xl mb-3">
              {`${user.title} ${user.firstname} ${user.lastname}`}
            </h1>
            <h1 className="text-text font-heading font-body text-2xl mb-3">
              Volunteer ID: {user.id}
            </h1>
            <h1 className="text-mainAccent font-heading font-body text-2xl mb-3">
              Blood group: {user.bloodgroup}
            </h1>
            <h1 className="text-text font-heading font-body text-2xl mb-3">
              Genotype: {user.genotype}
            </h1>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="flex justify-center mt-12">
          <div className="bg-white text-center shadow-dark rounded-base py-8 border-2 border-black w-[60%]">
            <h1 className="text-text font-heading font-body text-center text-4xl">
              Your personal information
            </h1>
            <h3 className="text-text font-body font-bold text-xl mt-5">
              First name: {user.firstname}
            </h3>
            <h3 className="text-text font-body font-bold text-xl mt-5">
              Last name: {user.lastname}
            </h3>
            <h3 className="text-text font-body font-bold text-xl mt-5">
              Email: {user.email}
            </h3>
            <h3 className="text-text font-body font-bold text-xl mt-5">
              Phone Number: {user.phone}
            </h3>
            <h2 className="text-text text-2xl font-body mt-5 font-bold">
              Services Offered
            </h2>
            <div>
              {services.map((service, index) => (
                <p key={index} className="mb-2 text-text font-bold">
                  {service}
                </p>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <div className="w-full flex justify-center">
                <Button
                  onClick={() => {
                    logout();
                    navigate("/vlogin");
                  }}
                  className={" w-1/4 flex justify-center"}
                >
                  <p className="text-center flex text-xl font-bold font-display">
                    Logout <LogOut />
                  </p>{" "}
                </Button>
              </div>
            </div>
            {/* Password Section */}
            <div className="flex flex-row justify-center mt-8 gap-8">
              <Button
                onClick={() => setIsModalActive(true)}
                disabled={loading}
                className="hover:bg-main-dark transition-colors"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>

        {/* Password Update Modal */}
        <Modal active={isModalActive} setActive={setIsModalActive}>
          <form
            onSubmit={handleUpdatePassword}
            className="flex flex-col space-y-4"
          >
            <label className="text-text font-body font-[700] text-left">
              Input your current password
            </label>
            <Input
              type={"password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={onChange}
              className={"bg-white"}
              placeholder={"Current password"}
              required
            />

            <label className="text-text font-body font-[700] text-left">
              Input your new password
            </label>
            <Input
              type={"password"}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={onChange}
              className={"bg-white"}
              placeholder={"New password"}
              required
            />

            <label className="text-text font-body font-[700] text-left">
              Confirm new password
            </label>
            <Input
              type={"password"}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={onChange}
              className={"bg-white"}
              placeholder={"Confirm password"}
              required
            />

            {error && (
              <p className="text-text whitespace-pre-line text-sm">
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </Modal>
      </>
    </Suspense>
  );
};

export default Profile;
