import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    semester: "",
  });

  const branches = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Biotechnology",
    "Automobile Engineering",
    "Metallurgical Engineering",
    "Production Engineering",
    "Instrumentation Engineering",
  ];

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProjectData = (newData) => {
    const existingData = JSON.parse(localStorage.getItem("projectData")) || {};
    const merged = { ...existingData, ...newData };
    localStorage.setItem("projectData", JSON.stringify(merged));
  };

  const handleNext = (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (!formData[key].trim()) {
        alert(`Please fill ${key}`);
        return;
      }
    }
    saveProjectData({ studentDetails: formData });
    navigate("/professor");
  };

  return (
    <div className="student-container">
      <div className="form-box">
        <div className="form-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
            alt="icon"
            className="form-icon"
          />
          <h1>Student Details</h1>
        </div>

        <form onSubmit={handleNext}>
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Rohit Dhakre"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                placeholder="e.g., 22CS101"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">-- Select Branch --</option>
                {branches.map((branch, idx) => (
                  <option key={idx} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit">Next →</button>
          </div>
        </form>
      </div>
    </div>
  );
}
