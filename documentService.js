import api from "./api";

export const getDocuments = async (caseId) => {
  const params = caseId ? { caseId } : {};
  const response = await api.get("/documents", { params });
  return response.data;
};

export const uploadDocument = async (formData) => {
  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const downloadDocument = async (id, fileName) => {
  const response = await api.get(`/documents/download/${id}`, {
    responseType: "blob",
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName || `Document_${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};
