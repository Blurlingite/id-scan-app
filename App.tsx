import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import StudentLoginScreen from "./src/screens/StudentLoginScreen";
import ProfessorLoginScreen from "./src/screens/ProfessorLoginScreen";
import StudentRegisterScreen from "./src/screens/StudentRegisterScreen";
import ProfessorRegisterScreen from "./src/screens/ProfessorRegisterScreen";
import { RootStackParamList } from "./src/types/navigationTypes";
import StudentProfileScreen from "./src/screens/StudentProfileScreen";
// import { createNFCTokenFromDatabase } from "./NFC";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // useEffect(() => {
  //   createNFCTokenFromDatabase();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
        <Stack.Screen name="ProfessorLogin" component={ProfessorLoginScreen} />
        <Stack.Screen
          name="StudentRegisterScreen"
          component={StudentRegisterScreen}
        />
        <Stack.Screen
          name="ProfessorRegisterScreen"
          component={ProfessorRegisterScreen}
        />
        <Stack.Screen
          name="StudentProfileScreen"
          component={StudentProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;