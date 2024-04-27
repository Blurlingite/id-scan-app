import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";


type ProfessorProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProfessorProfileScreen"
>;

type Props = {
  route: any;
};

interface Professor {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const ProfessorProfileScreen: React.FC<Props> = ({ route }) => {

    // Use optional chaining to safely access nested properties
    const professor: Professor | undefined = route?.params?.professor;


    // console.log("professor: ")
    // console.log(professor)

    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Welcome,{" "}
            {professor ? professor.user.first_name : "Unknown"}!
          </Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },
    container: {
      width: "80%",
      height: "60%",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 20,
      marginBottom: 20,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#007BFF",
      padding: 10,
      width: "100%",
      marginTop: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
  });

export default ProfessorProfileScreen;