import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProjectDetails from "./components/projectdetails";
import StudentDetails from "./components/studentdetails";
import ProfessorDetails from "./components/professordetails";
import ProjectReport from "./components/projectreport";
import ErrorBoundary from "./components/ErrorBoundary";
import ReportEditor from "./components/Reporteditor";


export default function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projectdetails" element={<ProjectDetails/>} />
        <Route path="/studentdetails" element={<StudentDetails/>} />
        <Route path="/professor" element={<ProfessorDetails/>} />
        
        <Route path="/final" element={<ProjectReport/>} />
        <Route path="/reporteditor" element={<ReportEditor />} />
     
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}
