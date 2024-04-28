import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { my_ip_address } from "../../ipAddress";
import axios from "axios";

type ProfessorLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface ProfessorLoginScreenProps {
  navigation: ProfessorLoginScreenNavigationProp;
}

const ProfessorLoginScreen: React.FC<ProfessorLoginScreenProps> = ({
  navigation,
}) => {

  const [professor_id, setProfessor_id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://${my_ip_address}:3000/professors/login`,
        { professor_id, email, password } // Include email parameter in the request body
      );

      const professor = response.data;

      navigation.navigate("ProfessorProfileScreen", { professor, navigation } as any);

      console.log("Server Response:", response.data);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error:", error.message);
      }
    }
  };

  const handleForgotPassword = () => {
    // Put forgot password logic here
    console.log("Forgot Password clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professor Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Professor ID"
        value={professor_id}
        onChangeText={(text) => setProfessor_id(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Professor Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Username/Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPasswordText: {
    color: "blue",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default ProfessorLoginScreen;
