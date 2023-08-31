function DayOfWeekPanel() {
  const days = ["Mn", "Tue", "Wed", "Thr", "Fr", "St", "Sn"];
  return (
    <div className="border-b border-violet-500 pb-2 grid grid-cols-7 grid-rows-1 text-2xl font-medium justify-items-center text-violet-400 mb-4">
      {days.map((day) => (
        <span key={crypto.randomUUID()}>{day}</span>
      ))}
    </div>
  );
}

export default DayOfWeekPanel;
