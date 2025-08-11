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
    <>
    
    <div className="student-container">
        
      <h1>Student Details</h1>
      <form className="student-form" onSubmit={handleNext}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
        />

        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
        />

        <button type="submit">Next</button>
      </form>
    </div>
    </>
  );
}
