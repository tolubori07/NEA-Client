/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function Drawer({ active, setActive }) {
  const [isVisible, setIsVisible] = useState(false);

  const closeDrawer = () => {
    setIsVisible(false);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        opacity: isVisible ? "1" : "0",
        visibility: isVisible ? "visible" : "hidden",
      }}
      onClick={closeDrawer}
      className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] fixed left-0 top-0 z-50 flex h-[100vh] w-screen items-start justify-start bg-gray-500/50 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `translateX(${isVisible ? "0" : "-300px"})`,
        }}
        className="z-10 h-full w-[300px] border-2 border-black bg-main font-bold transition-transform duration-300"
      >
        {/* Additional content can be added here if needed */}
      </div>
    </div>
  );
}
