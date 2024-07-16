import { AiOutlineIssuesClose } from "react-icons/ai";
import { BiSolidXSquare } from "react-icons/bi";
import { BsHourglassTop, BsSignStopFill } from "react-icons/bs";
import { FaCheckSquare, FaTasks } from "react-icons/fa";
import { GiBattery0, GiBattery100, GiBattery25, GiBattery50, GiBattery75, GiProgression } from "react-icons/gi";
import { GoThumbsup } from "react-icons/go";
import { GrProjects } from "react-icons/gr";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdCancel, MdFiberNew, MdOutlinePublishedWithChanges, MdPendingActions, MdRateReview } from "react-icons/md";
import { PiPulseFill } from "react-icons/pi";

export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  // "bg-gray-300 text-black",
  // "bg-gray-400 text-black",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
  "bg-[#20409A] text-white",
  "bg-[#00ABBD] text-white",
];

export const trackBarColor = "#C6EFCE";
export const progressBarColor = "#006100";
export const trackBarColorPlan = "#C4EFFF";
export const progressBarColorPlan = "#004F6C";
export const themeColors = ["#20409A", "#ffe99b"];
export const varyingColors = [
  "#1A4A5E",
  "#27708B",
  "#80C1DB",
  "#9AD3DA",
  "#398F99",
  "#266066",
  "#316857",
  "#4A9B83",
  "#ABD8CA",
  "#AEBABB",
  "#5A696B",
  "#3D4647",
  "#3A5A63",
  "#588894",
  "#B5CCD2",
  "#74B5E4",
  "#1D6194",
  "#134162",
];

const myRiskRating = [
  ["Moderate", "Severe", "Severe", "Critical", "Critical"],
  ["Sustainable", "Moderate", "Severe", "Critical", "Critical"],
  ["Sustainable", "Moderate", "Moderate", "Severe", "Critical"],
  ["Sustainable", "Sustainable", "Moderate", "Severe", "Critical"],
  ["Sustainable", "Sustainable", "Sustainable", "Moderate", "Severe"],
];
const ImpactMapping = {
  "Very High": 4,
  High: 3,
  Medium: 2,
  Low: 1,
  "Very Low": 0,
};
const LikelihoodMapping = {
  "Very High": 0,
  High: 1,
  Medium: 2,
  Low: 3,
  "Very Low": 4,
};

export function getRiskRating(recordImpact, recordLikelyhood) {
  if (recordImpact && recordLikelyhood) {
    const impact = ImpactMapping[recordImpact];
    const likelihood = LikelihoodMapping[recordLikelyhood];

    const rating = myRiskRating[likelihood][impact];
    if (rating) {
      return rating;
    } else {
      return null;
    }
  }
  return null;
}

export function getRiskRatingColor(recordImpact, recordLikelyhood) {
  if (recordImpact && recordLikelyhood) {
    const impact = ImpactMapping[recordImpact];
    const likelihood = LikelihoodMapping[recordLikelyhood];

    const rating = myRiskRating[likelihood][impact];
    switch (rating) {
      case "Critical":
        return "text-white bg-[#1A4A5E]";
      case "Severe":
        return "text-white bg-[#27708B]";
      case "Moderate":
        return "text-black bg-[#80C1DB]";
      case "Sustainable":
        return "text-black bg-[#9AD3DA]";
      default:
        return "text-[#BFBFBF]"; //lightgray
    }
  }
  return "text-[#BFBFBF]"; //lightgray
}

export function getRiskColor(risk) {
  switch (risk) {
    case "Very High":
      return "text-[#FFFFFF] bg-[#FF0000]";
    case "High":
      return "text-[#9C0006] bg-[#FFC7CE]";
    case "Medium":
      return "text-[#9C6500] bg-[#FFEB9C]";
    case "Low":
      return "text-[#006100] bg-[#C6EFCE]";
    case "Very Low":
      return "text-[#FFFFFF] bg-[#00B050]";
    default:
      return "text-[#BFBFBF]"; //lightgray
  }
}

export function getPriorityRatingColor(priority) {
  switch (priority) {
    case "Urgent":
      return "text-white bg-[#1A4A5E]";
    case "High":
      return "text-white bg-[#27708B]";
    case "Medium":
      return "text-black bg-[#80C1DB]";
    case "Low":
      return "text-black bg-[#9AD3DA]";
    default:
      return "bg-[#BFBFBF]"; //lightgray
  }
}

export function getIssueRatingColor(severity) {
  switch (severity) {
    case "Critical":
      return "text-white bg-[#1A4A5E]";
    case "Severe":
      return "text-white bg-[#27708B]";
    case "Moderate":
      return "text-black bg-[#80C1DB]";
    case "Sustainable":
      return "text-black bg-[#9AD3DA]";
    default:
      return "bg-[#BFBFBF]"; //lightgray
  }
}

export function getFullName(resourceData, resourceID) {
  const foundResource = resourceData.find((resource) => resource.id === resourceID);
  return foundResource ? foundResource.FullName : null;
}

export function getDesignation(resourceData, resourceID) {
  const foundResource = resourceData.find((resource) => resource.id === resourceID);
  return foundResource ? foundResource.Designation : null;
}

export function getTelephone(resourceData, name) {
  const foundResource = resourceData.find((resource) => resource.FullName === name);
  return foundResource ? foundResource.Telephone : null;
}

export function getEmail(resourceData, name) {
  const foundResource = resourceData.find((resource) => resource.FullName === name);
  return foundResource ? foundResource.Email : null;
}

export function createBirthdayDate(dateOfBirth) {
  const today = new Date();
  const currentYear = today.getFullYear();
  // Parse the DateOfBirth string to extract month and day
  const dateOfBirthDate = new Date(dateOfBirth);
  const birthMonth = dateOfBirthDate.getMonth() + 1; // Add 1 since getMonth() returns zero-based index
  const birthDay = dateOfBirthDate.getDate();
  // Create a new Date object with current year, extracted month, and day
  const birthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay); // Months are zero-based in JavaScript, so subtract 1 from the month
  return birthdayThisYear;
}
export function getResourceBirthdayStatus(dateOfBirth, dates) {
  const birthdayThisYear = createBirthdayDate(dateOfBirth);
  if (birthdayThisYear < dates.today) {
    return "Birthday Passed!";
  } else if (birthdayThisYear === dates.today) {
    return "Birthday Today!";
  } else if (birthdayThisYear === dates.tomorrow) {
    return "Birthday Tomorrow!";
  } else if (birthdayThisYear > dates.tomorrow && birthdayThisYear <= dates.endOfWeek) {
    return "Birthday This Week!";
  } else if (birthdayThisYear > dates.tomorrow && birthdayThisYear <= dates.endOfNextWeek) {
    return "Birthday Next Week!";
  } else if (birthdayThisYear > dates.tomorrow && birthdayThisYear <= dates.endOfMonth) {
    return "Birthday This Month!";
  } else if (birthdayThisYear > dates.tomorrow && birthdayThisYear <= dates.endOfNextMonth) {
    return "Birthday Next Month!";
  } else {
    return "Still to come";
  }
}

export function getStatusColor(status) {
  switch (status) {
    case "New":
      return "bg-[#C4EFFF] text-[#004F6C]";
    case "To-Do":
      return "bg-[#C4EFFF] text-[#004F6C]";
    case "Initiation":
      return "bg-[#C4EFFF] text-[#004F6C]";
    case "Open":
      return "bg-[#FFEB9C] text-[#9C5700]";
    case "Closed":
      return "bg-[#C6EFCE] text-[#006100]";
    case "Closing":
      return "bg-[#C6EFCE] text-[#006100]";
    case "Quote":
      return "bg-[#C4EFFF] text-[#004F6C]";
    case "PO":
      return "bg-[#FFFFCC] text-[#000000]";
    case "Planning":
      return "bg-[#FFFFCC] text-[#000000]";
    case "Review":
      return "bg-[#CAFBED] text-[#07674D]";
    case "Monitoring":
      return "bg-[#CAFBED] text-[#07674D]";
    case "Not-Started":
      return "bg-[#C4EFFF] text-[#004F6C]";
    case "In-Progress":
      return "bg-[#FFEB9C] text-[#9C5700]";
    case "Execution":
      return "bg-[#FFEB9C] text-[#9C5700]";
    case "Completed":
      return "bg-[#C6EFCE] text-[#006100]";
    case "Pending":
      return "bg-[#FFEB9C] text-[#9C5700]";
    case "Invoice":
      return "bg-[#FFEB9C] text-[#9C5700]";
    case "Approved":
      return "bg-[#C6EFCE] text-[#006100]";
    case "Rejected":
      return "bg-[#FFC7CE] text-[#9C0006]";
    case "Decided":
      return "bg-[#C6EFCE] text-[#006100]";
    case "Void":
      return "bg-[#FFC7CE] text-[#9C0006]";
    case "Backlog":
      return "bg-[#FFCC99] text-[#3F3F76]";
    case "On-Hold":
      return "bg-[#FFC7CE] text-[#9C0006]";
    case "Paid":
      return "bg-[#C6EFCE] text-[#006100]";
    case "Cancelled":
      return "bg-black text-white";
    default:
      return "bg-[#BFBFBF]"; //lightgray
  }
}

export function getStageIcon(stage) {
  switch (stage) {
    case "Initiation":
      return <MdFiberNew className="text-lg" />;
    case "Planning":
      return <MdRateReview className="text-lg" />;
    case "Execution":
      return <GiProgression className="text-lg" />;
    case "Monitoring":
      return <PiPulseFill className="text-lg" />;
    case "Closing":
      return <FaCheckSquare className="text-lg" />;
    case "On-Hold":
      return <BsSignStopFill className="text-lg" />;
    case "Cancelled":
      return <GrProjects className="text-lg" />;
    default:
      return <GrProjects className="text-lg" />;
  }
}

export function getTaskStageIcon(stage) {
  switch (stage) {
    case "To-Do":
      return <MdFiberNew />;
    case "In-Progress":
      return <GiProgression />;
    case "On-Hold":
      return <BsSignStopFill />;
    case "Backlog":
      return <BsHourglassTop />;
    case "Review":
      return <MdRateReview />;
    case "Completed":
      return <FaCheckSquare />;
    case "Cancelled":
      return <MdCancel />;
    default:
      return <FaTasks />;
  }
}

export function getIssueStageIcon(stage) {
  switch (stage) {
    case "New":
      return <MdFiberNew />;
    case "Open":
      return <MdRateReview />;
    case "Closed":
      return <FaCheckSquare />;
    default:
      return <AiOutlineIssuesClose />;
  }
}

export function getRiskStageIcon(stage) {
  switch (stage) {
    case "New":
      return <MdFiberNew />;
    case "Open":
      return <MdRateReview />;
    case "Closed":
      return <FaCheckSquare />;
    default:
      return <AiOutlineIssuesClose />;
  }
}

export function getChangeStageIcon(stage) {
  switch (stage) {
    case "New":
      return <MdFiberNew />;
    case "Pending":
      return <MdRateReview />;
    case "Approved":
      return <FaCheckSquare />;
    case "Rejected":
      return <BiSolidXSquare />;
    default:
      return <MdOutlinePublishedWithChanges />;
  }
}

export function getCostStageIcon(stage) {
  switch (stage) {
    case "Quote":
      return <MdFiberNew />;
    case "PO":
      return <MdRateReview />;
    case "Invoice":
      return <MdRateReview />;
    case "Paid":
      return <FaCheckSquare />;
    case "Void":
      return <BiSolidXSquare />;
    default:
      return <LiaMoneyCheckAltSolid />;
  }
}

export function getDecisionStageIcon(stage) {
  switch (stage) {
    case "New":
      return <MdFiberNew />;
    case "Pending":
      return <MdRateReview />;
    case "Decided":
      return <FaCheckSquare />;
    default:
      return <GoThumbsup />;
  }
}

export function getActionStageIcon(stage) {
  switch (stage) {
    case "Not-Started":
      return <MdFiberNew />;
    case "In-Progress":
      return <MdRateReview />;
    case "Completed":
      return <FaCheckSquare />;
    default:
      return <MdPendingActions />;
  }
}

export const PriorityIcon = {
  Critical: <GiBattery100 />,
  Urgent: <GiBattery100 />,
  High: <GiBattery75 />,
  Medium: <GiBattery50 />,
  Low: <GiBattery25 />,
  Severe: <GiBattery75 />,
  Moderate: <GiBattery50 />,
  Sustainable: <GiBattery25 />,
  All: <GiBattery0 />,
};

export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
}

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getProjectName(Data, projectID) {
  const foundProject = Data?.find((project) => project.id === projectID);
  return foundProject ? foundProject.Description : null;
}

export function getProjectID(Data, name) {
  const foundProject = Data.find((project) => project.Description === name);
  return foundProject ? foundProject.id : "";
}

export function getInitials(fullName) {
  const names = fullName?.split(" ");
  const initials = names?.slice(0, 3).map((name) => name[0].toUpperCase());
  const initialsStr = initials?.join("");
  return initialsStr;
}

export function getTotalCount(Data, uniqueProjectIDs) {
  const matchingItems = Data?.filter(
    (item) =>
      uniqueProjectIDs.includes(item.ProjectID) &&
      (item.Status === "New" ||
        item.Status === "Open" ||
        item.Status === "Pending" ||
        item.Status === "Not-Started" ||
        item.Status === "In-Progress")
  );
  const totalCount = matchingItems.length;
  return totalCount;
}

export function getTotalTaskCount(Data, uniqueProjectIDs) {
  const matchingData = Data?.filter((item) => uniqueProjectIDs.includes(item.ProjectID));
  const parentIDs = matchingData?.map((task) => (task.ParentID ? task.ParentID : ""));
  const subTasks = matchingData?.filter((task) => !parentIDs.includes(task.id));
  const activeMatchingData = subTasks?.filter(
    (item) => item.Stage !== "Cancelled" && item.Stage !== "On-Hold" && Number(item.ActualComplete) < 100
  );
  const totalCount = activeMatchingData?.length;
  return totalCount;
}

export function getTaskEndDate(start, duration) {
  const startDate = new Date(start);
  const taskDuration = Number(duration);
  let dueDate = startDate;
  if (!isNaN(startDate.getTime()) && !isNaN(taskDuration)) {
    dueDate = new Date(startDate.getTime() + taskDuration * 24 * 60 * 60 * 1000);
    //dueDate.setDate(startDate.getDate() + taskDuration);
  }
  return dueDate;
}

export function getTaskPlanPercentage(start, duration) {
  const today = new Date();
  const startDate = new Date(start);
  const taskDuration = Number(duration);
  let plan = 0;
  if (!isNaN(startDate.getTime()) && !isNaN(taskDuration)) {
    const dueDate = new Date(startDate.getTime() + taskDuration * 24 * 60 * 60 * 1000);
    if (today < startDate) {
      plan = 0;
    } else if (today > dueDate) {
      plan = 100;
    } else {
      plan = ((today - startDate + 1) / (dueDate - startDate + 1)) * 100;
    }
  }
  // Format plan to 0 decimal places
  plan = parseFloat(plan.toFixed(0));
  return plan;
}

export const getActualProjectPercentageComplete = (Data, projectID) => {
  const activeMatchingData = Data?.filter((item) => item.Stage !== "Cancelled" && item.Stage !== "On-Hold" && item.ProjectID === projectID);

  // Calculate the total duration of all tasks
  const totalDuration = activeMatchingData?.reduce((total, task) => {
    const taskDuration = Number(task.TaskDuration);
    return !isNaN(taskDuration) ? total + taskDuration : total;
  }, 0);
  // Loop through each task in activeMatchingData to calculate the project % complete
  let totalComplete = activeMatchingData?.reduce((total, task) => {
    // Calculate the completion percentage for each task
    const taskDuration = task.TaskDuration ? Number(task.TaskDuration) : 0;
    const actualComplete = task.ActualComplete ? parseFloat(task.ActualComplete) : 0;
    const taskComplete = (actualComplete * taskDuration) / totalDuration;
    return total + taskComplete;
  }, 0);

  totalComplete = parseFloat(totalComplete?.toFixed(0));
  return totalComplete;
};

export const getPlanProjectPercentageComplete = (Data, projectID) => {
  const activeMatchingData = Data?.filter((item) => item.Stage !== "Cancelled" && item.Stage !== "On-Hold" && item.ProjectID === projectID);
  // Calculate the total planned duration of all tasks
  const totalDuration = activeMatchingData?.reduce((total, task) => {
    const taskDuration = Number(task.TaskDuration);
    return !isNaN(taskDuration) ? total + taskDuration : total;
  }, 0);
  // Loop through each task to calculate the project % complete based on planned duration
  let totalComplete = activeMatchingData?.reduce((total, task) => {
    // Calculate the completion percentage for each task based on planned duration
    const taskDuration = task.TaskDuration ? Number(task.TaskDuration) : 0;
    const taskPlan = getTaskPlanPercentage(task.StartDate, taskDuration);
    const taskComplete = (taskPlan * taskDuration) / totalDuration;
    return total + taskComplete;
  }, 0);
  totalComplete = parseFloat(totalComplete?.toFixed(0));
  return totalComplete;
};

export function getTaskPercentageColor(actual, start, duration) {
  const plan = getTaskPlanPercentage(start, duration);
  let color = "text-green-600";
  if (Math.round(actual * 100) < Math.round(plan * 100)) {
    color = "text-red-600";
  } else if (Math.round(actual * 100) > Math.round(plan * 100)) {
    color = "text-green-600";
  } else {
    color = "text-green-600";
  }
  return color;
}

export function getTaskStatus(actual, start, duration) {
  const plan = getTaskPlanPercentage(start, duration);
  let itemStatus = "On-Track";
  if (Math.round(actual * 100) < Math.round(plan * 100)) {
    itemStatus = "Delayed";
  } else if (Math.round(actual * 100) > Math.round(plan * 100)) {
    itemStatus = "Ahead";
  } else {
    itemStatus = "On-Track";
  }
  return itemStatus;
}

export const getProjectCost = (Data, projectID) => {
  const matchingCosts = Data?.filter(
    (cost) => cost.ProjectID === parseInt(projectID) && (cost.Stage === "PO" || cost.Stage === "Invoice" || cost.Stage === "Paid")
  );
  const totalCost = matchingCosts?.reduce((total, cost) => total + (Number(cost.CostAmount) || 0), 0);
  return totalCost;
};

export const getRemainingBudget = (budget, Data, projectID) => {
  const remainingBudget = Number(budget) - Number(getProjectCost(Data, projectID));
  return remainingBudget;
};

export const getRemainingBudgetColor = (budget, Data, projectID) => {
  const remainingBudget = Number(budget) - Number(getProjectCost(Data, projectID));
  let color = "bg-[#C6EFCE] text-[#006100] px-0 rounded-xs";
  if (remainingBudget < 0) {
    color = "bg-[#FFC7CE] text-[#9C0006] px-0 rounded-xs";
  } else if (remainingBudget > 0) {
    color = "bg-[#C6EFCE] text-[#006100] px-0 rounded-xs";
  } else {
    color = "bg-[#FFEB9C] text-[#9C5700] px-0 rounded-xs";
  }
  return color;
};
