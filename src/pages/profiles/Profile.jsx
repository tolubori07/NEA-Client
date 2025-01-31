/*import { lazy, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../api/Authcontext";
import { logout } from "../../api/authservice";
import { useNavigate } from "react-router-dom";
import { getNextAppointment } from "../../api/appointmentService";

const Input = lazy(() => import("../../components/Input"));
const Modal = lazy(() => import("../../components/Modal"));
const Header = lazy(() => import("../../components/DonorHeader"));
const Button = lazy(() => import("../../components/Button"));

const Profile = () => {
  const user = JSON.parse(useContext(AuthContext));
  const User = useContext(AuthContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!User) {
      navigate("/dlogin");
    }
  }, [user, navigate]);

  if (!User) {
    return null;
  }

  return (
    <>
      <Header />
      <h1 className="text-text font-heading font-body text-4xl ml-12 mt-12">
        Your details...
      </h1>
      <div className="flex justify-center mt-12">
        <div className="bg-white text-center shadow-dark rounded-base py-8 border-2 border-black w-[50%]">
          <h1 className="text-text font-heading font-body text-2xl mb-3">{`${user.title} ${user.firstname} ${user.lastname}`}</h1>
          <h1 className="text-text font-heading font-body text-2xl mb-3">
            Donor ID: {user.id}
          </h1>
          <h1 className="text-mainAccent font-heading font-body text-2xl mb-3">
            Blood group: {user.bloodgroup}
          </h1>
          <h1 className="text-text font-heading font-body text-2xl mb-3">
            Genotype: {user.genotype}
          </h1>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <div className="bg-white text-center shadow-dark rounded-base py-8 border-2 border-black w-[60%]">
          <h1 className="text-text font-heading font-body text-center text-4xl">
            Your personal information
          </h1>
          <h3 className="text-text font-body font-bold text-xl mt-5">
            First name: {user.firstname}
          </h3>
          <h3 className="text-text font-body font-bold  text-xl mt-5">
            Last name: {user.lastname}
          </h3>
          <h3 className="text-text font-body font-bold  text-xl mt-5">
            Email: {user.email}
          </h3>
          <h3 className="text-text font-body font-bold  text-xl mt-5">
            Phone Number: {user.phone}
          </h3>
          <div className="flex flex-row justify-center mt-8 gap-8">
            <h3 className="text-text font-body font-bold  text-xl mt-5">
              Password: ...................
            </h3>
            <Button
              onClick={() => {
                setIsModalActive(true);
              }}
            >
              Update Password
            </Button>
            <Modal active={isModalActive} setActive={setIsModalActive}>
              <form>
                <label className="text-text font-body font-[700] text-left">
                  Input Your new password
                </label>
                <Input
                  type={"password"}
                  className={"bg-white"}
                  placeholder={"New password"}
                />
                <label className="text-text font-body font-[700] text-left">
                  Confirm new password
                </label>
                <Input
                  type={"password"}
                  className={"bg-white"}
                  placeholder={"Confirm password"}
                />
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;*/
import { lazy, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../api/Authcontext";
import { updatePassword } from "../../api/authservice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Input = lazy(() => import("../../components/Input"));
const Modal = lazy(() => import("../../components/Modal"));
const Header = lazy(() => import("../../components/DonorHeader"));
const Button = lazy(() => import("../../components/Button"));

const Profile = () => {
  // Context and Navigation
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // States
  const [isModalActive, setIsModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Check authentication
  useEffect(() => {
    if (!user) {
      navigate("/dlogin");
    }
  }, [user, navigate]);

  // Handle password form input
  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await updatePassword(user.token, passwordData.newPassword);

      setSuccess("Password updated successfully");
      setPasswordData({ newPassword: "", confirmPassword: "" });
      setIsModalActive(false);
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-12">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 mx-12">
          {success}
        </div>
      )}

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
            Donor ID: {user.id}
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
            Email:" {user.email}"
          </h3>
          <h3 className="text-text font-body font-bold text-xl mt-5">
            Phone Number: {user.phone}
          </h3>

          {/* Password Section */}
          <div className="flex flex-row justify-center mt-8 gap-8">
            <h3 className="text-text font-body font-bold text-xl mt-5">
              Password: •••••••••••
            </h3>
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
      <Modal
        active={isModalActive}
        setActive={setIsModalActive}
        title="Update Password"
      >
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="text-text font-body font-[700] block mb-2">
              New Password
            </label>
            <Input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="bg-white w-full"
              placeholder="Enter new password"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="text-text font-body font-[700] block mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="bg-white w-full"
              placeholder="Confirm new password"
              minLength={8}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Modal>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <form>
          <label className="text-text font-body font-[700] text-left">
            Input Your new password
          </label>
          <Input
            type={"password"}
            className={"bg-white"}
            placeholder={"New password"}
          />
          <label className="text-text font-body font-[700] text-left">
            Confirm new password
          </label>
          <Input
            type={"password"}
            className={"bg-white"}
            placeholder={"Confirm password"}
          />
        </form>
      </Modal>
    </>
  );
};

export default Profile;
