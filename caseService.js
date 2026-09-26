import api from "./api";

export const getCases = async (status, priority) => {
  const params = {};
  if (status) params.status = status;
  if (priority) params.priority = priority;
  const response = await api.get("/cases", { params });
  return response.data;
};

export const getCaseById = async (id) => {
  const response = await api.get(`/cases/${id}`);
  return response.data;
};

export const createCase = async (data) => {
  const response = await api.post("/cases", data);
  return response.data;
};

export const updateCase = async (id, data) => {
  const response = await api.put(`/cases/${id}`, data);
  return response.data;
};

export const assignCase = async (id, assignedTo) => {
  const response = await api.post(`/cases/${id}/assign`, { assignedTo });
  return response.data;
};

export const closeCase = async (id) => {
  const response = await api.post(`/cases/${id}/close`);
  return response.data;
};

export const deleteCase = async (id) => {
  const response = await api.delete(`/cases/${id}`);
  return response.data;
};
