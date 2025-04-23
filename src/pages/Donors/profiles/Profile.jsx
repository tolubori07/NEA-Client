import { lazy, useState, useEffect, Suspense } from "react";
import { dupdatePassword } from "../../../api/authservice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import useDocumentTitle from "../../../hooks/useDocumentTitles";
import checkPasswordRequirements from "../../../utils/checkpass";

const Input = lazy(() => import("../../../components/Input"));
const Modal = lazy(() => import("../../../components/Modal"));
const Header = lazy(() => import("../../../components/DonorHeader"));
const Button = lazy(() => import("../../../components/Button"));

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useDocumentTitle("Donor Profile");

  const [isModalActive, setIsModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentPassword, newPassword, confirmPassword } = passwordData;

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dlogin");
    } else if (user?.id?.startsWith("V")) {
      navigate("/volunteer/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const onChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
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

      await dupdatePassword(
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

        {/* Donor Details */}
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

        {/* Personal Info */}
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

            <div className="w-full flex justify-center mt-5">
              <Button
                onClick={() => {
                  logout();
                  navigate("/dlogin");
                }}
                className="w-1/4 flex justify-center"
              >
                <p className="text-center flex text-xl font-bold font-display">
                  Logout <LogOut />
                </p>
              </Button>
            </div>

            <div className="flex justify-center mt-8 gap-8">
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

        {/* Password Modal */}
        <Modal active={isModalActive} setActive={setIsModalActive}>
          <form
            onSubmit={handleUpdatePassword}
            className="flex flex-col space-y-4"
          >
            <label className="text-text font-body font-[700] text-left">
              Input your current password
            </label>
            <Input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={onChange}
              className="bg-white"
              placeholder="Current password"
              required
            />

            <label className="text-text font-body font-[700] text-left">
              Input your new password
            </label>
            <Input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={onChange}
              className="bg-white"
              placeholder="New password"
              required
            />

            <label className="text-text font-body font-[700] text-left">
              Confirm new password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="bg-white"
              placeholder="Confirm password"
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
