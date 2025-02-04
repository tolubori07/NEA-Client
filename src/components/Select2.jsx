import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Select = ({ items, className, onSelect, placeholder }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleItemClick = (e, item) => {
    e.preventDefault(); // Prevent default behavior
    setSelectedItem(item);
    setIsOpen(false);
    onSelect?.(item);
  };

  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent default behavior
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={`relative group text-text ${className}`}>
      <button
        type="button" // Add button type
        onClick={toggleDropdown}
        className="flex min-w-[160px] w-full cursor-pointer items-center rounded-base 
          border-2 border-border dark:border-darkBorder bg-main px-10 py-3 
          font-base shadow-light dark:shadow-dark transition-all 
          hover:translate-x-boxShadowX hover:translate-y-boxShadowY 
          hover:shadow-none dark:hover:shadow-none"
      >
        <div className="mx-auto flex items-center">
          {selectedItem || placeholder}
          <ChevronDown
            className={`ml-2 h-5 w-5 transition-transform 
              ${isOpen ? "rotate-180" : "rotate-0"} ease-in-out`}
          />
        </div>
      </button>

      {isOpen && (
        <ul
          className="absolute left-0 z-50 min-w-[160px] w-full max-h-40
            rounded-base border-2 border-border dark:border-darkBorder 
            font-base shadow-light dark:shadow-dark overflow-y-auto bg-main"
        >
          {items.map((item, index) => (
            <button
              type="button" // Add button type
              key={`${item}-${index}`}
              onClick={(e) => handleItemClick(e, item)}
              className="w-full text-left px-5 py-3 cursor-pointer border-b-2 
                border-border dark:border-darkBorder
                first:rounded-t-base last:rounded-b-base
                hover:bg-mainAccent"
            >
              {item}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Select;
