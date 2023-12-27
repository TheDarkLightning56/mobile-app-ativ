import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import Input from "../../components/Input";
import Check from "../../components/Check";
import { userService } from "../../services/user_service";
import { rolesService } from "../../services/roles_service";
import styles from "./styles";
import {Roles} from "../../model/Roles"

export default function User() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const params = route.params as any;
  const user = params?.user;
  const fetchUserList = params?.fetchUserList;

  const [name, setName] = useState(user?.name || "");
  const [login, setLogin] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rolesSelected, setRolesSelected] = useState<string[]>([]);
  const [roles, setRoles] = useState<Roles[]>([]);
  const fields = [name, login, password, confirmPassword];

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
      title: user === undefined ? "New User" : "Update User",
    });
  }, [navigation, user]);

  useEffect(() => {
    fetchRolesList(user);
  }, [user]);

  useEffect(() => {
    setRolesSelected(roles.filter(role => role.isChecked).map(role => role.name));
  }, [roles]);

  const fetchRolesList = (user: any) => {
    rolesService
      .list()
      .then(result => {
        const rolesData = result.map((role: any) => ({
          ...role,
          isChecked: user?.roles?.includes(role.name) || false,
        }));
        setRoles(user === undefined ? rolesData : rolesData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCheckRoles = (roleChecked: any) => {
    setRoles(prevRoles =>
      prevRoles.map(role =>
        role.id === roleChecked.id ? { ...role, isChecked: !role.isChecked } : role
      )
    );
  };

  const handleOperation = (action: "create" | "update") => {
    const verifyFields = fields.some(field => field.trim().length === 0);
    if (verifyFields) {
      Alert.alert("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Senha e confirma senha devem ser iguais.");
      return;
    }

    if (rolesSelected.length === 0) {
      Alert.alert("Selecione no mínimo uma permissão");
      return;
    }


let serviceResult;

if (action === "create") {
  serviceResult = userService.create(name, login, password, rolesSelected);
} else {
  serviceResult = userService.update({
    id: user.id,
    name,
    username: login,
    password,
    roles: rolesSelected,
  });
}

serviceResult
  .then(() => {
    const successMessage = action === "create" ? "Usuário cadastrado com sucesso!" : "Usuário atualizado com sucesso!";
    Alert.alert(successMessage);
    navigation.navigate("Home", { refreshUser: true });
  })
  .catch(() => {
    const errorMessage = action === "create" ? "Ocorreu um erro no cadastro." : "Ocorreu um erro na atualização.";
    Alert.alert(errorMessage);
  });
  };

  return (
    <View style={styles.container}>
      <Input label="Name" value={name} onChangeText={setName} style={styles.input} />
      <Input label="Login" value={login} onChangeText={setLogin} editable={!user} style={styles.input} />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Input label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />

      {roles.map(role => (
        <Check
          key={role.id}
          label={role.name}
          onPressCheck={() => handleCheckRoles(role)}
          isChecked={role.isChecked}
        />
      ))}

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => handleOperation(user ? "update" : "create")} style={styles.userButton}>
          <Text style={styles.buttonText}>
            {user === undefined ? "Register" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}