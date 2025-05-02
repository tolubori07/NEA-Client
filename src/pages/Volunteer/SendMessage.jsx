import { Send } from "lucide-react";
import { lazy, useState } from "react";
import { sendMessage } from "../../api/sendmessage";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitles";

const Input = lazy(() => import("../../components/Input"));
const Header = lazy(() => import("../../components/VolunteerHeader"));
const Button = lazy(() => import("../../components/Button"));

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    await sendMessage(message, subject, user.token);
    navigate("/volunteer/dashboard");
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (isAuthenticated && user.id.startsWith("D"))
      navigate("/volunteer/announcements");
  }, [navigate, isAuthenticated]);

  useDocumentTitle("Send a message");

  return (
    <div>
      <Header />
      <h1 className="font-display text-3xl py-5 text-center">
        Send us a message
      </h1>
      <div className="flex justify-center items-center">
        <div className="bg-white border-border border-2 shadow-dark rounded-base w-1/2 h-fit p-12 flex flex-col">
          <Input
            placeholder="Subject"
            type="text"
            value={subject || ""}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-8"
          />
          <textarea
            placeholder="Message"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            className="border-border border-2 shadow-dark rounded-base p-2"
          />
          <Button className="text-center mt-5" onClick={handleSendMessage}>
            <p className="w-full text-lg">Send Message</p>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
