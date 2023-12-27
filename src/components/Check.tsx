import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label: string;
  isChecked: boolean;
  onPressCheck: () => void;
}

const Check = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPressCheck} style={styles.checks}>
      <Ionicons
        name={props.isChecked ? "checkbox-outline" : "square-outline"}
        size={24}
        color={props.isChecked ? "blue" : "black"}
      />

      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checks: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Check;