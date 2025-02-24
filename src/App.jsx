import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/error-page";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

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

const Vlogin = lazy(() => import("./pages/Auth/Vlogin"));
const Vsignup = lazy(() => import("./pages/Auth/Vsignup"));
const Dsignup = lazy(() => import("./pages/Auth/Dsignup"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Yes = lazy(() => import("./pages/Donors/Eligibility_Quiz/Yes"));
const Announcements = lazy(() => import("./pages/Volunteer/Announcements"));
const App = () => {
  return (
    <Router>
      <main className="min-h-screen bg-bg pb-12 no-scrollbar">
        <Suspense fallback={<Loading />}>
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

            {/*      AUTH ROUTES      */}
            <Route path="/dlogin" element={<Dlogin />} />
            <Route path="/dsignup" element={<Dsignup />} />
            <Route path="/vlogin" element={<Vlogin />} />
            <Route path="/vsignup" element={<Vsignup />} />
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
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
