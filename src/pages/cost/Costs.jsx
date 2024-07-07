import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDateCalculator from "../../config/useDateCalculator";
import { FaList } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff, MdGridView } from "react-icons/md";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../../components/Tabs";
import Loading from "../../components/Loader";
import {
  AddCost,
  CostBoardView,
  CostDashView,
  CostListView,
} from "../../components/cost";
import { useQuery } from "react-query";
import useUserStore from "../../app/user";
import {
  payDataSource,
  getUpdateCostGridData,
  invoiceDataSource,
} from "../../utils/filters";
import clsx from "clsx";
import socket from "../../utils/socket";
import {
  getDateFormat,
  getProjects,
  getResources,
  getCosts,
} from "../../config/api";
import { BsBarChart } from "react-icons/bs";
import { themeColors } from "../../utils";
import Select from "../../components/Select";
import {
  getActiveAccount,
  getAddCostPermission,
} from "../../utils/permissions";
import Package from "../../package/Package";

const TABS = [
  { title: "Dashboard", icon: <BsBarChart /> },
  { title: "Grid View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const CostStages = ["Quote", "PO", "Invoice", "Paid", "Void"];

export const Costs = () => {
  const { user, root } = useUserStore();
  const usedCurrency = root.Currency ? root.Currency : "$";
  const dates = useDateCalculator();
  const [customDateFormat, setCustomDateFormat] = useState();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [updatedCostData, setUpdatedCostData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [projectFilter, setProjectFilter] = useState(0);
  const [assignedToFilter, setAssignedToFilter] = useState(0);
  const [invoicedDateFilter, setInvoiceDateFilter] = useState("All");
  const [paidDateFilter, setPaidDateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [serviceProviderFilter, setServiceProviderFilter] = useState("All");
  const activeAccount = getActiveAccount(root);

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

  const { data: costData, status: isCostLoaded } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
    staleTime: 1000 * 60 * 60,
  });

  const { data: dateFormatData, status: isDateFormatLoaded } = useQuery({
    queryKey: ["dateformat"],
    queryFn: getDateFormat,
    staleTime: 1000 * 60 * 60,
  });

  const { data: projectData, status: isProjectLoaded } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 60,
  });
  const { data: resourceData, status: isResourceLoaded } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 1000 * 60 * 60,
  });

  ///-------------Filters Data Source --------------------------------///
  const stages = CostStages.map((stage) => ({ value: stage, label: stage }));
  const invoiceDates = invoiceDataSource.map((invoice) => ({
    value: invoice,
    label: invoice,
  }));
  const payDates = payDataSource.map((pay) => ({ value: pay, label: pay }));

  const resources = useMemo(() => {
    return resourceData?.map((resource) => ({
      value: resource.id,
      label: resource.FullName,
    }));
  }, [resourceData]);

  const projects = useMemo(() => {
    return projectData?.map((project) => ({
      value: project.id,
      label: project.Description,
    }));
  }, [projectData]);

  const uniqueCategories = [
    ...new Set(costData?.map((item) => (item.Category ? item.Category : ""))),
  ];
  const categories = useMemo(() => {
    return uniqueCategories?.map((category) => ({
      value: category,
      label: category,
    }));
  }, [uniqueCategories]);

  const uniqueServiceProviders = [
    ...new Set(
      costData?.map((item) =>
        item.ServiceProvider ? item.ServiceProvider : ""
      )
    ),
  ];
  const serviceProviders = useMemo(() => {
    return uniqueServiceProviders?.map((ServiceProvider) => ({
      value: ServiceProvider,
      label: ServiceProvider,
    }));
  }, [uniqueServiceProviders]);
  ///-------------END Filters Data Source --------------------------------///

  useEffect(() => {
    if (name === "costs") setSelected(parseInt(tab));
  }, [name, tab]);

  useEffect(() => {
    if (
      isProjectLoaded === "success" &&
      isResourceLoaded === "success" &&
      isDateFormatLoaded === "success" &&
      isCostLoaded === "success"
    ) {
      const sub = root.subscriptions?.[0];
      if (sub?.Payment && !sub?.Is_Expired) {
        // setGridData(costData);
        setUpdatedCostData(costData);
      } else {
        // setGridData([]);
        setUpdatedCostData([]);
      }

      const targetFormatData = dateFormatData?.find(
        (item) => item.UserID === user.id
      );
      const userDateFormat = targetFormatData
        ? targetFormatData.Format
        : "MMM dd, yyyy";
      setCustomDateFormat(userDateFormat);

      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [
    projectData,
    costData,
    resourceData,
    isCostLoaded,
    isProjectLoaded,
    isResourceLoaded,
    dateFormatData,
    isDateFormatLoaded,
    user,
  ]);

  useEffect(() => {
    const updatedData = getUpdateCostGridData(
      updatedCostData,
      dates,
      projectFilter,
      assignedToFilter,
      invoicedDateFilter,
      paidDateFilter,
      statusFilter,
      categoryFilter,
      serviceProviderFilter
    );

    setGridData(updatedData);
  }, [
    updatedCostData,
    projectFilter,
    assignedToFilter,
    invoicedDateFilter,
    paidDateFilter,
    statusFilter,
    categoryFilter,
    serviceProviderFilter,
  ]);

  const handleProjectChange = (e) => {
    if (e && e.target?.value) {
      setProjectFilter(e.target?.value);
    }
  };
  const handleAssignedToChange = (e) => {
    if (e && e.target?.value) {
      setAssignedToFilter(e.target?.value);
    }
  };

  const handleStatusChange = (e) => {
    if (e && e.target?.value) {
      setStatusFilter(e.target?.value);
    }
  };

  const handleServiceProviderChange = (e) => {
    if (e && e.target?.value) {
      setServiceProviderFilter(e.target?.value);
    }
  };

  const handleCategoryChange = (e) => {
    if (e && e.target?.value) {
      setCategoryFilter(e.target?.value);
    }
  };

  const handleInvoiceDateChange = (e) => {
    if (e && e.target?.value) {
      setInvoiceDateFilter(e.target?.value);
    }
  };

  const handlePayDateChange = (e) => {
    if (e && e.target?.value) {
      setPaidDateFilter(e.target?.value);
    }
  };

  const addNewClick = () => {
    setOpen(true);
  };

  const [isShowing, setIsShowing] = useState(false);

  return activeAccount ? (
    <>
      <div className="w-full flex item-center justify-end">
        <div className="w-fit gap-4 h-10 md:h-12 px-2 rounded-full bg-white flex items-center">
          <div>
            <div className="text-sm">
              <Button
                label={!isShowing ? "Show Filters" : "Hide Filters"}
                icon={
                  !isShowing ? (
                    <MdFilterAlt className="text-lg" />
                  ) : (
                    <MdFilterAltOff className="text-lg" />
                  )
                }
                className={clsx(
                  "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white ",
                  !isShowing ? "bg-green-800" : "bg-red-800"
                )}
                onClick={() => setIsShowing((old) => !old)}
              />
            </div>
          </div>
          {getAddCostPermission(user, projectData) && (
            <div className="text-sm">
              <Button
                label="Add New"
                icon={<IoMdAdd className="text-lg" />}
                className={clsx(
                  "flex flex-row-reverse gap-2 p-1 text-sm rounded-full items-center text-white hover:bg-viewcolor",
                  `bg-[${themeColors[1]}] hover:text-[${themeColors[1]}]`
                )}
                onClick={() => addNewClick()}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-5",
          isShowing ? "block" : "hidden"
        )}
      >
        <div className="w-full">
          <Select
            onChange={handleProjectChange}
            value={projectFilter}
            options={projects}
            placeholder="All"
            label="Project"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleAssignedToChange}
            value={assignedToFilter}
            options={resources}
            placeholder="All"
            label="Assignee"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleServiceProviderChange}
            value={serviceProviderFilter}
            options={serviceProviders}
            placeholder="All"
            label="Service Provider"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleCategoryChange}
            value={categoryFilter}
            options={categories}
            placeholder="All"
            label="Category"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleStatusChange}
            value={statusFilter}
            options={stages}
            placeholder="All"
            label="Stage"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handleInvoiceDateChange}
            value={invoicedDateFilter}
            options={invoiceDates}
            placeholder="All"
            label="Invoice Date"
            className="bg-white w-full py-1"
          />
        </div>
        <div className="w-full">
          <Select
            onChange={handlePayDateChange}
            value={paidDateFilter}
            options={payDates}
            placeholder="All"
            label="Paid Date"
            className="bg-white w-full py-1"
          />
        </div>
      </div>

      {!isDataLoaded && (
        <div className="py-10">
          <Loading />
        </div>
      )}

      {isDataLoaded && (
        <div className="w-full">
          <Tabs tab={"costs"} tabs={TABS} selected={selected}>
            {selected === 0 && (
              <div className="py-4 w-full">
                <CostDashView
                  gridData={gridData}
                  projectData={projectData}
                  customDateFormat={customDateFormat}
                  usedCurrency={usedCurrency}
                />
              </div>
            )}
            {selected === 1 && (
              <div className="py-4 w-full">
                <CostBoardView
                  costs={gridData}
                  customDateFormat={customDateFormat}
                  usedCurrency={usedCurrency}
                  projectData={projectData}
                />
              </div>
            )}
            {selected === 2 && (
              <div className="py-4 w-full">
                <CostListView
                  gridData={gridData}
                  customDateFormat={customDateFormat}
                  usedCurrency={usedCurrency}
                  projectData={projectData}
                />
              </div>
            )}
          </Tabs>

          <AddCost
            socket={socket}
            open={open}
            setOpen={setOpen}
            recordData={""}
            key={new Date().getTime().toString()}
          />
        </div>
      )}
    </>
  ) : (
    <Package />
  );
};
