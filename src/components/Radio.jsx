const Radios = ({ options }) => {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-3">
          <input
            type="radio"
            id={option.value}
            name="radioGroup"
            value={option.value}
            className="w-5 h-5 border-[2px]  border-stone-500 rounded-full checked:bg-white checked:border-black checked:border-[3px] appearance-none cursor-pointer"
          />
          <label
            htmlFor={option.value}
            className="text-lg font-medium cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

// Example usage:
// const options = [
//   { value: 'yes', label: 'Yes' },
//   { value: 'no', label: 'No' }
// ]
// <RadioGroup options={options} />

export default Radios;
