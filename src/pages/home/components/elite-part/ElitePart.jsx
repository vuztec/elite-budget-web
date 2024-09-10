import React from 'react';
import Enhance from '../../../../assets/icon/enhanceResponsibility.png';
import SaveTime from '../../../../assets/icon/saveTime.png';
import Boost from '../../../../assets/icon/boostEficiency.png';
import Optimize from '../../../../assets/icon/optimizeWorkflow.png';

function ElitePart() {
  // Data for the feature cards
  const features = [
    {
      id: 1,
      icon: Enhance,
      title: 'Enhance transparency',
      highlighted: 'and responsibility',
      description:
        'Eliminate ambiguity! Our dashboard promotes transparency and accountability with clear tasks, deadlines, and real-time updates. Effortlessly monitor progress and responsibilities all from one central platform.',
      bgColor: 'bg-[#E7F7F8]',
      titlebgColor: 'bg-[#9FE4E4]',
    },
    {
      id: 2,
      icon: SaveTime,
      title: 'Save time, seamlessly',
      highlighted: 'manage your budget',
      description:
        'Remove uncertainty with our dashboard, which offers clear tasks, deadlines, and real-time updates. Effortlessly track progress and responsibilities from one centralized platform.',
      bgColor: 'bg-[#FFF4E6]',
      titlebgColor: 'bg-[#F5DF96]',
    },
    {
      id: 3,
      icon: Boost,
      title: 'Boost',
      highlighted: 'efficiency',
      description:
        'Boost efficiency with our dashboard by streamlining tasks and deadlines. Gain real-time insights and manage your budget effortlessly from one central platform.',
      bgColor: 'bg-[#F6E7F5]',
      titlebgColor: 'bg-[#F6C5FF]',
    },
    {
      id: 4,
      icon: Optimize,
      title: 'Optimize',
      highlighted: 'Workflow',
      description:
        'Unlock your team’s true potential! Elite optimizes workflows, eliminates duplicated tasks, and enhances overall productivity. With clear task assignments and tracking, team members can prioritize effectively and meet deadlines efficiently.',
      bgColor: 'bg-[#E7F0FF]',
      titlebgColor: 'bg-[#ADD2FF]',
    },
  ];

  return (
    <div className="flex flex-col items-center p-6 md:p-12 lg:p-24 space-y-10">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-[#212529] font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-[56px] leading-tight">
          What sets Elite apart
        </h1>
        <div className="px-4 md:px-10 lg:px-28">
          <p className="text-[#212529] font-normal text-base md:text-lg lg:text-xl mt-4 text-center">
            Elite isn't just about managing budgets; it's about transforming the way you handle finances. Here's how
            Elite makes it happen.
          </p>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col items-center p-4 md:p-6 lg:p-8 w-full sm:w-11/12 md:w-1/3 lg:w-1/3 xl:w-1/4 rounded-lg shadow-md ${feature.bgColor}`}
          >
            {/* Icon Section */}
            <div className="mb-4">
              <img src={feature.icon} alt={feature.title} className="h-12 w-14 md:h-16 md:w-20" />
            </div>

            {/* Title and Highlighted Text */}
            <h3
              className={`text-[#091E42] ${
                feature.id === 3 || feature.id === 4 ? 'font-semibold' : 'font-medium'
              } text-base md:text-lg lg:text-xl mb-2 text-center`}
            >
              <span className={`inline-block ${feature.id === 1 || feature.id === 2 ? feature.titlebgColor : ''} p-1`}>
                {feature.title}
              </span>
              <span className={`inline-block ${feature.id === 3 || feature.id === 4 ? feature.titlebgColor : ''} p-1`}>
                {feature.highlighted}
              </span>
            </h3>

            {/* Description */}
            <p className="text-[#091E42] font-normal text-xs md:text-sm lg:text-base text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElitePart;
