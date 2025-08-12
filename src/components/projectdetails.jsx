import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Typing animation state
  const [typedText, setTypedText] = useState("");
  const fixedString = "Your AI Project Partner — Helping You Build Smarter Reports ..."; 
  const typingSpeed = 50; // milliseconds per letter

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fixedString.length) {
        setTypedText((prev) => prev + fixedString[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const saveProjectData = (newData) => {
    const existingData = JSON.parse(localStorage.getItem("projectData")) || {};
    const merged = { ...existingData, ...newData };
    localStorage.setItem("projectData", JSON.stringify(merged));
  };

  const handleNext = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both Project Title and Description.");
      return;
    }
    saveProjectData({ projectTitle: title, projectDescription: description });
    navigate("/studentdetails");
  };

  return (
    <div className="details-container">
      <main className="details-main">
        <h3 style={{ fontSize: "4rem", fontWeight: "bold", margin: "0 0 10px" }}>
          Welcome to <span style={{ color: "#39c0e0" }}>शास्त्रAI</span>
        </h3>

        {/* 🔹 Auto Typing Text */}
        <p style={{ fontSize: "1.2rem", color: "#4a86abff", minHeight: "30px" }}>
          {typedText}
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="project-form">
          <label>Project Title</label>
          <input
            type="text"
            placeholder="Enter your project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Project Description</label>
          <textarea
            placeholder="Enter a short description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="button" onClick={handleNext} className="next-btn">
            Next
          </button>
        </form>
      </main>
    </div>
  );
}
