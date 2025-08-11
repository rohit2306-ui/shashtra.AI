import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

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
      <header className="details-header">
        <h2>Project Details</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="details-main">
         <h3 style={{ fontSize: "4rem", fontWeight: "bold", margin: "0 0 10px" }}>
        Welcome to <span style={{ color: "#39c0e0" }}>शास्त्रAI</span>
      </h3>
        {/* <h2>{auth.currentUser?.displayName}</h2> */}
        {/* <p>{auth.currentUser?.email}</p> */}

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
