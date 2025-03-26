import { X } from "lucide-react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

export default function Modal({ active, setActive, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure the modal root exists only once
    let modalRoot = document.getElementById("modal");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "modal";
      document.body.appendChild(modalRoot);
    }
  }, []);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [active]);

  const closeModal = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => setActive(false), 300);
  };

  if (!active) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-visible={isVisible ? "true" : "false"}
      onClick={closeModal}
      className="fixed text-text left-0 top-0 z-50 flex h-screen w-screen items-center justify-center data-[visible=true]:opacity-100 data-[visible=true]:visible data-[visible=false]:opacity-0 data-[visible=false]:invisible transition-all duration-300 bg-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[300px] data-[visible=true]:opacity-100 data-[visible=true]:visible data-[visible=false]:opacity-0 data-[visible=false]:invisible flex-col items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-main p-10 pt-12 font-base shadow-light dark:shadow-dark transition-all duration-300"
      >
        <button onClick={closeModal}>
          <X className="absolute right-3 top-3 h-6 w-6" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal"),
  );
}
