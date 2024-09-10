import Navbar from './components/navbar/Navbar';
import Budget from './components/budget/Budget';
import Income from './components/income/Income';
import Cards from './components/Cards/Cards';
import ElitePart from './components/elite-part/ElitePart';
import Expenses from './components/expenses/Expenses.jsx';
import OtherDebts from './components/other-debts/OtherDebts.jsx';
import BankRegister from './components/bank-register/BankRegister.jsx';
import ThreeCards from './components/three-cards/ThreeCards.jsx';
import EliteSignup from './components/get-in-touch/EliteSignup.jsx';
import Footer from './components/footer/Footer.jsx';
import BudgetManagement from './components/budget-management/BudgetManagement.jsx';
import Hero from './components/hero/Hero.jsx';
import RetirementSec from './components/retirements/RetirementSec.jsx';
import Retirment from './components/retirements/Retirement.jsx';

export const Home = () => {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <Hero />
        <Budget />
        <Income />
        <Cards />
        <ElitePart />
        <Expenses />
        <OtherDebts />
        <BudgetManagement />
        <RetirementSec />
        <BankRegister />
        <Retirment />
        <Retirment />
        <ThreeCards />
        <EliteSignup />
        <Footer />
      </div>
    </>
  );
};
