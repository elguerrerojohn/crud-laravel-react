import axios, { AxiosInstance } from "axios";

/**
 * Cliente HTTP con Axios + Bearer token.
 */
class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string | null) {
    this.token = token;
  }

  get(url: string, params?: unknown) {
    return this.client.get(url, { params });
  }

  post(url: string, data?: unknown) {
    return this.client.post(url, data);
  }

  put(url: string, data?: unknown) {
    return this.client.put(url, data);
  }

  patch(url: string, data?: unknown) {
    return this.client.patch(url, data);
  }

  delete(url: string) {
    return this.client.delete(url);
  }
}

export const api = new ApiClient();
