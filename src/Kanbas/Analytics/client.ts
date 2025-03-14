import axios from "axios";
import {USERS_API} from "../Account/client";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ANALYTICS_API = `${REMOTE_SERVER}/api/user`;

export const findCourseGrades = async (userId: string, userRole: string,  courseId: string)=> {
  // const { data } = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/${userRole}/analytics/${courseId}`);
  const data = [
    { name: "Quiz 1", grade: 100, type: "submitted" },
    { name: "Quiz 2", grade: 85, type: "submitted" },
    { name: "Quiz 3", grade: 100, type: "submitted" },
    { name: "Quiz 4", grade: 90, type: "submitted" },
    { name: "Quiz 5", grade: 100, type: "submitted" },
    { name: "Quiz 6", grade: 100, type: "submitted" },
    { name: "Quiz 7", grade: 0, type: "missing" },
    { name: "Quiz 8", grade: 0, type: "missing" },
    { name: "Quiz 9", grade: 0, type: "missing" },
    { name: "Quiz 10", grade: 0, type: "missing" },
  ];
  return data;
}

export const findCourseAverageGrades = async (userId: string, userRole: string,  courseId: string)=> {
  // const { data } = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/${userRole}/analytics/${courseId}/average`);
  const data = 93;
  return data;
}

export const fetchActivityData = async (userId: string, userRole: string,  dateRange: string, countType: string)=> {
  // const { data } = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/${userRole}/analytics/${dateRange}/${countType}`);
  const data = [
    { name: "DB101", count: 5 },
    { name: "DB102", count: 10 },
    { name: "DB103", count: 3 },
    { name: "DB104", count: 1 },
    { name: "DB105", count: 1 },
  ];
  return data;
}

export const fetchCommunicationData = async (userId: string)=> {
  // const {data} = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/communication`);
  const data = [
    { name: "User A", count: 7, role: "STUDENT" },
    { name: "User B", count: 2, role: "STUDENT" },
    { name: "User C", count: 1, role: "FACULTY" },
    { name: "User D", count: 4, role: "STUDENT" },
    { name: "User E", count: 2, role: "FACULTY" },
  ];
  return data;
}

export const fetchAIResponse = async (userId: string, inputText: string) => {
  // const response = await axiosWithCredentials.post(`${ANALYTICS_API}/${userId}/AICustom`, inputText);
  // Function to simulate delay
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Simulate a delay (e.g., 2 seconds)
  await sleep(2000);
  const response = "Customer Name: CHARES\n" +
    "Customer No: 1111\n" +
    "ZIP Code: 67226\n" +
    "Taken By: JOHNS\n" +
    "Received on: 1995-01-12\n" +
    "Shipped on: 1995-01-15\n" +
    "Part No: 10601\n" +
    "Part Name: Sleep Beauty\n" +
    "Quantity: 4\n" +
    "Price: 24.99\n" +
    "Sum: 99.96\n" +
    " \n" +
    "Total Amount: 99.96"
  return response;
}
