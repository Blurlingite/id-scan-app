import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigationTypes";
import axios from "axios";
import { my_ip_address } from "../../ipAddress";
import formatTime from "../utils/formatTime";
import Course from "../types/course";

type StudentProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "StudentProfileScreen"
>;

type Props = {
  route: any;
};

interface Student {
  user: {
    student_id: string
    first_name: string;
    last_name: string;
    email: string;
  };
}

const handleGenerateNfcCode = () => {
  Alert.alert("NFC Code Generated", "Your NFC code is XXXX-XXXX-XXXX-XXXX");
};

const StudentProfileScreen: React.FC<Props> = ({ route }) => {

  const [courses, setCourses] = useState([]);

  // Use optional chaining to safely access nested properties
  const student: Student | undefined = route?.params?.student;

  const student_id = student?.user?.student_id

  console.log("student_id:", student_id);

  useEffect(() => {

    const getCourses = async () => {
     try {
        const response = await axios.get(
          `http://${my_ip_address}:3000/professor_course_student_routes/courses/${student_id}`
        );

        setCourses(response.data);

        console.log("COURSES:", response.data);

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
}, [student_id]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome,{" "}
          {student ? student.user.first_name : "Unknown"}!
        </Text>


        {courses.length > 0 ? (
  courses.map((course: Course, index) => (
    <View key={index} style={{ marginBottom: 10 }}>
      <TouchableOpacity key={index} style={styles.courseContainer}>
        <Text>Course Code: {course.course_code}</Text>
        <Text>Course Name: {course.course_name}</Text>
        <Text>Start Time: {course.start_time}</Text>
        <Text>End Time: {course.end_time}</Text>
      </TouchableOpacity>
    </View>
  ))
) : (
  <Text>No courses found.</Text>
)}



        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText} onPress={(handleGenerateNfcCode)}
>Generate NFC Code</Text>
        </TouchableOpacity>
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
  container: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  courseContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ADD8E6", // Light blue background color
  },
  courseCode: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default StudentProfileScreen;