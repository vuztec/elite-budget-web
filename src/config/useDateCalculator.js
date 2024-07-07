import { useEffect, useState } from 'react';

const useDateCalculator = () => {
  const [dates, setDates] = useState({
    today: null,
    tomorrow: null,
    startOfWeek: null,
    endOfWeek: null,
    startOfMonth: null,
    endOfMonth: null,
    startOfQuarter: null,
    endOfQuarter: null,
    startOfYear: null,
    endOfYear: null,
    startOfNextWeek: null,
    endOfNextWeek: null,
    startOfNextMonth: null,
    endOfNextMonth: null,
    startOfNextQuarter: null,
    endOfNextQuarter: null,
    startOfNextYear: null,
    endOfNextYear: null,
    yesterday: null,
    startOfLastWeek: null,
    endOfLastWeek: null,
    startOfLastMonth: null,
    endOfLastMonth: null,
    startOfLastQuarter: null,
    endOfLastQuarter: null,
    startOfLastYear: null,
    endOfLastYear: null,
    startOfQ1: null,
    endOfQ1: null,
    startOfQ2: null,
    endOfQ2: null,
    startOfQ3: null,
    endOfQ3: null,
    startOfQ4: null,
    endOfQ4: null,
    startOfLastQ1: null,
    endOfLastQ1: null,
    startOfLastQ2: null,
    endOfLastQ2: null,
    startOfLastQ3: null,
    endOfLastQ3: null,
    startOfLastQ4: null,
    endOfLastQ4: null,
    startOfNextQ1: null,
    endOfNextQ1: null,
    startOfNextQ2: null,
    endOfNextQ2: null,
    startOfNextQ3: null,
    endOfNextQ3: null,
    startOfNextQ4: null,
    endOfNextQ4: null,
  });

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the first day of the week

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() - today.getDay() + 7);
    

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999
    

    const startOfQuarter = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
    const endOfQuarter = new Date(startOfQuarter.getFullYear(), startOfQuarter.getMonth() + 3, 0);
    endOfQuarter.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    endOfYear.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    

    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
    endOfNextWeek.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    endOfNextMonth.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextQuarter = new Date(today.getFullYear(), Math.floor((today.getMonth() + 3) / 3) * 3, 1);
    const endOfNextQuarter = new Date(startOfNextQuarter.getFullYear(), startOfNextQuarter.getMonth() + 3, 0);
    endOfNextQuarter.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
    const endOfNextYear = new Date(today.getFullYear() + 1, 11, 31);
    endOfNextYear.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastWeek = new Date(today);
    startOfLastWeek.setDate(today.getDate() - today.getDay() - 7);

    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    endOfLastWeek.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    endOfLastMonth.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastQuarter = new Date(today.getFullYear(), Math.floor((today.getMonth() - 3) / 3) * 3, 1);
    const endOfLastQuarter = new Date(startOfLastQuarter.getFullYear(), startOfLastQuarter.getMonth() + 3, 0);
    endOfLastQuarter.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
    endOfLastYear.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfQ1 = new Date(today.getFullYear(), 0, 1);
    const endOfQ1 = new Date(today.getFullYear(), 2, 31);
    endOfQ1.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfQ2 = new Date(today.getFullYear(), 3, 1);
    const endOfQ2 = new Date(today.getFullYear(), 5, 30);
    endOfQ2.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfQ3 = new Date(today.getFullYear(), 6, 1);
    const endOfQ3 = new Date(today.getFullYear(), 8, 30);
    endOfQ3.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfQ4 = new Date(today.getFullYear(), 9, 1);
    const endOfQ4 = new Date(today.getFullYear(), 11, 31);
    endOfQ4.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastQ1 = new Date(today.getFullYear() - 1, 0, 1);
    const endOfLastQ1 = new Date(today.getFullYear() - 1, 2, 31);
    endOfLastQ1.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastQ2 = new Date(today.getFullYear() - 1, 3, 1);
    const endOfLastQ2 = new Date(today.getFullYear() - 1, 5, 30);
    endOfLastQ2.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastQ3 = new Date(today.getFullYear() - 1, 6, 1);
    const endOfLastQ3 = new Date(today.getFullYear() - 1, 8, 30);
    endOfLastQ3.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfLastQ4 = new Date(today.getFullYear() - 1, 9, 1);
    const endOfLastQ4 = new Date(today.getFullYear() - 1, 11, 31);
    endOfLastQ4.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextQ1 = new Date(today.getFullYear() + 1, 0, 1);
    const endOfNextQ1 = new Date(today.getFullYear() + 1, 2, 31);
    endOfNextQ1.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextQ2 = new Date(today.getFullYear() + 1, 3, 1);
    const endOfNextQ2 = new Date(today.getFullYear() + 1, 5, 30);
    endOfNextQ2.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextQ3 = new Date(today.getFullYear() + 1, 6, 1);
    const endOfNextQ3 = new Date(today.getFullYear() + 1, 8, 30);
    endOfNextQ3.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999

    const startOfNextQ4 = new Date(today.getFullYear() + 1, 9, 1);
    const endOfNextQ4 = new Date(today.getFullYear() + 1, 11, 31);
    endOfNextQ4.setHours(23, 59, 59, 999); // Set end time to 23:59:59.999
    

    setDates({
      today,
      tomorrow,
      startOfWeek,
      endOfWeek,
      startOfMonth,
      endOfMonth,
      startOfQuarter,
      endOfQuarter,
      startOfYear,
      endOfYear,
      startOfNextWeek,
      endOfNextWeek,
      startOfNextMonth,
      endOfNextMonth,
      startOfNextQuarter,
      endOfNextQuarter,
      startOfNextYear,
      endOfNextYear,
      yesterday,
      startOfLastWeek,
      endOfLastWeek,
      startOfLastMonth,
      endOfLastMonth,
      startOfLastQuarter,
      endOfLastQuarter,
      startOfLastYear,
      endOfLastYear,
      startOfQ1,
      endOfQ1,
      startOfQ2,
      endOfQ2,
      startOfQ3,
      endOfQ3,
      startOfQ4,
      endOfQ4,
      startOfLastQ1,
      endOfLastQ1,
      startOfLastQ2,
      endOfLastQ2,
      startOfLastQ3,
      endOfLastQ3,
      startOfLastQ4,
      endOfLastQ4,
      startOfNextQ1,
      endOfNextQ1,
      startOfNextQ2,
      endOfNextQ2,
      startOfNextQ3,
      endOfNextQ3,
      startOfNextQ4,
      endOfNextQ4,
    });
  }, []);

  return dates;
};

export default useDateCalculator;
