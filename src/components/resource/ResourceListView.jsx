import React, { useEffect, useState } from 'react';
import useUserStore from '../../app/user';
import clsx from 'clsx';
import Button from '../Button';
import { BsYoutube } from 'react-icons/bs';
import { VideoDialog } from '../DisplayDialogs';
import { format } from 'date-fns';
import moment from 'moment';

export const ResourceListView = ({ gridData, hasClass, types, title, showType }) => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [videoDurations, setVideoDurations] = useState({});

  const loadVideoDuration = (videoId, videoUrl) => {
    const tempVideo = document.createElement('video');
    tempVideo.src = videoUrl;
    tempVideo.preload = 'metadata';

    tempVideo.onloadedmetadata = () => {
      const durationInSeconds = tempVideo.duration;
      setVideoDurations((prev) => ({
        ...prev,
        [videoId]: durationInSeconds,
      }));
    };
  };

  const openVideo = (url) => {
    //window.open(url, '_blank', 'noreferrer');
    setOpen(true);
    setSelected(url);
  };

  const TableHeader = () => (
    <thead className="sticky top-0 z-9">
      <tr className="text-gray-600 font-bold bg-[whitesmoke] border border-gray-400 text-left text-sm xl:text-[16px]">
        <th className="p-2">Title</th>
        <th className="border-l border-gray-300 p-2">Video</th>
        <th className="border-l border-gray-300 p-2">Duration</th>
        {showType && (
          <>
            <th className="border-l border-gray-300 p-2">Last Updated On</th>
            <th className="border-l border-gray-300 p-2">Last Updated By</th>
          </>
        )}
      </tr>
    </thead>
  );

  const TableRowType = ({ type, videos }) => (
    <tr className="text-gray-600 font-bold text-left text-sm xl:text-[16px] bg-[whitesmoke]">
      <td className="min-w-fit whitespace-nowrap p-2">
        <div className="flex flex-col items-start gap-0 font-bold">
          <div className="flex items-center gap-3">
            <span className="font-bold">{type}</span>
            <span className="bg-black text-white rounded-full py-1 px-2">{videos?.length}</span>
          </div>
        </div>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );

  const TableRow = ({ record }) => {
    useEffect(() => {
      if (!videoDurations[record.id]) {
        loadVideoDuration(record.id, record.Path);
      }
    }, [record.id, record.Path]);
    // Format duration (e.g. 01:23:45)
    const formatDuration = (duration) => {
      if (!duration) return 'Loading...';

      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);

      const hStr = hours.toString().padStart(2, '0');
      const mStr = minutes.toString().padStart(2, '0');
      const sStr = seconds.toString().padStart(2, '0');

      return `${hStr}:${mStr}:${sStr}`;
    };
    return (
      <tr className="border border-gray-300 text-sm xl:text-[16px] hover:bg-gray-400/10 text-left">
        <td className="min-w-fit whitespace-nowrap py-3 px-5 border-l border-gray-200">
          <div className="flex items-start gap-2">
            <span>{record?.Name}</span>
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
          <div className="rounded-md text-black">
            <Button
              label={'Watch Video'}
              icon={<BsYoutube />}
              className={clsx(
                'flex flex-row-reverse gap-2 p-1 rounded-full items-center text-white hover:bg-green-600',
                `bg-red-700 hover:text-white`,
              )}
              onClick={() => openVideo(record)}
            />
          </div>
        </td>
        <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
          {formatDuration(videoDurations[record.id])}
        </td>
        {showType && (
          <>
            <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
              <span className="flex items-center justify-left gap-2 text-center">
                {record?.UpdatedAt
                  ? moment(new Date(record?.UpdatedAt)).fromNow()
                  : moment(new Date(record?.CreatedAt)).fromNow()}
              </span>
            </td>

            <td className="min-w-fit whitespace-nowrap p-2 border-l border-gray-200">
              <span className="flex items-center justify-left gap-2 text-center">
                {/* {record?.UpdatedBy ? record?.UpdatedBy?.FullName : record?.CreatedBy?.FullName} */}
                Elite Admin
              </span>
            </td>
          </>
        )}
      </tr>
    );
  };

  return (
    <>
      {gridData?.length > -1 && (
        <div className="w-full h-fit bg-white mt-4 shadow-md rounded-xl">
          {showType && (
            <div className="flex items-center justify-between gap-5 px-5 py-3 uppercase font-bold w-full bg-black text-white rounded-xl">
              <div className="flex gap-5">
                <h1 className="uppercase">{title}</h1>
                {/* <span onClick={() => addNewClick()}>{AppIcon.AddItem}</span> */}
              </div>
            </div>
          )}
          <div className={clsx('overflow-y-auto block overflow-x-auto', hasClass ? 'h-fit' : 'h-[calc(100vh-240px)]')}>
            <table className="w-[97%] m-5">
              <TableHeader />
              <tbody className="h-full overflow-y-auto overflow-x-auto">
                {types?.map((type, typeIndex) => {
                  const videos = gridData?.filter((item) => {
                    return item?.Type === type;
                  });
                  return (
                    <>
                      {videos?.length > 0 && (
                        <React.Fragment key={typeIndex}>
                          {showType && <TableRowType type={type} videos={videos} />}
                          {videos.map((video, videoIndex) => (
                            <TableRow key={videoIndex} record={video} />
                          ))}
                        </React.Fragment>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <VideoDialog open={open} setOpen={setOpen} url={selected?.Path} title={selected?.Name} />
        </div>
      )}
    </>
  );
};

export default ResourceListView;
