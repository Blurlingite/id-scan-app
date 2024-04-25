import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import { my_ip_address } from '../../ipAddress';


type StudentLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface StudentLoginScreenProps {
  navigation: StudentLoginScreenNavigationProp;
}

const StudentRegisterScreen: React.FC<StudentLoginScreenProps> = ({navigation}) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async () => {
      // Check if any required fields are empty
  if (!first_name || !last_name || !email || !password) {
    Alert.alert("Missing Information", "Please fill in all required fields.");
    return;
  }
    try {
      const response = await axios.post(
        `http://${my_ip_address}:3000/students/register`,
        {
          first_name,
          last_name,
          email,
          password,
        }
      );
      console.log("Registration Successful:", response.data);
      navigation.navigate('Home');

    } catch (error: any) {
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={first_name}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={last_name}
        onChangeText={(text) => setLastName(text)}
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
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default StudentRegisterScreen;
