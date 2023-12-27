import { authStorage } from "./auth_storage";
import { User } from "../model/User";

class UserService {
  private url = "http://192.168.0.108:3030/users";

  private async fetchData(method: string, endpoint: string, body?: any) {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is Null");

    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.url}/${endpoint}`, requestOptions);
    const data = await response.json();

    if (response.status === 401) {
      throw new Error(data.message);
    }

    return { response, data };
  }

  public async list() {
    const { data } = await this.fetchData("GET", "users");
    return data;
  }

  public async create(name: string, username: string, password: string, roles: string[]) {
    const body = { name, username, password, roles };
    const { data } = await this.fetchData("POST", "users", body);
    return data;
  }

  public async update(user: User) {
    const { data } = await this.fetchData("PUT", `users/${user.id}`, user);
    return data;
  }

  public async delete(id: number | undefined) {
    const { data } = await this.fetchData("DELETE", `users/${id}`, { id });
    return data;
  }
}

export const userService = new UserService();