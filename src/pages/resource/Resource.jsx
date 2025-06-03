import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loader';
import { AppIcon } from '../../utils/nmrw.icon';
import { getNoData } from '../../utils/nmrw.function';
import { ResourceListView } from '../../components/resource/ResourceListView';
import { getResources } from '../../config/api';
import { useQuery } from 'react-query';
import Select from '../../components/Select';
const types = [
  'General',
  'Home',
  'Income',
  'Expenses',
  'Other Debts',
  'Retirement',
  'Savings',
  'Bank Register',
  'Final Budget',
  'Net Worth',
  'Subscription',
];

export const Resource = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [gridData, setGridData] = useState([]);

  const { data: resources, status: isResourcesLoaded } = useQuery({
    queryKey: ['resources'],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (isResourcesLoaded) {
      let filteredData = resources;
      if (typeFilter !== 'All' && parseInt(typeFilter) !== 0) {
        filteredData = resources?.filter((item) => item?.Type === typeFilter);
      }
      setGridData(filteredData);
      setIsDataLoaded(true);
    }
  }, [resources, isResourcesLoaded, typeFilter]);

  const handleTypeChange = (e) => {
    if (e && e.target?.value) {
      setTypeFilter(e.target?.value);
    }
  };

  return (
    <>
      <div className="w-full flex item-center">
        <div className="w-full gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex justify-end md:justify-between items-center">
          <div className="hidden md:flex gap-5 px-5 xl:gap-10">
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <span className="text-lg text-gray-600">{AppIcon.Training}</span>
                <span className="hidden lg:block">Videos:</span>
              </div>
              <span className="font-bold">{gridData?.length}</span>
            </div>
          </div>
          <div className="w-fit px-5">
            <Select
              onChange={handleTypeChange}
              value={typeFilter}
              options={types?.map((p) => ({
                value: p,
                label: p,
              }))}
              placeholder="All"
              className="bg-white w-full py-1"
            />
          </div>
        </div>
      </div>

      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <>
          <div className="py-2 w-full">
            <ResourceListView
              gridData={gridData}
              hasClass={false}
              types={types}
              title={`Training Videos`}
              showType={true}
            />
          </div>
          <div className="py-0 w-full">{gridData?.length < 1 && getNoData('Resources')}</div>
        </>
      )}
    </>
  );
};

export default Resource;
