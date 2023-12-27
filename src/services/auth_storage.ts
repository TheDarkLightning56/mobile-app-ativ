import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../model/User";

class AuthStorage {
  private static readonly KEY = "@AUTH:LOGGED_USER";

  async getLoggedUser(): Promise<User | null> {
    try {
      const json = await AsyncStorage.getItem(AuthStorage.KEY);
      return json ? JSON.parse(json) as User : null;
    } catch (error) {
      console.error("Erro ao obter usuário logado:", error);
      return null;
    }
  }

  async setLoggedUser(user: User): Promise<void> {
    try {
      const json = JSON.stringify(user);
      await AsyncStorage.setItem(AuthStorage.KEY, json);
    } catch (error) {
      console.error("Erro ao definir usuário logado:", error);
    }
  }

  async removeLoggedUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AuthStorage.KEY);
    } catch (error) {
      console.error("Erro ao remover usuário logado:", error);
    }
  }
}

export const authStorage = new AuthStorage();