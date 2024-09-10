import Safegrad from '../../../../assets/icon/safegrad.png';
import Lock from '../../../../assets/icon/lock.png';
import PersonLock from '../../../../assets/icon/personlock.png';
import Key from '../../../../assets/icon/key.png';
import World from '../../../../assets/icon/world.png';
import Recycle from '../../../../assets/icon/recylceArrow.png';
import WordCap from '../../../../assets/icon/worldwithCap.png';
import Tree from '../../../../assets/icon/tree.png';
import Dashboard from '../../../../assets/icon/dashboard.png';

const cardData = [
  {
    title: 'Advanced Enterprise Protection',
    description:
      'Cash on Consulting offers enterprise-class security across all plans, ensuring complete peace of mind. Integrate with your existing security functions and customize protection with features like double encryption, role-based access control, user authentication, and privacy verifications. For added security, use Cash on Consulting Lock to manage your own encryption keys.',
    icons: [Safegrad, Lock, PersonLock, Key],
    bgColor: 'bg-[#FFEDED]',
    iconBgColor: 'bg-[#FFBBBB]',
  },
  {
    title: '24/7 Worldwide Support',
    description:
      'Cash on Consulting provides award-winning, 24/7 global support across all time zones. Select a package tailored to your needs and budget. Enhance your experience with comprehensive guides, articles, webinars, and demos on the latest productivity features.',
    icons: [World, Recycle, WordCap, Tree],
    bgColor: 'bg-[#EBFFFB]',
    iconBgColor: 'bg-[#BBFFDA]',
  },
  {
    title: 'Smooth Onboarding Process',
    description:
      'Start with Cash on Consulting in minutes using its intuitive interface and seamless adoption. Our professional services team will facilitate a smooth onboarding, including migration from existing tools, sharing best practices, and offering support as needed.',
    bgColor: 'bg-[#FFF8C5]',
    iconBgColor: 'bg-[#FFE4BB]',
    image: Dashboard,
  },
];

function ThreeCards() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-center p-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`flex flex-col w-full md:w-3/4 p-8 ${card.bgColor} rounded-xl justify-between items-center h-[500px]`} // Set a fixed height
        >
          <h1 className="text-[#000000] font-semibold text-[21.09px] text-justify">{card.title}</h1>
          <p className="text-justify text-[#424346] text-[14px] leading-[29.88px]">{card.description}</p>
          {card.icons && (
            <div className="flex justify-between w-full">
              {card.icons.map((iconSrc, iconIndex) => (
                <div key={iconIndex} className={`p-4 flex justify-center items-center rounded-lg ${card.iconBgColor}`}>
                  <img src={iconSrc} alt="" />
                </div>
              ))}
            </div>
          )}
          {card.image && (
            <div className="mt-4">
              <img src={card.image} alt="dashboard" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ThreeCards;
