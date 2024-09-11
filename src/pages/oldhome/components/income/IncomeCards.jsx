function IncomeRecordCard({ iconSrc, title, records }) {
  return (
    <div className="flex flex-col bg-[#C3C1C11A] rounded-xl p-10 w-full lg:w-auto">
      <div className="flex gap-4 items-center mb-4">
        <div className="bg-[#D44F5F] p-3 rounded-xl">
          <img src={iconSrc} alt="logo" className="h-8 w-8" />
        </div>
        <p className="text-[#171717] text-xl font-semibold">{title}</p>
      </div>
      <ul className="list-disc list-inside text-sm text-[#171717] space-y-2">
        {records.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeRecordCard;
