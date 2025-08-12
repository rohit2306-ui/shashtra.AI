import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./ProfessorDetails.css";

export default function ProfessorDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
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
    saveProjectData({ professorDetails: formData });
    navigate("/final");
  };

  return (
    <div className="professor-container">
      <h1>Professor Details</h1>
      <form className="professor-form" onSubmit={handleNext}>
        <input
          type="text"
          name="name"
          placeholder="Enter professor name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="designation"
          placeholder="e.g., Associate Professor"
          value={formData.designation}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          style={{ gridColumn: "span 2" }}
        />

        <button type="submit">Generate Final Report</button>
      </form>
    </div>
  );
}
