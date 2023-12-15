import ApiService from "./api.service";

export interface ISignUpBody {
  email: string;
  username: string;
  password: string;
}

export interface ILogInBody {
  email: string;
  password: string;
}

class AuthService {
  signup = (body: ISignUpBody) => ApiService.post("/auth/signup", body);
  login = (body: ILogInBody) => ApiService.post("/auth/login", body);
  logout = () => ApiService.post("/auth/logout");
  refresh = () => ApiService.post("/auth/refresh");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
