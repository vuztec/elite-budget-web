import Networth from '../../../assets/image/net-worth.png';
import Award from '../../../assets/image/award.png';
// import poster from '../../../assets/image/Thumbnail.png';
import { getSpecial } from '../../../utils/nmrw.function';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { AppIcon } from '../../../utils/nmrw.icon';

function Hero() {
  const url = 'https://elite-training-videos.s3.us-west-1.amazonaws.com/MarketingVideo.mp4';
  const audioUrl = 'https://nmrwback.vuztec.com/public/elite/elitejingle.wav';
  const poster = 'https://elite-training-videos.s3.us-west-1.amazonaws.com/Thumbnail.png';
  const vRef = useRef(null);
  const aRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  // const start = () => {
  //   setShowVideo(true);
  //   requestAnimationFrame(() => vRef.current?.play());
  // };
  const start = () => {
    setShowVideo(true);
    requestAnimationFrame(() => {
      vRef.current?.play?.();
      // aRef.current?.play?.();
    });
  };

  return (
    <>
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
          {/* 🎵 Audio Player inserted here */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <audio ref={aRef} src={audioUrl} controls preload="metadata" className="w-[90%] lg:w-[100%] max-w-md" />
          </div>
          <div className="flex flex-col gap-2 mt-6 mb-5 justify-center items-center">
            <p className="w-fit">{getSpecial(true)}</p>
            <a
              href="/signup"
              className="flex w-fit items-center gap-2 text-xl md:text-3xl font-medium py-3 px-4 hover:bg-green-300 bg-tryBg text-tryText shadow-md rounded-md"
            >
              Try the App Now <IoIosArrowRoundForward className="text-2xl lg:text-3xl" />
            </a>
          </div>
        </div>

        {/* Right Section with Images */}
        <div className="lg:right lg:relative w-full lg:w-1/2 flex flex-col lg:flex-row justify-center items-center mt-8 lg:mt-0">
          {/* Large screen mockup */}
          <div className="z-10 lg:absolute lg:right-10 lg:top-0">
            <a href="https://theinsiderweekly.com/elite-cash-flow-products-llc-best-budget-web-app/">
              <img src={Award} alt="Award mockup" className="w-40 h-auto" />
            </a>
          </div>

          <div className="overflow-y-auto block overflow-x-auto h-fit border-4 border-black">
            {!showVideo && (
              <button onClick={start} className="block w-full relative">
                <img src={poster} alt="" className="w-[1080px] h-auto" />
                {/* <span className="absolute inset-0 grid place-items-center text-white text-7xl">
                  <span className="">{AppIcon.Training}</span>
                </span> */}
              </button>
            )}
            {showVideo && (
              <video ref={vRef} src={url} controls playsInline width="1080" height="510" className="w-full h-auto" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
