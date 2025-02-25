import { lazy, useState, useEffect, Suspense } from "react";
import { updatePassword } from "../../../api/authservice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

const Input = lazy(() => import("../../../components/Input"));
const Modal = lazy(() => import("../../../components/Modal"));
const Header = lazy(() => import("../../../components/DonorHeader"));
const Button = lazy(() => import("../../../components/Button"));

const Profile = () => {
  // Context and Navigation
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  const { curr, newpass, newpasscon } = passwordData;

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

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

    // Validate passwords
    if (newpass !== newpasscon) {
      setError("Passwords do not match");
      return;
    }

    if (newpass.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await updatePassword(user.token, curr, newpass);

      setSuccess("Password updated successfully");
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

  if (!user) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
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
              Email: {user.email}
            </h3>
            <h3 className="text-text font-body font-bold text-xl mt-5">
              Phone Number: {user.phone}
            </h3>
            <Button
              onClick={() => {
                logout();
                navigate("/dlogin");
              }}
              className={""}
            >
              Logout <LogOut />
            </Button>

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
              value={curr}
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
              value={newpass}
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
              value={newpasscon}
              onChange={onChange}
              className={"bg-white"}
              placeholder={"Confirm password"}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
