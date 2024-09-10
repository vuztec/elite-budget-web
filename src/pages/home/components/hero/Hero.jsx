import { GoStarFill } from 'react-icons/go';
import { TiStarHalfOutline } from 'react-icons/ti';

function Hero() {
  return (
    <div className="flex lg:flex-row lg:h-auto w-full mt-4 flex-col">
      {/* Left Section */}
      <div className="left w-full md:w-full lg:w-1/2 pl-4 md:pl-16 pt-10 flex flex-col justify-center">
        <h1 className="text-[#131924] font-bold text-4xl md:text-5xl leading-tight md:text-center lg:text-left">
          Cash flow consulting unifies tasks, team, and tools for better organization.
        </h1>
        <p className="mt-4 text-lg font-medium text-[#4B5563] md:text-center lg:text-left">
          Centralize all your operations, regardless of where your team members are located.
        </p>

        {/* Star Ratings */}
        <div className="mt-4 flex flex-col gap-2 md:justify-center lg:justify-start">
          <div className="flex md:justify-center lg:justify-start">
            {/* Render 4 full stars and 1 half star using React Icons */}
            <GoStarFill className="text-[#FFC700] text-2xl" />
            <GoStarFill className="text-[#FFC700] text-2xl" />
            <GoStarFill className="text-[#FFC700] text-2xl" />
            <GoStarFill className="text-[#FFC700] text-2xl" />
            <TiStarHalfOutline className="text-[#FFC700] text-2xl" />
          </div>
          <p className="text-sm font-medium text-[#6B7280] md:text-center lg:text-left">
            Top Rated Budget Management Software
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 md:justify-center lg:justify-start">
          <a
            href="/login"
            className="px-6 py-3 rounded-lg bg-[#1E1F1E] text-white font-semibold text-lg whitespace-nowrap"
          >
            Try Now
          </a>
          {/* <button className="px-6 py-3 rounded-lg bg-[#FFFFFF] font-semibold text-gray-700 text-lg border border-gray-300 whitespace-nowrap">
            Start Free Trial
          </button> */}
        </div>
      </div>

      {/* Right Section with Images */}
      <div className="right relative w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
        {/* Large screen mockup */}
        <div className="relative w-full max-w-[500px] md:max-w-none">
          <img src="src/assets/image/homeImage.png" alt="Laptop mockup" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
