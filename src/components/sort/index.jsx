import { LiaSortDownSolid, LiaSortSolid, LiaSortUpSolid } from "react-icons/lia";
import {
  ascendingSort,
  defaultBankSort,
  defaultDebSort,
  defaultFundSort,
  defaultIncomeSort,
  defaultTransactionSort,
  descendingSort,
} from "../../utils/budget.sort";

export default function Sort({ tab, order, setOrder, column, name, name2, data, setData, defaultData }) {
  const sortDefaultClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? "asc" : "default")));

    setData(ascendingSort(data, name, name2));
  };
  const sortUpClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? "desc" : "default")));
    setData(descendingSort(data, name, name2));
  };
  const sortDownClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? "default" : "default")));

    if (tab === "income") setData(defaultIncomeSort(defaultData));
    else if (tab === "transaction") setData(defaultTransactionSort(defaultData));
    else if (tab === "bank") setData(defaultBankSort(defaultData));
    else if (tab === "fund") setData(defaultFundSort(defaultData));
    else if (tab === "debt" || tab === "expense" || tab === "retirement" || tab === "saving") setData(defaultDebSort(defaultData));
    else setData(defaultData);
  };
  return (
    <div className="cursor-pointer">
      {order[column - 1] === "default" ? (
        <LiaSortSolid onClick={sortDefaultClick} />
      ) : order[column - 1] === "asc" ? (
        <LiaSortUpSolid onClick={sortUpClick} />
      ) : (
        <LiaSortDownSolid onClick={sortDownClick} />
      )}
    </div>
  );
}
