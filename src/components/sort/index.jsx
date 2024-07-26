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
import { calculateBalances } from "../../utils/budget.filter";

export default function Sort({ tab, order, setOrder, column, name, name2, data, setData, defaultData, isNumber }) {
  const sortDefaultClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? "asc" : "default")));

    const sorteditems = ascendingSort(data, name, name2, isNumber);

    if (tab === "transaction") {
      setData(calculateBalances(sorteditems));
    } else setData(sorteditems);
  };
  const sortUpClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? "desc" : "default")));

    const sorteditems = descendingSort(data, name, name2, isNumber);

    if (tab === "transaction") {
      setData(calculateBalances(sorteditems));
    } else setData(sorteditems);
  };
  const sortDownClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? "default" : "default")));

    if (tab === "income") setData(defaultIncomeSort(defaultData));
    else if (tab === "transaction") {
      setData(calculateBalances(defaultTransactionSort(defaultData)));
    } else if (tab === "bank") setData(defaultBankSort(defaultData));
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
