import clsx from 'clsx';
import React from 'react';

export const Video = ({ url }) => {
  return (
    <div className='overflow-y-auto block overflow-x-auto h-fit'>
      <video src={url} width='1440' height='680' controls autoPlay={true} />
    </div>
  );
};

export default Video;
