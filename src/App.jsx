import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from "./components/error-page";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";

const Donordashboard = lazy(
  () => import("./pages/Donors/profiles/donordashboard"),
);
const Manageappointments = lazy(
  () => import("./pages/Donors/Appointments/manageAppointments"),
);
const Profile = lazy(() => import("./pages/Donors/profiles/Profile"));
const SearchAppointment = lazy(
  () => import("./pages/Donors/Appointments/SearchAppointment"),
);
const Dlogin = lazy(() => import("./pages/Auth/Dlogin"));
const Allappointments = lazy(
  () => import("./pages/Donors/Appointments/Allappointments"),
);
const BookAppointments = lazy(
  () => import("./pages/Donors/Appointments/BookAppointments"),
);
const Confirm = lazy(() => import("./pages/Donors/Appointments/Confirm"));
const Eligibility = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Eligibility"),
);
const Completed = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Complete"),
);
const Heart = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Heart"),
);
const Acupuncture = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Acupuncture"),
);
const Coldsore = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/ColdSore"),
);
const ColdSymptoms = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/ColdSymptoms"),
);
const Dental = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Dental"),
);
const Disease = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Disease"),
);
const Donated = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/DonatedinLast4"),
);
const Endoscopy = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Endoscopy"),
);
const Infection = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Infection"),
);
const Travel = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Travel"),
);
const Partner = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/PartnerCheck"),
);
const Piercing = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Piercings"),
);
const Tattoos = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Tattoos"),
);
const Vaccine = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/Vaccine"),
);
const Pregnancy = lazy(
  () => import("./pages/Donors/Eligibility_Quiz/Quizzes/PregnancyCheck"),
);
const Footer = lazy(() => import("./components/Footer"));

const Vlogin = lazy(() => import("./pages/Auth/Vlogin"));
const Vsignup = lazy(() => import("./pages/Auth/Vsignup"));
const Dsignup = lazy(() => import("./pages/Auth/Dsignup"));
const Welcome = lazy(() => import("./pages/Welcome"));
const VolunteerDashboard = lazy(() => import("./pages/Volunteer/Dashboard"));
const Yes = lazy(() => import("./pages/Donors/Eligibility_Quiz/Yes"));
const Announcements = lazy(() => import("./pages/Volunteer/Announcements"));
const Allevents = lazy(() => import("./pages/Volunteer/Allevents"));
const Bookevent = lazy(() => import("./pages/Volunteer/Bookevent"));
const ConfirmEvent = lazy(() => import("./pages/Volunteer/Confirm"));
const SendMessage = lazy(() => import("./pages/Volunteer/SendMessage"));
const Vprofile = lazy(() => import("./pages/Volunteer/Profile"));
const Manageevent = lazy(() => import("./pages/Volunteer/ManageEvent"));
const Request = lazy(() => import("./pages/Donors/Request"));
const CreateAnnouncement = lazy(
  () => import("./pages/Volunteer/CreateAnnouncement"),
);
const CreateEvent = lazy(() => import("./pages/Volunteer/CreateEvent"));
const DonorForgot = lazy(()=>import("./pages/Auth/DonorForgotpassword"))
const VolunteerForgot = lazy(()=>import("./pages/Auth/VolunteerForgotpassword"))

const App = () => {
  const location = useLocation(); // Get the current location

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className=" min-h-screen bg-bg no-scrollbar">
      <main className="min-h-screen bg-bg no-scrollbar">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // Use the path as the key
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes>
                <Route
                  path="/donor/dashboard"
                  element={
                    <ProtectedRoute>
                      <Donordashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/donor/manageappointment/:id"
                  element={
                    <ProtectedRoute>
                      <Manageappointments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/manageevent/:id"
                  element={
                    <ProtectedRoute>
                      <Manageevent />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/donor/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/donor/bookappointment"
                  element={
                    <ProtectedRoute>
                      <SearchAppointment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/donor/appointments"
                  element={
                    <ProtectedRoute>
                      <Allappointments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/events"
                  element={
                    <ProtectedRoute>
                      <Allevents />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="*"
                  element={
                    <ProtectedRoute>
                      <ErrorPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/donor/book/:id"
                  element={
                    <ProtectedRoute>
                      <BookAppointments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/donor/confirm/:centre/:date/:time"
                  element={
                    <ProtectedRoute>
                      <Confirm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/announcements"
                  element={
                    <ProtectedRoute>
                      <Announcements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/dashboard"
                  element={
                    <ProtectedRoute>
                      <VolunteerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/book"
                  element={
                    <ProtectedRoute>
                      <Bookevent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/confirm/:id"
                  element={
                    <ProtectedRoute>
                      <ConfirmEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/message"
                  element={
                    <ProtectedRoute>
                      <SendMessage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/profile"
                  element={
                    <ProtectedRoute>
                      <Vprofile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/admin/announcements"
                  element={
                    <ProtectedRoute>
                      <CreateAnnouncement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer/admin/event"
                  element={
                    <ProtectedRoute>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/donor/request"
                  element={
                    <ProtectedRoute>
                      <Request />
                    </ProtectedRoute>
                  }
                />

                {/*      AUTH ROUTES      */}
                <Route path="/dlogin" element={<Dlogin />} />
                <Route path="/dsignup" element={<Dsignup />} />
                <Route path="/vlogin" element={<Vlogin />} />
                <Route path="/vsignup" element={<Vsignup />} />
                <Route
                  path="/donor/forgot-password"
                  element={<DonorForgot />}
                />
                <Route
                  path="/volunteer/forgot-password"
                  element={<VolunteerForgot />}
                />

                <Route path="/" element={<Welcome />} />
                {/*      QUIZ ROUTES      */}
                <Route path="/quiz" element={<Eligibility />} />
                <Route path="/quiz/complete" element={<Completed />} />
                <Route path="/quiz/heart" element={<Heart />} />
                <Route path="/quiz/acupuncture" element={<Acupuncture />} />
                <Route path="/quiz/coldsore" element={<Coldsore />} />
                <Route path="/quiz/cold" element={<ColdSymptoms />} />
                <Route path="/quiz/dental" element={<Dental />} />
                <Route path="/quiz/disease" element={<Disease />} />
                <Route path="/quiz/donated" element={<Donated />} />
                <Route path="/quiz/endoscopy" element={<Endoscopy />} />
                <Route path="/quiz/infection" element={<Infection />} />
                <Route path="/quiz/Preganancy" element={<Pregnancy />} />
                <Route path="/quiz/piercing" element={<Piercing />} />
                <Route path="/quiz/partner" element={<Partner />} />
                <Route path="/quiz/tattoos" element={<Tattoos />} />
                <Route path="/quiz/vaccine" element={<Vaccine />} />
                <Route path="/quiz/travel" element={<Travel />} />
                <Route path="/quiz/yes" element={<Yes />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
