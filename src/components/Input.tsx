import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TextInputProps,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
}

const Input = (props: Props) => {
  return (
    <View style={styles.inputView}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: Dimensions.get("screen").width - 40,
    borderColor: "#ccc",
  },
});

export default Input;