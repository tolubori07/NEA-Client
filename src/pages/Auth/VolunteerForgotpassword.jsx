import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkPasswordRequirements from "../../utils/checkpass"; // Your checkPassword function
import { vresetPassword } from "../../api/authservice";

const Button = lazy(() => import("../../components/Button"));
const Input = lazy(() => import("../../components/Input"));
const Header = lazy(() => import("../../components/VolunteerHeader"));

const VolunteerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [missing, setMissing] = useState([]);

  const navigate = useNavigate();

  const validatePass = () => {
    const password = newPassword;
    const confirm = confirmPassword;
    let errors = [];

    // Check if the passwords match
    if (password !== confirm) {
      errors.push("Passwords do not match.");
    }

    // Check for missing password requirements
    const missingRequirements = checkPasswordRequirements(password);
    if (missingRequirements.length > 0) {
      errors = [...errors, ...missingRequirements];
    }

    setMissing(errors); // Update state with error messages
    return errors.length > 0; // If there are any errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMissing([]); // Reset missing requirements

    // Validate input fields
    if (!email || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return; // Prevent submission if fields are missing
    }

    if (validatePass()) {
      alert("Please fix the validation errors.");
      return; // Prevent submission if validation errors exist
    }

    try {
      // Try to reset the password
      await vresetPassword(email, newPassword);
      alert("Successfully reset password")
      navigate("/vlogin");
    } catch (err) {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-dark border-border border-2 rounded-base">
        <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <Input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">New Password</label>
            <Input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Confirm New Password
            </label>
            <Input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>

          <div>
            {missing.length > 0 ? (
              <ul>
                {missing.map((miss, index) => (
                  <li
                    className="text-lg text-main font-bold font-display ml-5"
                    key={index}
                  >
                    {miss}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="ml-5 font-bold text-text font-body">
                <li>Password must be at least 8 characters long</li>
                <li>Password must contain at least one lowercase letter</li>
                <li>Password must contain at least one uppercase letter</li>
                <li>Password must contain at least one digit</li>
                <li>Password must contain at least one special character</li>
              </ul>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default VolunteerForgotPassword;
