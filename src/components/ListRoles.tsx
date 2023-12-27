import React from "react";
import { Roles } from "../model/Roles";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rolesService } from "../services/roles_service";

type Props = {
  role: Roles;
};

const ListRoles = ({ role }: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const goToEditRoles = (role: Roles) => {
    navigation.navigate("Roles", { role });
  };

  const removeRoles = (id: number | undefined) => {
    if (id === undefined) {
      Alert.alert("Erro", "ID da permissão inválido");
      return;
    }

    rolesService
      .delete(id)
      .then(() => {
        Alert.alert("Permissão removida!");
        navigation.navigate("Home", { refreshUser: true });
      })
      .catch(() => {
        Alert.alert("Erro ao apagar a permissão");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{role.name}</Text>
      <Text style={styles.subtitle}>{role.description}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => goToEditRoles(role)}
          color="#6059FF"
        />
        <Button
          title="Remove"
          onPress={() => removeRoles(role.id)}
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

export default ListRoles;