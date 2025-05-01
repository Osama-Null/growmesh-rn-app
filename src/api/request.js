import instance from ".";

// Create a request
const createRequest = async (requestInfo) => {
  const response = await instance.post("/Request/create", { ...requestInfo });
  return response.data;
};

// Get all requests
const getAllRequests = async () => {
  const response = await instance.get("/Request/get-all");
  return response.data;
};

// Get a specific request by ID
const getRequest = async (id) => {
  const response = await instance.get(`/Request/get/${id}`);
  return response.data;
};

// Delete a request
const deleteRequest = async (id) => {
  const response = await instance.delete(`/Request/delete/${id}`);
  return response.data;
};

export { createRequest, getAllRequests, getRequest, deleteRequest };
