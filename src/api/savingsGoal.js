import instance from ".";

// Create a savings goal
const createSavingsGoal = async (savingsGoalInfo) => {
  const response = await instance.post("/SavingsGoal/create", savingsGoalInfo);
  return response.data;
};

// Create an amount-based savings goal
const createAmountBasedSavingsGoal = async (savingsGoalInfo) => {
  const response = await instance.post(
    "/SavingsGoal/create-amount-based",
    savingsGoalInfo
  );
  return response.data;
};

// Create a time-based savings goal
const createTimeBasedSavingsGoal = async (savingsGoalInfo) => {
  const response = await instance.post(
    "/SavingsGoal/create-time-based",
    savingsGoalInfo
  );
  return response.data;
};

// Get all savings goals details
const getAllSavingsGoals = async () => {
  const response = await instance.get("/SavingsGoal/get-all");
  return response.data;
};

// Get a specific savings goal details by ID
const getSavingsGoal = async (id) => {
  const response = await instance.get(`/SavingsGoal/get/${id}`);
  return response.data;
};

// Update a savings goal
const updateSavingsGoal = async (id, savingsGoalInfo) => {
  const response = await instance.put(
    `/SavingsGoal/update/${id}`,
    savingsGoalInfo
  );
  return response.data;
};

// Delete a savings goal
const deleteSavingsGoal = async (id) => {
  const response = await instance.delete(`/SavingsGoal/delete/${id}`);
  return response.data;
};

// Deposit to a savings goal
const depositToSavingsGoal = async (id, depositInfo) => {
  const response = await instance.post(
    `/SavingsGoal/deposit/${id}`,
    depositInfo
  );
  return response.data;
};

// Withdraw from a savings goal
const withdrawFromSavingsGoal = async (id, withdrawInfo) => {
  const response = await instance.post(
    `/SavingsGoal/withdraw/${id}`,
    withdrawInfo
  );
  return response.data;
};

// Unlock a savings goal
const unlockSavingsGoal = async (id) => {
  const response = await instance.post(`/SavingsGoal/unlock/${id}`);
  return response.data;
};

// Get savings trend
const getSavingsTrend = async (periodType, periods = 7) => {
  const response = await instance.get("/SavingsGoal/get-savings-trend", {
    params: { periodType, periods },
  });
  return response.data;
};

// Mark a savings goal as done
const markSavingsGoalAsDone = async (id) => {
  const response = await instance.post(`/SavingsGoal/mark-as-done/${id}`);
  return response.data;
};

// Get savings trend for a specific goal (NEW FUNCTION)
const getSavingsGoalTrend = async (id, periods = 7) => {
  const response = await instance.get(`/SavingsGoal/get-trend/${id}`, {
    params: { periods },
  });
  return response.data;
};

const getSavingsGoalTransactionTrend = async (id, count = 7) => {
  const response = await instance.get(
    `/SavingsGoal/get-last-transactions-trend/${id}`,
    {
      params: { count },
    }
  );
  return response.data;
};

const homeAgent = async (message) => {
  const response = await instance.post("/SavingsGoal/home-agent", { message });
  return response.data;
};

const allGoalsAgent = async (message) => {
  const response = await instance.post("/SavingsGoal/all-goals-agent", {
    message,
  });
  return response.data;
};

const goalDetailsAgent = async (id, message) => {
  const response = await instance.post(
    `/SavingsGoal/goal-details-agent/${id}`,
    { message }
  );
  return response.data;
};

export {
  createAmountBasedSavingsGoal,
  createTimeBasedSavingsGoal,
  createSavingsGoal,
  getAllSavingsGoals,
  getSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
  depositToSavingsGoal,
  withdrawFromSavingsGoal,
  unlockSavingsGoal,
  getSavingsTrend,
  markSavingsGoalAsDone,
  getSavingsGoalTrend,
  getSavingsGoalTransactionTrend,
  homeAgent,
  allGoalsAgent,
  goalDetailsAgent,
};
