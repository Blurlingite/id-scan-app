import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { RootStackParamList } from "./src/types/navigationTypes";
import SQLite from "react-native-sqlite-storage";

const Stack = createStackNavigator<RootStackParamList>();

// useEffect(() => {
//   //function for creating the nfc token from database
//   const createNfcTokenFromDatabase = () => {
//     SQLite.openDatabase(
//       { name: "databaseName.db", location: "default" },
//       //searching the database to get the user data
//       (db) => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             "SELECT user_data From nfc_data",
//             [],
//             (_, { rows }) => {
//               const { _array } = rows;
//               _array.forEach((row: { user_data: string }) => {
//                 const { user_data } = row;
//                 createNfcToken(user_data);
//               });
//             },
//             (error) => {
//               console.error("Cannot connect to database", error);
//             }
//           );
//         });
//       },
//       (error) => {
//         console.error("Cannot open database", error);
//       }
//     );
//   };
//   // nfc creation
//   createNfcTokenFromDatabase();
// }, []);

// creating nfc token
const createNfcToken = (userData: string) => {
  // to do : nfc creator
};
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
