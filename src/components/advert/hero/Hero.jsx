import { GoStarFill } from 'react-icons/go';
import { TiStarHalfOutline } from 'react-icons/ti';
import Networth from '../../../assets/image/net-worth.png';
import { getSpecial } from '../../../utils/nmrw.function';

function Hero() {
  return (
    <div className="flex lg:flex-row lg:h-auto w-full lg:mt-4 flex-col">
      {/* Left Section */}
      <div className="left w-full md:w-full lg:w-1/2 pl-4 md:pl-16 pt-10 flex flex-col justify-center">
        <h1 className="text-[#131924] font-bold text-xl md:text-3xl leading-tight md:text-center lg:text-left">
          The Elite Budget Web App………… A NEW WAY TO BUDGET!
        </h1>
        <h1 className="text-[#131924] font-bold text-xl mt-4 md:text-2xl leading-tight md:text-center lg:text-left">
          DESIGNED BY A CPA with the busy person in mind.
        </h1>
        <p className="mt-4 text-lg font-medium text-[#4B5563] md:text-center lg:text-left">
          Take control of your finances with this simple, user-friendly money management tool.
        </p>
        <p className="mt-4 text-lg font-medium text-[#4B5563] md:text-center lg:text-left">
          Crafted for those who want to simplify their personal finances. Know what your budget is without it being so
          complicated! Join an exclusive group of elite budgeters and elevate your financial status. Sign up today and
          unlock the power of premium budgeting.
        </p>

        <div className="flex flex-col gap-4 mt-6 md:justify-center lg:justify-start">
          <p className="w-fit">{getSpecial()}</p>
        </div>
      </div>

      {/* Right Section with Images */}
      <div className="right relative w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
        {/* Large screen mockup */}
        <div className="relative w-full max-w-[500px] md:max-w-none">
          <img src={Networth} alt="Laptop mockup" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
