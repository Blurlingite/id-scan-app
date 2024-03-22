import React from "react";
import { View, Text, Button } from "react-native";

interface HomeScreenProps {
  navigation: any; // Adjust navigation type when needed
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default HomeScreen;
