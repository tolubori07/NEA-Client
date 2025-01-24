import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./error-page";
import Loading from "./Loading";

const Donordashboard = lazy(() => import("./pages/profiles/donordashboard"));
const Manageappointments = lazy(
  () => import("./pages/Appointments/manageAppointments"),
);
const Profile = lazy(() => import("./pages/profiles/Profile"));
const SearchAppointment = lazy(
  () => import("./pages/Appointments/SearchAppointment"),
);
const Dlogin = lazy(() => import("./pages/Auth/Dlogin"));
const Allappointments = lazy(
  () => import("./pages/Appointments/Allappointments"),
);
const BookAppointments = lazy(
  () => import("./pages/Appointments/BookAppointments"),
);
const Confirm = lazy(() => import("./pages/Appointments/Confirm"));
const Eligibility = lazy(() => import("./pages/Eligibility_Quiz/Eligibility"));
const Completed = lazy(() => import("./pages/Eligibility_Quiz/Complete"));
const Heart = lazy(() => import("./pages/Eligibility_Quiz/Quizzes/Heart"));
const Acupuncture = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/Acupuncture"),
);
const Coldsore = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/ColdSore"),
);
const ColdSymptoms = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/ColdSymptoms"),
);
const Dental = lazy(() => import("./pages/Eligibility_Quiz/Quizzes/Dental"));
const Disease = lazy(() => import("./pages/Eligibility_Quiz/Quizzes/Disease"));
const Donated = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/DonatedinLast4"),
);
const Endoscopy = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/Endoscopy"),
);
const Infection = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/Infection"),
);
const Travel = lazy(() => import("./pages/Eligibility_Quiz/Quizzes/Travel"));
const Partner = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/PartnerCheck"),
);
const Piercing = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/Piercings"),
);
const Tattoos = lazy(() => import("./pages/Eligibility_Quiz/Quizzes/Tattoos"));
const Vaccine = lazy(() => import("./pages/Eligibility_Quiz/Quizzes/Vaccine"));
const Pregnancy = lazy(
  () => import("./pages/Eligibility_Quiz/Quizzes/PregnancyCheck"),
);
const App = () => {
  return (
    <Router>
      <main className="min-h-screen bg-bg pb-12">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Donordashboard />} />
            <Route
              path="/manageappointment/:id"
              element={<Manageappointments />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookappointment" element={<SearchAppointment />} />
            <Route path="/appointments" element={<Allappointments />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/dlogin" element={<Dlogin />} />
            <Route path="/book/:id" element={<BookAppointments />} />
            <Route path="/confirm/:centre/:date/:time" element={<Confirm />} />
            <Route path="/quiz" element={<Eligibility />} />
            <Route path="/quiz/complete" element={<Completed />} />
            <Route path="/quiz/heart" element={<Heart />} />
            <Route path="/quiz/Acupuncture" element={<Acupuncture />} />
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
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
