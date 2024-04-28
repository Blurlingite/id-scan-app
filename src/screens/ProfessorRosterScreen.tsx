import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Course from "../types/course";
import Student from "../types/student";
import { my_ip_address } from "../../ipAddress";



const ProfessorRosterScreen = ({ route }: any) => {
    const [students, setStudents] = useState([]);

    const course_code = route.params.course.course_code;

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(
                    `http://${my_ip_address}:3000/professor_course_student_routes/course/students/${course_code}`
                );
                setStudents(response.data.students);
                console.log("Server Response:", response.data);
            } catch (error: any) {
                if (error.response) {
                    console.error("Response status:", error.response.status);
                    console.error("Response data:", error.response.data);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error:", error.message);
                }
            }
        };

        getCourses();
    }, [course_code]);

    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                {students.map((student: Student, index) => (
                    <TouchableOpacity key={index} style={styles.studentContainer}>
                        <Text>Student ID: {student.student_id}</Text>
                        <Text>Name: {student.last_name}{", "}{student.first_name}</Text>
                        <Text>Email: {student.email}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        alignItems: "center",   // Align items in the center of the 'contentContainer'
        justifyContent: "flex-start",  // Items align from the top down
        padding: 20,   // Add some padding around the children
    },
    studentContainer: {
        width: '100%', // Ensure each item is the full width of the container
        minHeight: 80, // Minimum height for each item
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "lightgrey",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#ADD8E6", // Light blue background color
        justifyContent: 'center', // Center content vertically within the container
    },
});

export default ProfessorRosterScreen;