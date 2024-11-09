import Safegrad from '../../../assets/icon/safegrad.png';
// import Safegrad from '../../../../assets/icon/safegrad.png';
import Lock from '../../../assets/icon/lock.png';
import PersonLock from '../../../assets/icon/personlock.png';
import Key from '../../../assets/icon/key.png';
import World from '../../../assets/icon/world.png';
import Recycle from '../../../assets/icon/recylceArrow.png';
import WordCap from '../../../assets/icon/worldwithCap.png';
import Tree from '../../../assets/icon/tree.png';
import Dashboard from '../../../assets/image/dashboard.png';

const cardData = [
  {
    title: 'App Security',
    description:
      'The Elite Budget App offers privacy security ensuring complete peace of mind. Integrate with your existing security functions and customize protection with features like double encryption, and user authentication.',
    icons: [Safegrad, Lock, PersonLock, Key],
    bgColor: 'bg-[#FFEDED]',
    iconBgColor: 'bg-[#FFBBBB]',
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
