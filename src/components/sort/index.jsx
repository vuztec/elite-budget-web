import { LiaSortDownSolid, LiaSortSolid, LiaSortUpSolid } from 'react-icons/lia';
import {
  ascendingSort,
  ascendingSortExtraPayCheck,
  defaultBankSort,
  defaultDebSort,
  defaultFundSort,
  defaultIncomeSort,
  defaultTransactionSort,
  descendingSort,
  descendingSortExtraPayCheck,
} from '../../utils/budget.sort';
import { calculateBalances } from '../../utils/budget.filter';

export default function Sort({
  tab,
  order,
  setOrder,
  column,
  name,
  name2,
  data,
  setData,
  defaultData,
  isNumber,
  type,
}) {
  const sortDefaultClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? 'asc' : 'default')));

    let sorteditems = [];

    if (tab === 'extra-pay-checks') sorteditems = ascendingSortExtraPayCheck(data, name, isNumber);
    else sorteditems = ascendingSort(data, name, name2, isNumber, type);

    if (tab === 'transaction' || tab === 'fund') setData(calculateBalances(sorteditems));
    else setData(sorteditems);
  };

  const sortUpClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? 'desc' : 'default')));

    let sorteditems = [];
    if (tab === 'extra-pay-checks') sorteditems = descendingSortExtraPayCheck(data, name, isNumber);
    else sorteditems = descendingSort(data, name, name2, isNumber, type);

    if (tab === 'transaction' || tab === 'fund') setData(calculateBalances(sorteditems));
    else setData(sorteditems);
  };

  const sortDownClick = () => {
    setOrder((prev) => prev.map((_, index) => (index + 1 === column ? 'default' : 'default')));

    if (tab === 'income') setData(defaultIncomeSort(defaultData));
    else if (tab === 'transaction') {
      setData(calculateBalances(defaultTransactionSort(defaultData)));
    } else if (tab === 'bank') setData(defaultBankSort(defaultData));
    else if (tab === 'fund') {
      setData(calculateBalances(defaultFundSort(defaultData)));
    } else if (tab === 'debt' || tab === 'expense' || tab === 'retirement' || tab === 'saving')
      setData(defaultDebSort(defaultData));
    else {
      setData(defaultData);
    }
  };

  return (
    <div className="cursor-pointer">
      {order[column - 1] === 'default' ? (
        <LiaSortSolid onClick={sortDefaultClick} />
      ) : order[column - 1] === 'asc' ? (
        <LiaSortUpSolid onClick={sortUpClick} />
      ) : (
        <LiaSortDownSolid onClick={sortDownClick} />
      )}
    </div>
  );
}
