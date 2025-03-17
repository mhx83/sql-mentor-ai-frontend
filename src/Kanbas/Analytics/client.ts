import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ANALYTICS_API = `${REMOTE_SERVER}/api/user`;

/**
 * Fetch the grades for a specific course based on the user's role.
 *
 * Backend Implementation Guide:
 * - If `userRole === "STUDENT"`:
 *   - Query the database to retrieve all quizzes for the specified `courseId` that the student has attempted.
 *   - If a quiz has been attempted, return its grade with `type: "submitted"`.
 *   - If a quiz has not been attempted, return it with `grade: 0` and `type: "missing"`.
 * - If `userRole === "FACULTY"`:
 *   - Query the database for all students enrolled in the course.
 *   - Calculate the average grade of all submitted quizzes for each student.
 *   - Return each student's name with their average grade and `type: "submitted"`.
 */
export const findCourseGrades = async (userId: string, userRole: string, courseId: string) => {
  // const { data } = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/${userRole}/analytics/${courseId}`);

  // Sample Returned Data
  let data;
  if (userRole === "STUDENT") {
    data = [
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
  } else {
    data = [
      { name: "Student 1", grade: 70.3, type: "submitted" },
      { name: "Student 2", grade: 85.4, type: "submitted" },
      { name: "Student 3", grade: 90.2, type: "submitted" },
      { name: "Student 4", grade: 87.4, type: "submitted" },
      { name: "Student 5", grade: 93, type: "submitted" },
      { name: "Student 6", grade: 67, type: "submitted" },
      { name: "Student 7", grade: 75.5, type: "submitted" },
      { name: "Student 8", grade: 75.1, type: "submitted" },
      { name: "Student 9", grade: 82.3, type: "submitted" },
      { name: "Student 10", grade: 97.2, type: "submitted" },
    ];
  }
  return data;
};


/**
 * Fetch activity analytics based on date range and count type.
 *
 * Backend Implementation Guide:
 * - If `userRole === "STUDENT"`:
 *   - Retrieve the count of activities (`TotalAttempts` or `CompletedQuizzes`) for each course the student is enrolled in.
 * - If `userRole === "FACULTY"`:
 *   - Retrieve the total count of activities (`TotalAttempts` or `CompletedQuizzes`) for each student in the specified date range.
 * - The `dateRange` parameter can only be "Weekly" or "Monthly":
 *   - "Weekly" should return data for the past **7 days** (from the current date).
 *   - "Monthly" should return data for the past **30 days** (from the current date).
 * - Ensure that activities are filtered based on their timestamps to match the requested range.
 */
export const fetchActivityData = async (userId: string, userRole: string, dateRange: string, countType: string) => {
  // const { data } = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/${userRole}/analytics/${dateRange}/${countType}`);

  // Sample Returned Data
  let data;
  if (userRole === "STUDENT") {
    data = [
      { name: "DB101", count: 5 },
      { name: "DB102", count: 10 },
      { name: "DB103", count: 3 },
      { name: "DB104", count: 1 },
      { name: "DB105", count: 1 },
    ];
  } else {
    data = [
      { name: "Student 1", count: 24 },
      { name: "Student 2", count: 30 },
      { name: "Student 3", count: 18 },
      { name: "Student 4", count: 54 },
      { name: "Student 5", count: 29 },
    ];
  }
  return data;
};


/**
 * Fetch user communication interactions.
 *
 * Backend Implementation Guide:
 * - Query the database for the communication history of the specified `userId`.
 * - Return a list of users the given user has interacted with, along with the number of interactions and their roles.
 */
export const fetchCommunicationData = async (userId: string) => {
  // const {data} = await axiosWithCredentials.get(`${ANALYTICS_API}/${userId}/communication`);

  // Sample Returned Data
  const data = [
    { name: "User A", count: 7, role: "STUDENT" },
    { name: "User B", count: 2, role: "STUDENT" },
    { name: "User C", count: 1, role: "FACULTY" },
    { name: "User D", count: 4, role: "STUDENT" },
    { name: "User E", count: 2, role: "FACULTY" },
  ];
  return data;
};


/**
 * Fetch AI-generated response based on the user query.
 *
 * Backend Implementation Guide:
 * - Accept `userId` and `inputText` as parameters.
 * - Query an AI processing service or NLP model for a response based on the `inputText`.
 * - Return the AI-generated response as a string.
 */
export const fetchAIResponse = async (userId: string, inputText: string) => {
  // const response = await axiosWithCredentials.post(`${ANALYTICS_API}/${userId}/AICustom`, inputText);

  // Sample Returned Data
  const response =
    "Customer Name: CHARES\n" +
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
    "\n" +
    "Total Amount: 99.96";

  return response;
};
