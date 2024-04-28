import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { my_ip_address } from "../../ipAddress";
import formatTime from "../utils/formatTime";

type ProfessorProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProfessorProfileScreen"
>;

type Props = {
  route: any;
};

interface Professor {
  user: {
    professor_id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface Course {
  course_code: string;
  course_name: string;
  start_time: string;
  end_time: string;
  professor_id: number;
}

const ProfessorProfileScreen: React.FC<Props> = ({ route }) => {

    const [courses, setCourses] = useState([]);

    const professor: Professor | undefined = route?.params?.professor;
    
    const professor_id = professor?.user?.professor_id

    useEffect(() => {

      const getCourses = async () => {
       try {
          const response = await axios.get(
            `http://${my_ip_address}:3000/courses/${professor_id}`
          );
  
          setCourses(response.data);
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

    getCourses();
  }, [professor_id]);

    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Welcome,{" "}
            {professor ? professor.user.first_name : "Unknown"}!
          </Text>
          {courses.map((course: Course, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>Course Code: {course.course_code}</Text>
          <Text>Course Name: {course.course_name}</Text>
          <Text>Start Time: {formatTime(course.start_time)}</Text>
          <Text>End Time: {formatTime(course.end_time)}</Text>
        </View>
      ))}

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
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  course: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ProfessorProfileScreen;
