import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
import ChooseUser from "./pages/ChooseUser";
import ChatBot from "react-simple-chatbot";

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  const steps = [
    {
      id: "0",
      message: "Howdy! What's your name?",
      trigger: "1",
    },
    {
      id: "1",
      user: true,
      trigger: "2",
    },
    {
      id: "2",
      message: "Hi {previousValue}, how can I assist you today?",
      trigger: "3",
    },
    {
      id: "3",
      options: [
        { value: 1, label: "View Courses", trigger: "4" },
        { value: 2, label: "Read Articles", trigger: "5" },
        { value: 3, label: "Contact Support", trigger: "6" },
      ],
    },
    {
      id: "4",
      message: "Here are the available courses: [Course 1, Course 2, Course 3]",
      trigger: "7",
    },
    {
      id: "5",
      message:
        "Here are some articles you might find interesting: [Article 1, Article 2]",
      trigger: "7",
    },
    {
      id: "6",
      message: "Please contact support at support@example.com.",
      trigger: "7",
    },
    {
      id: "7",
      message: "Is there anything else I can help you with?",
      trigger: "8",
    },
    {
      id: "8",
      options: [
        { value: 1, label: "Yes", trigger: "3" },
        { value: 2, label: "No", trigger: "9" },
      ],
    },
    {
      id: "9",
      options: [{ value: 1, label: "Start Over?", trigger: "0" }],
    },
  ];

  const config = {
    floating: true,
  };

  return (
    <>
      <ChatBot steps={steps} {...config} />
      <Router>
        {currentRole === null && (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route
              path="/chooseasguest"
              element={<ChooseUser visitor="guest" />}
            />

            <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
            <Route
              path="/Studentlogin"
              element={<LoginPage role="Student" />}
            />
            <Route
              path="/Teacherlogin"
              element={<LoginPage role="Teacher" />}
            />

            <Route path="/Adminregister" element={<AdminRegisterPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}

        {currentRole === "Admin" && (
          <>
            <AdminDashboard />
          </>
        )}

        {currentRole === "Student" && (
          <>
            <StudentDashboard />
          </>
        )}

        {currentRole === "Teacher" && (
          <>
            <TeacherDashboard />
          </>
        )}
      </Router>
    </>
  );
};

export default App;
