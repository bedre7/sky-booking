import axios, { Axios } from "axios";
import { API_URL } from "@env";

class ApiClient {
  private baseUrl: string;
  private axiosInstance: Axios;

  constructor() {
    this.baseUrl = "http://10.0.2.2:3000";
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // if (response?.data) {
        //   return response.data;
        // }

        return response;
      },
      (error) => {
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }

  get(path: string, accessToken?: string, params?: any) {
    return this.axiosInstance.get(path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
  }

  post(path: string, data?: any, accessToken?: string) {
    return this.axiosInstance.post(path, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  put(path: string, data: any, accessToken?: string) {
    return this.axiosInstance.put(path, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  delete(path: string, accessToken?: string) {
    return this.axiosInstance.delete(path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  patch(path: string, data: any, accessToken?: string) {
    return this.axiosInstance.patch(path, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiClient();
