import api from "./api";

export const getReports = async (caseId) => {
  const params = caseId ? { caseId } : {};
  const response = await api.get("/reports", { params });
  return response.data;
};

export const createReport = async (data) => {
  const response = await api.post("/reports", data);
  return response.data;
};

export const exportPdfReport = async (id, reportName) => {
  const response = await api.get(`/reports/${id}/export-pdf`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${reportName || "Executive_Report"}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportWordReport = async (id, reportName) => {
  const response = await api.get(`/reports/${id}/export-word`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/msword" }));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${reportName || "Executive_Report"}.doc`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};
