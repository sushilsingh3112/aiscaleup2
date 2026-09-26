import api from "./api";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post("/auth/change-password", data);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};

export const updateUserRole = async (data) => {
  const response = await api.put("/auth/update-role", data);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
