import instance from ".";

// Get all transactions
const getAllTransactions = async () => {
  const response = await instance.get("/Transaction/get-all");
  return response.data;
};

// Get transactions by savings goal ID
const getTransactionsBySavingsGoal = async (savingsGoalId) => {
  const response = await instance.get(
    `/Transaction/get-by-savings-goal/${savingsGoalId}`
  );
  return response.data;
};

const transactionsAgent = async (message) => {
  const response = await instance.post("/Transaction/transactions-agent", {
    message,
  });
  return response.data;
};

export { getAllTransactions, getTransactionsBySavingsGoal, transactionsAgent };
