const DateFormat = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString("vi-VI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateFormat;
