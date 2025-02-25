const Announcement = ({ body, title, by, className, time }) => {
  const date = new Date(time);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getFullYear();
  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`nextappointment bg-white p-10  mt-12 w-[70%] rounded-base border-2 border-black ${className}`}
        >
          <h1 className="text-main font-display text-3xl font-bold text-center mb-12">
            {title}
          </h1>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-center text-lg font-bold w-full">{body}</p>
            </div>
          </div>
          <p className="mt-8 text-[#5A5959]">By: {by}</p>
          <p className="text-[#5A5959]">
            At:{" "}
            {`${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`}
          </p>

          <p className="text-[#5A5959]">On: {`${day}/${month}/${year}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
