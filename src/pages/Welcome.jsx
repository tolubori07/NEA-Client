import { useState, lazy } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button";
const Header = lazy(() => import("../components/WelcomeHeader"));

const carouselImages = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image5.png",
  "/image6.png",
];

export default function WelcomePage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <div className=" text-text">
      <Header />
      {/* About Section */}
      <section className="mt-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-display font-bold mb-4">About Us</h2>
        <p className="text-lg mb-3">
          We continue to strive to improve the blood donation culture and access
          to primary healthcare.
        </p>
        <p className="text-lg">
          One Health Lifesavers is dedicated to fostering voluntary blood
          donations, and addressing blood shortage through a robust donor
          network and impactful medical outreach initiatives.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-12 flex flex-col md:flex-row justify-center gap-6 px-6 mb-16">
        <Button>
          <a className="w-full" href="/dsignup">
            <p className="text-lg text-center w-full">Become a Donor</p>
          </a>
        </Button>
        <Button>
          <a className="w-full" href="/vsignup/">
            <p className="text-lg text-center w-full">Become a Volunteer</p>
          </a>
        </Button>
      </section>

      {/* Carousel Section */}
      <section className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-xl shadow-lg">
        <img
          src={carouselImages[current]}
          alt={`Blood donation ${current + 1}`}
          className="w-full h-[42rem] object-cover transition-all duration-500"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronRight />
        </button>
      </section>
    </div>
  );
}
