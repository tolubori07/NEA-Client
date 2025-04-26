import { lazy, useEffect, useState } from "react";
import { createAnnouncement } from "../../api/announcements"; // Import the API function
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitles";

const Input = lazy(() => import("../../components/Input"));
const Button = lazy(() => import("../../components/Button"));
const Header = lazy(() => import("../../components/VolunteerHeader"));

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title == "" || body == "") {
      alert("please fill all fields");
    } else {
      await createAnnouncement(title, body, user.token);
      navigate("/volunteer/announcements");
    }
  }
  useDocumentTitle("Post an Announcement");
  useEffect(() => {
    if (!user) {
      navigate("/dlogin");
      return;
    }

    if (!user.admin || !user.id.startsWith("V")) {
      navigate(
        user.id.startsWith("D")
          ? "/donor/dashboard"
          : "/volunteer/announcements",
      );
    }
  }, [navigate, user]);
  return (
    <>
      <Header />
      <h1 className="font-display text-3xl text-center">
        Post An announcement
      </h1>
      <div className="min-h-screen bg-bg text-text  flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-base border-2 border-border  shadow-dark"
        >
          <h1 className="text-xl font-heading mb-4 text-center">
            Create Announcement
          </h1>

          <div className="mb-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              type="text"
              name="title"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Body"
              value={body || ""}
              onChange={(e) => setBody(e.target.value)}
              className="border-border border-2 shadow-dark rounded-base p-2 w-full"
              name="body"
            />
          </div>

          <Button type="submit" className="w-full text-center">
            <p className="text-center w-full text-lg">Submit</p>
          </Button>

          {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </form>
      </div>
    </>
  );
}
