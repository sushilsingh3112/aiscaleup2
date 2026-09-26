import api from "./api";

export const getFindings = async (category, search, caseId) => {
  const params = {};
  if (category) params.category = category;
  if (search) params.search = search;
  if (caseId) params.caseId = caseId;
  const response = await api.get("/findings", { params });
  return response.data;
};

export const createFinding = async (data) => {
  const response = await api.post("/findings", data);
  return response.data;
};

export const updateFinding = async (id, data) => {
  const response = await api.put(`/findings/${id}`, data);
  return response.data;
};

export const deleteFinding = async (id) => {
  const response = await api.delete(`/findings/${id}`);
  return response.data;
};
