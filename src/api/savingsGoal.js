import instance from ".";

// Create a savings goal
const createSavingsGoal = async (savingsGoalInfo) => {
  const response = await instance.post("/SavingsGoal/create", { ...savingsGoalInfo });
  return response.data;
};

// Get all savings goals
const getAllSavingsGoals = async () => {
  const response = await instance.get("/SavingsGoal/get-all");
  return response.data;
};

// Get a specific savings goal by ID
const getSavingsGoal = async (id) => {
  const response = await instance.get(`/SavingsGoal/get/${id}`);
  return response.data;
  console.log(response?.data);
  
};

// Update a savings goal
const updateSavingsGoal = async (id, savingsGoalInfo) => {
  const response = await instance.put(`/SavingsGoal/update/${id}`, { ...savingsGoalInfo });
  return response.data;
};

// Delete a savings goal
const deleteSavingsGoal = async (id) => {
  const response = await instance.delete(`/SavingsGoal/delete/${id}`);
  return response.data;
};

// Deposit to a savings goal
const depositToSavingsGoal = async (id, depositInfo) => {
  const response = await instance.post(`/SavingsGoal/deposit/${id}`, { ...depositInfo });
  return response.data;
};

// Withdraw from a savings goal
const withdrawFromSavingsGoal = async (id, withdrawInfo) => {
  const response = await instance.post(`/SavingsGoal/withdraw/${id}`, { ...withdrawInfo });
  return response.data;
};

// Unlock a savings goal
const unlockSavingsGoal = async (id) => {
  const response = await instance.post(`/SavingsGoal/unlock/${id}`);
  return response.data;
};

export {
  createSavingsGoal,
  getAllSavingsGoals,
  getSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
  depositToSavingsGoal,
  withdrawFromSavingsGoal,
  unlockSavingsGoal,
};