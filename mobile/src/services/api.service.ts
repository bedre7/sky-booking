import axios, { Axios } from "axios";
import { API_URL } from "@env";

class ApiService {
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
        console.log("error", error);
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      },
    );
  }

  get(path: string, accessToken?: string) {
    return this.axiosInstance.get(path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  post(path: string, data?: any, accessToken?: string) {
    // console.log("path", path, API_URL);
    //send request to server with credentials
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
export default new ApiService();
