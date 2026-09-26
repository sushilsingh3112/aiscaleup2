import api from "./api";

export const queryRag = async (query, caseId, topK = 4) => {
  const response = await api.post("/aiagent/rag-query", { query, caseId, topK });
  return response.data;
};

export const runMultiAgentWorkflow = async (goal, caseId, focusArea = "All") => {
  const response = await api.post("/aiagent/run-multi-agent-workflow", { goal, caseId, focusArea });
  return response.data;
};

export const queryMcp = async (serverName, query) => {
  const response = await api.post("/aiagent/mcp-query", { serverName, query });
  return response.data;
};

export const getAgentLogs = async () => {
  const response = await api.get("/agentlogs");
  return response.data;
};

export const getAgentMetrics = async () => {
  const response = await api.get("/agentlogs/metrics");
  return response.data;
};
