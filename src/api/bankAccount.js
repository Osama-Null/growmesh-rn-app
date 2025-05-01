import instance from ".";

// Get bank account info
const getBankAccountInfo = async () => {
  const response = await instance.get("/BankAccount/get-info");
  return response.data;
};

// Deposit to bank account
const depositToBankAccount = async (depositInfo) => {
  const response = await instance.post("/BankAccount/deposit", {
    ...depositInfo,
  });
  return response.data;
};

export { getBankAccountInfo, depositToBankAccount };
