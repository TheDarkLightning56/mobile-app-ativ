import { authStorage } from "./auth_storage";
import { Roles } from "../model/Roles";


class RolesService {
  private url = "http://192.168.0.108:3030/roles";

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
    const { data } = await this.fetchData("GET", "roles");
    return data;
  }

  public async create(name: string, description: string) {
    const body = { name, description };
    const { data } = await this.fetchData("POST", "roles", body);
    return data;
  }

  public async update(roleId: number, name: string, description: string) {
    const body = { id: roleId, name, description };
    const { data } = await this.fetchData("PUT", `roles/${roleId}`, body);
    return data;
  }

  public async delete(roleId: number) {
    const { data } = await this.fetchData("DELETE", `roles/${roleId}`);
    return data;
  }
}

export const rolesService = new RolesService();