import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({
  icon: Icon,
  label,
  items,
  className,
  buttonClassName,
  dropdownClassName,
  itemClassName,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        aria-haspopup="listbox"
        aria-expanded={isActiveDropdown}
        onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        className={`flex cursor-pointer items-center rounded-base border-2 border-black bg-main px-2 py-2 font-bold transition-all p-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none ${buttonClassName}`}
      >
        <div className="mx-auto flex items-center">
          {label} {Icon && <Icon />}
          <ChevronDown
            style={{
              transform: `rotate(${isActiveDropdown ? "180deg" : "0"})`,
            }}
            className={"ml-3 h-4 w-4 transition-transform ease-in-out"}
          />
        </div>
      </button>
      <div
        role="listbox"
        style={{
          top: isActiveDropdown ? "calc(100% + 10px)" : "100%",
          opacity: isActiveDropdown ? "1" : "0",
          visibility: isActiveDropdown ? "visible" : "hidden",
        }}
        className={`absolute left-0 z-10  border-2 border-black rounded-base bg-white text-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${dropdownClassName}`}
      >
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              to={item.href}
              aria-label={item.ariaLabel}
              className={`block w-full border-b-2 border-black bg-main px-7 py-3 no-underline first:rounded-t-md last:rounded-base hover:bg-mainAccent ${itemClassName}`}
            >
              <h3 className="text-center">{item.label}</h3>
            </Link>
          ) : (
            <button
              key={index}
              role="button"
              aria-label={item.ariaLabel}
              onClick={item.onClick}
              className={`block border-b-2 border-black bg-main px-2 py-2 no-underline first:rounded-t-md last:rounded-base hover:bg-mainAccent ${itemClassName}`}
            >
              <h3 className="text-center">{item.label}</h3>
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Dropdown;
