import axios from "./axios";

export const getBankAccountNames = async () => {
  const res = await axios.get("/api/bank-accounts/name");

  return res.data;
};

export const getBankAccountTransactions = async () => {
  const res = await axios.get("/api/bank-accounts/transaction");

  return res.data;
};

export const getDebts = async () => {
  const res = await axios.get("/api/debt");

  return res.data;
};

export const getExpenses = async () => {
  const res = await axios.get("/api/expenses");

  return res.data;
};

export const getExtraFundsTrackers = async () => {
  const res = await axios.get("/api/extra-funds-tracker");

  return res.data;
};

export const getIncomes = async () => {
  const res = await axios.get("/api/income");

  return res.data;
};

export const getJointSplits = async () => {
  const res = await axios.get("/api/joint-split");

  return res.data;
};

export const getSavings = async () => {
  const res = await axios.get("/api/savings-retirements?type=Savings");

  return res.data;
};

export const getRetirements = async () => {
  const res = await axios.get("/api/savings-retirements?type=Retirements");

  return res.data;
};
