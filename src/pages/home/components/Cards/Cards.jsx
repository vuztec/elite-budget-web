import React from 'react';

function Cards() {
  // Array of card data
  const cardData = [
    {
      id: 1,
      iconSrc: '../../../../assets/icon/home.png',
      title: 'Home',
      description: 'Track your savings with clarity and precision by monitoring both yearly and monthly totals.',
      bgColor: '#FF7452', // Unique background color for each card
    },
    {
      id: 2,
      iconSrc: '../../../../assets/icon/doller.png',
      title: 'Income',
      description: 'Monitor your income sources and understand your earning trends with detailed reports.',
      bgColor: '#2684FF',
    },
    {
      id: 3,
      iconSrc: '../../../../assets/icon/cart.png',
      title: 'Savings',
      description: 'Keep track of your savings goals and ensure financial security for the future.',
      bgColor: '#57D9A3',
    },
    {
      id: 4,
      iconSrc: '../../../../assets/icon/folder.png',
      title: 'Investments',
      description: 'Analyze your investments and stay on top of your portfolio for long-term growth.',
      bgColor: '#FFC400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 lg:px-28 mb-5">
      {cardData.map((card) => (
        <div key={card.id} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden relative">
          {/* Background Bar */}
          <div className="relative h-12 w-full" style={{ backgroundColor: card.bgColor }}>
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 bg-white p-1 rounded-lg shadow-md">
              <img src={card.iconSrc} alt={`${card.title} Icon`} className="h-8 w-8" />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col px-4 py-5">
            <h1 className="text-[#091E42] font-semibold text-lg mb-2">{card.title}</h1>
            <p className="text-[#091E42] font-normal text-sm">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
