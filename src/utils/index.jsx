import clsx from 'clsx';

export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export const formatDateForForm = (date) => {
  // Get the month, day, and year
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
}

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return '';
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  const names = fullName?.split(' ');
  const initials = names?.slice(0, 3).map((name) => name[0].toUpperCase());
  const initialsStr = initials?.join('');
  return initialsStr;
}

export function getPageTitle(title, user) {
  const pageTitle = (
    <div className="min-w-fit whitespace-nowrap flex justify-center items-center py-2 px-3 gap-2 rounded-full text-3xl">
      <h1 className="font-bold uppercase hidden xl:block">{title + ' for ' + user?.FullName}</h1>
      <h1 className="font-bold uppercase hidden md:block  xl:hidden text-xl">{title}</h1>
    </div>
  );
  return pageTitle;
}

export function getPageCopyright(textCSS) {
  const pageTitle = (
    <div
      className={clsx(
        'flex flex-col py-2 px-3 gap-2 rounded-full text-xs lg:text-sm',
        textCSS ? 'justify-start items-start' : 'justify-center items-center',
      )}
    >
      <h1 className="min-w-fit whitespace-nowrap ">Copyright © 2024 Elite Cash Flow Products, LLC</h1>
      <h1 className="min-w-fit whitespace-nowrap ">All Rights Reserved</h1>
    </div>
  );
  return pageTitle;
}
