import React, { useState, useEffect } from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { rolesService } from "../../services/roles_service";
import Input from "../../components/Input";

export default function Roles() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const params = route.params as any;
  const roles = params ? params.roles : undefined;

  const [name, setName] = useState(roles ? roles.name : "");
  const [description, setDescription] = useState(roles ? roles.description : "");
  const isCreatingNewRole = roles === undefined;

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#AD8BFF",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        marginLeft: 10,
      },
      headerRightContainerStyle: {
        marginRight: 10,
      },
      title: isCreatingNewRole ? "New Role" : "Update Role",
    });
  }, [navigation, isCreatingNewRole]);

  const handleOperation = () => {
    if (name.trim() === "" || description.trim() === "") {
      Alert.alert("Todos os campos são obrigatórios.");
      return;
    }

    if (isCreatingNewRole) {
      rolesService
        .create(name, description)
        .then(() => {
          Alert.alert("Permissão cadastrada com sucesso!");
          navigation.navigate("Home", { refreshRoles: true });
        })
        .catch(() => {
          Alert.alert("Ocorreu um erro no cadastro.");
        });
    } else {
      rolesService
        .update(roles.id, name, description)
        .then(() => {
          Alert.alert("Permissão atualizada com sucesso!");
          navigation.navigate("Home", { refreshRoles: true });
        })
        .catch(() => {
          Alert.alert("Ocorreu um erro na atualização.");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Input label="Name" value={name} onChangeText={setName} style={styles.input} />
      <Input label="Description" value={description} onChangeText={setDescription} style={styles.input} />

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleOperation} style={styles.rolesButton}>
          <Text style={styles.buttonText}>
            {isCreatingNewRole ? "Register" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}