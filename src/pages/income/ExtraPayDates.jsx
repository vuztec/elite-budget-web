import React, { useEffect, useState } from 'react';
import useUserStore from '../../app/user';
import { Margin, usePDF } from 'react-to-pdf';
import Button from '../../components/Button';
import { PiPrinter } from 'react-icons/pi';
import Package from '../../package/Package';
import { getActiveAccount } from '../../utils/permissions';
import { useLocation } from 'react-router-dom';
import { SidebarLinks } from '../../utils/sidebar.data';
import { getPageCopyright, getPageTitle } from '../../utils';

// color for each row in
export const colors = ['#FFFFFF', 'whitesmoke', '#FFFFFF', 'whitesmoke', '#FFFFFF'];

export const ExtraPayDates = () => {
  const { user } = useUserStore();
  const { toPDF, targetRef } = usePDF({
    filename: 'extra-pay-dates.pdf',
    page: { margin: Margin.MEDIUM, orientation: 'landscape' },
  });
  const activeAccount = getActiveAccount(user);
  const [title, setTitle] = useState('');
  const location = useLocation();

  function getFifthMondays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthMondays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 1 ? 1 - dayOfWeek + 7 * 4 : 1 - dayOfWeek + 7 * 5;
      const fifthMondayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthMondayDate.getDate() >= 25) {
        // Format the date as "Monday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthMondayDate);
        fifthMondays.push(formattedDate);
      }
    }
    return fifthMondays;
  }

  function getFifthTuesdays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthTuesdays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 2 ? 2 - dayOfWeek + 7 * 4 : 2 - dayOfWeek + 7 * 5;
      const fifthTuesdayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthTuesdayDate.getDate() >= 25) {
        // Format the date as "Tuesday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthTuesdayDate);
        fifthTuesdays.push(formattedDate);
      }
    }
    return fifthTuesdays;
  }

  function getFifthWednesdays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthWednesdays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 3 ? 3 - dayOfWeek + 7 * 4 : 3 - dayOfWeek + 7 * 5;
      const fifthWednesdayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthWednesdayDate.getDate() >= 25) {
        // Format the date as "Wednesday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthWednesdayDate);
        fifthWednesdays.push(formattedDate);
      }
    }
    return fifthWednesdays;
  }

  function getFifthThursdays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthThursdays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 4 ? 4 - dayOfWeek + 7 * 4 : 4 - dayOfWeek + 7 * 5;
      const fifthThursdayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthThursdayDate.getDate() >= 25) {
        // Format the date as "Thursday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthThursdayDate);
        fifthThursdays.push(formattedDate);
      }
    }
    return fifthThursdays;
  }

  function getFifthFridays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthFridays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 5 ? 5 - dayOfWeek + 7 * 4 : 5 - dayOfWeek + 7 * 5;
      const fifthFridayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthFridayDate.getDate() >= 25) {
        // Format the date as "Friday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthFridayDate);
        fifthFridays.push(formattedDate);
      }
    }
    return fifthFridays;
  }

  function getFifthSaturdays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthSaturdays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 6 ? 6 - dayOfWeek + 7 * 4 : 6 - dayOfWeek + 7 * 5;
      const fifthSaturdayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthSaturdayDate.getDate() >= 25) {
        // Format the date as "Saturday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthSaturdayDate);
        fifthSaturdays.push(formattedDate);
      }
    }
    return fifthSaturdays;
  }

  function getFifthSundays() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const fifthSundays = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysToAdd = dayOfWeek <= 0 ? 0 - dayOfWeek + 7 * 4 : 0 - dayOfWeek + 7 * 5;
      const fifthSundayDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
      // Check if the date is on or after the 25th
      if (fifthSundayDate.getDate() >= 25) {
        // Format the date as "Sunday, dd-MMM-yyyy"
        const formattedDate = new Intl.DateTimeFormat(user?.Separator, {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(fifthSundayDate);
        fifthSundays.push(formattedDate);
      }
    }
    return fifthSundays;
  }

  useEffect(() => {
    const data = SidebarLinks.find((item) =>
      item.link ? item.link === location.pathname : item.sub.find((sub_item) => sub_item.link === location.pathname),
    );

    if (data?.sub?.length) {
      const sub = data.sub.find((sub_item) => sub_item.link === location.pathname);
      setTitle(sub?.title);
    } else setTitle(data?.title);
  }, [location.pathname]);

  const handlePdf = () => {
    setTimeout(() => {
      toPDF();
    }, 10);
  };

  return activeAccount ? (
    <div ref={targetRef}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center justify-between">
            <div></div>
            <div>{getPageTitle('Extra Pay Dates', user)}</div>
            <div className="text-sm min-w-fit whitespace-nowrap">
              <Button
                onClick={handlePdf}
                icon={<PiPrinter />}
                label={'Print'}
                className={
                  'flex flex-row-reverse h-min w-max justify-center items-center bg-black text-white text-lg gap-2 hover:bg-[whitesmoke] hover:text-black'
                }
              />
            </div>
          </div>
          <div className="px-6">
            <p className="text-xs">
              * Note 1: When paid weekly, your extra pay dates are listed under the day of the week you are paid.
            </p>
            <p className="text-xs xl:w-full">
              * Note 2: There is an extra step when paid biweekly because it’s based on your first pay date each year.
              Your 2 extra pay dates are listed under the day of the week you are paid but you will have to refer to a
              calendar to determine which of those dates listed are your 2 extra pay dates.
            </p>
          </div>
        </div>
        <div className="w-full bg-white my-4 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 gap-5 xl:gap-10 text-xs md:text-sm">
          <div className="flex flex-col items-center mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Mondays
            </h1>
            {getFifthMondays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Tuesdays
            </h1>
            {getFifthTuesdays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Wednesdays
            </h1>
            {getFifthWednesdays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center  mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Thursdays
            </h1>
            {getFifthThursdays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Fridays
            </h1>
            {getFifthFridays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center  mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Saturdays
            </h1>
            {getFifthSaturdays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <h1 className="w-full flex items-center justify-center font-bold p-1 rounded-t-lg bg-gray-200 text-sm md:text-lg ">
              Sundays
            </h1>
            {getFifthSundays().map((date, index) => (
              <p
                className="w-full p-2 flex items-center justify-center"
                key={index}
                style={{
                  backgroundColor: colors[index],
                }}
              >
                {date}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full bg-white rounded-lg border-t mt-8 p-6 text-center justify-center">
          <p>{getPageCopyright()}</p>
        </div>
      </div>
    </div>
  ) : (
    <Package />
  );
};

export default ExtraPayDates;
