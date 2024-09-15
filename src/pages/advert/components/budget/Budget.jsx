function Budget() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#2F2F2F] flex flex-col items-center p-8 md:p-16">
      {/* Heading */}
      <div className="w-full lg:px-2">
        <h1 className="text-[#FFFFFF] text-3xl md:text-[32px] text-center font-semibold">
          Elite streamlines budget management and team collaboration in one easy-to-use platform.
        </h1>
      </div>

      {/* Description */}
      <div className="w-[95%] md:w-[85%] text-justify my-4 md:my-2">
        <p className="text-[#FFFFFF] font-normal text-lg md:text-lg lg:leading-[28px] md:text-center">
          With everything neatly organized and easily accessible, your team can quickly find and share the information
          they need. Project progress remains transparent, helping everyone stay aligned, focused, and stress-free, no
          matter where they work.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2 p-6 md:p-10 justify-center">
        <button
          onClick={() => scrollToSection('home')}
          className="p-2 md:p-4 rounded-lg bg-[#FF7452] text-white w-full max-w-[150px] flex-wrap"
        >
          Budget Summary
        </button>
        <button
          onClick={() => scrollToSection('budget-detail')}
          className="p-2 md:p-4 rounded-lg bg-[#2684FF] text-white w-full max-w-[150px] flex-grow"
        >
          Budget Details
        </button>
        <button
          onClick={() => scrollToSection('checklist')}
          className="p-2 md:p-4 rounded-lg bg-[#57D9A3] text-white w-full max-w-[150px] flex-grow"
        >
          Checklist
        </button>
        <button
          onClick={() => scrollToSection('networth')}
          className="p-2 md:p-4 rounded-lg bg-[#FFC400] text-white w-full max-w-[150px] flex-grow"
        >
          Networth
        </button>
        <button
          onClick={() => scrollToSection('extra-pay-dates')}
          className="p-2 md:p-4 rounded-lg bg-[#00C7E5] text-white w-full max-w-[150px] flex-grow"
        >
          Extra Pay Dates
        </button>
        <button
          onClick={() => scrollToSection('joint')}
          className="p-2 md:p-4 rounded-lg bg-[#F99CDB] text-white w-full max-w-[150px] flex-grow"
        >
          Joint Contribution
        </button>
        <button
          onClick={() => scrollToSection('extra-fund-tracker')}
          className="p-2 md:p-4 rounded-lg bg-[#FF820E] text-white w-full max-w-[150px] flex-grow"
        >
          Extra Fund Tracker
        </button>
        <button
          onClick={() => scrollToSection('bank-transaction')}
          className="p-2 md:p-4 rounded-lg bg-[#00AE5B] text-white w-full max-w-[150px] flex-grow"
        >
          Bank Transaction
        </button>
      </div>
      {/* Call-to-action */}
      <div className="flex flex-col gap-4 items-center mt-6 md:mt-8">
        <a
          href="/login"
          className="bg-[#00AE5B] text-xl md:text-2xl whitespace-nowrap text-white font-semibold px-6 md:px-8 text-center py-3 md:py-4 w-full md:w-3/4 rounded-lg"
        >
          Try the App Now
        </a>
      </div>
    </div>
  );
}

export default Budget;
