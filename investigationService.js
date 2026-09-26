import api from "./api";

export const getInvestigations = async () => {
  const response = await api.get("/investigations");
  return response.data;
};

export const getInvestigationById = async (id) => {
  const response = await api.get(`/investigations/${id}`);
  return response.data;
};

export const createInvestigation = async (data) => {
  const response = await api.post("/investigations", data);
  return response.data;
};

export const updateInvestigation = async (id, data) => {
  const response = await api.put(`/investigations/${id}`, data);
  return response.data;
};

export const deleteInvestigation = async (id) => {
  const response = await api.delete(`/investigations/${id}`);
  return response.data;
};
