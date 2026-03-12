const API_BASE = "/api";

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && token) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
      const retry = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });
      return retry.json();
    }
  }

  return res.json();
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("access_token", data.data.access_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export const api = {
  get: <T = any>(endpoint: string) => request<T>(endpoint),

  post: <T = any>(endpoint: string, body: any) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T = any>(endpoint: string, body: any) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  // Auth helpers
  auth: {
    register: (name: string, email: string, password: string) =>
      api.post("/auth/register", { name, email, password }),

    login: async (email: string, password: string) => {
      const res = await api.post("/auth/login", { email, password });
      if (res.success) {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
      }
      return res;
    },

    logout: async () => {
      const refreshToken = localStorage.getItem("refresh_token");
      const res = await api.post("/auth/logout", {
        refresh_token: refreshToken,
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return res;
    },

    me: () => api.get("/auth/me"),

    updateProfile: (data: any) => api.put("/auth/profile", data),

    changePassword: (currentPassword: string, newPassword: string) =>
      api.put("/auth/password", {
        current_password: currentPassword,
        new_password: newPassword,
      }),
  },

  // AI endpoints
  ai: {
    demandPrediction: (data: any) => api.post("/ai/demand-prediction", data),
    demandHistory: () => api.get("/ai/demand-prediction/history"),

    renewableForecast: (data: any) => api.post("/ai/renewable-forecast", data),
    renewableHistory: () => api.get("/ai/renewable-forecast/history"),

    gridOptimize: (data: any) => api.post("/ai/grid-optimize", data),
    gridOptimizeHistory: () => api.get("/ai/grid-optimize/history"),

    failurePredict: (data: any) => api.post("/ai/failure-predict", data),
    failureHistory: () => api.get("/ai/failure-predict/history"),

    loadBalance: (data: any) => api.post("/ai/load-balance", data),
    loadBalanceHistory: () => api.get("/ai/load-balance/history"),
  },

  // Dashboard
  dashboard: {
    gridStatus: () => api.get("/dashboard/grid-status"),
    overview: () => api.get("/dashboard/overview"),
    consumer: () => api.get("/dashboard/consumer"),
  },

  // Alerts
  alerts: {
    getAll: () => api.get("/alerts"),
    action: (alertId: string, action: string) =>
      api.post("/alerts/action", { alert_id: alertId, action }),
  },

  // Storage
  storage: {
    getAll: () => api.get("/storage"),
    getUnit: (unitId: string) => api.get(`/storage/${unitId}`),
    command: (unitId: string, command: string, targetLevel?: number) =>
      api.post("/storage/command", {
        unit_id: unitId,
        command,
        target_level_percent: targetLevel,
      }),
  },

  // Settings
  settings: {
    getGrid: () => api.get("/settings/grid"),
    updateGrid: (data: any) => api.put("/settings/grid", data),
    getConsumer: () => api.get("/settings/consumer"),
    updateConsumer: (data: any) => api.put("/settings/consumer", data),
  },

  // Consumer
  consumer: {
    reliability: () => api.get("/consumer/reliability"),
    usageAnalytics: () => api.get("/consumer/usage-analytics"),
    community: () => api.get("/consumer/community"),
    joinChallenge: (challengeId: string) =>
      api.post("/consumer/community/join-challenge", { challenge_id: challengeId }),
    leaveChallenge: (challengeId: string) =>
      api.post("/consumer/community/leave-challenge", { challenge_id: challengeId }),
  },

  // Data Export
  export: {
    download: (format: string, collection: string, days: number = 30) =>
      api.post("/export", { format, collection, days }),
  },
};
