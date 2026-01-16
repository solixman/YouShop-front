import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/register`, data);
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

export default authService;
