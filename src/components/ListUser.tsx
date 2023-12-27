import React from "react";
import { User } from "../model/User";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userService } from "../services/user_service";

type Props = {
  user: User;
};

const ListUser = ({ user }: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const goToEditUser = (user: User) => {
    navigation.navigate("User", { user });
  };

  const removeUser = (id: number | undefined) => {
    if (id === undefined) {
      Alert.alert("Erro", "ID do usuário inválido");
      return;
    }

    userService
      .delete(id)
      .then(() => {
        Alert.alert("Usuário removido!");
        navigation.navigate("Home", { refreshUser: true });
      })
      .catch(() => {
        Alert.alert("Erro ao apagar o usuário");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{user.username}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => goToEditUser(user)}
          color="#6059FF"
        />
        <Button
          title="Remove"
          onPress={() => removeUser(user.id)}
          color="#FF3D3D"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default ListUser;