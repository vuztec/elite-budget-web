import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loader';
import { AppIcon } from '../../utils/nmrw.icon';
import { getNoData } from '../../utils/nmrw.function';
import useAllDataFetch from '../../config/apis/useAllDataFetch';
import { ResourceListView } from '../../components/resource/ResourceListView';

export const Resource = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { data: resources, isLoaded: isResourcesLoaded } = useAllDataFetch('/api/resource');
  const { data: users, isLoaded: isUsersLoaded } = useAllDataFetch('/api/user');

  useEffect(() => {
    if (isResourcesLoaded && isUsersLoaded) {
      setIsDataLoaded(true);
    }
  }, [isResourcesLoaded, isUsersLoaded]);

  return (
    <>
      <div className='w-full flex item-center'>
        <div className='w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex justify-end md:justify-between items-center'>
          <div className='hidden md:flex gap-5 px-5 xl:gap-10'>
            <div className='flex gap-2'>
              <div className='flex gap-2 items-center'>
                <span className='text-lg text-gray-600'>{AppIcon.Budget}</span>
                <span className='hidden lg:block'>Resources</span>
              </div>
              <span className='font-bold'>: {resources?.length}</span>
            </div>
          </div>
        </div>
      </div>

      {!isDataLoaded && (
        <div className='py-10'>
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <>
          <div className='py-2 w-full'>
            <ResourceListView gridData={resources} hasClass={false} users={users} title={`Training Resources`} />
          </div>
          <div className='py-0 w-full'>{resources?.length < 1 && getNoData('Resources')}</div>
        </>
      )}
    </>
  );
};
