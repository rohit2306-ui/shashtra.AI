import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from "react-router-dom";

export default function ProjectReport() {
  const [projectData, setProjectData] = useState(null);
  const [reportContent, setReportContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("projectData"));
    if (!data) {
      setError("No project data found. Please complete all steps.");
      return;
    }
    if (!data.projectTitle || !data.studentDetails || !data.professorDetails) {
      setError("Incomplete data. Please complete all steps.");
      return;
    }
    setProjectData(data);
    generateReportWithGemini(data);
  }, []);

  const generateReportWithGemini = async (data) => {
    setLoading(true);
    setError("");
    setProgressMessage("Starting report generation...");

    try {
      const ai = new GoogleGenAI({
        apiKey: "AIzaSyBHh_t14Dn3zrASWJKQ1QdKAH-8wRh-Hn8", // Replace with your real API key or set env variable
      });

      // Optionally, split generation by sections to show progress
      const sections = [
        "Abstract",
        "Introduction",
        "Literature Review",
        "Methodology",
        "Implementation",
        "Results",
        "Discussion",
        "Conclusion",
        "References",
      ];

      let fullReport = "";
      for (let i = 0; i < sections.length; i++) {
        setProgressMessage(
          `Generating ${sections[i]} (${i + 1}/${sections.length})...`
        );

        const prompt = `
Generate the ${sections[i]} section of a professional project report.
Project Title: ${data.projectTitle}
Student: ${data.studentDetails.name}, Roll Number: ${data.studentDetails.rollNumber}, Branch: ${data.studentDetails.branch}
Professor: ${data.professorDetails.name}, ${data.professorDetails.designation}, ${data.professorDetails.department}
Write in formal academic style and listen and sun make our porject repot in standard formatting style do .
        `;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        fullReport += `\n\n### ${sections[i]}\n\n${response.text || ""}`;
        setReportContent(fullReport);
      }

      localStorage.setItem("generatedReport", fullReport); // Save for editor
      setProgressMessage("Report generation completed!");
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate report. Please try again later.");
    } finally {
      setLoading(false);
      setProgressMessage("");
    }
  };

  const generatePDF = () => {
    if (!reportContent) {
      alert(
        "Report content is empty! Please wait for generation or try again."
      );
      return;
    }

    const doc = new jsPDF();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text(projectData.projectTitle || "Project Report", 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    let y = 40;
    const lines = doc.splitTextToSize(reportContent, 180);
    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 8;
    });

    doc.save(`${projectData.projectTitle || "Project_Report"}.pdf`);
  };

  const handleEdit = () => {
    localStorage.setItem("generatedReport", reportContent);
    navigate("/reporteditor"); // Make sure you create this route/page
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: 20,
        color: "#eee",
        background: "#0b0f2f",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
        minHeight: "80vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Final Project Report
      </h1>

      {loading && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div className="loader" />
          <p style={{ fontSize: 18, marginTop: 10 }}>
            {progressMessage || "Generating report... Please wait."}
          </p>
        </div>
      )}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && reportContent && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 15,
            }}
          >
            <button
              onClick={generatePDF}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(90deg, #000428 0%, #004e92 100%)",
                border: "none",
                borderRadius: 5,
                color: "#fff",
                fontSize: 16,
                cursor: "pointer",
                minWidth: 150,
              }}
            >
              Download Final Report PDF
            </button>
            <button
              onClick={handleEdit}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(90deg, #434343 0%, #000000 100%)",
                border: "none",
                borderRadius: 5,
                color: "#fff",
                fontSize: 16,
                cursor: "pointer",
                minWidth: 150,
              }}
            >
              Edit Project Report
            </button>
          </div>

          <div
            style={{
              whiteSpace: "pre-wrap",
              background: "#fff",
              color: "#000",
              padding: 15,
              borderRadius: 5,
              maxHeight: 400,
              overflowY: "auto",
              marginTop: 20,
              fontSize: 14,
              lineHeight: 1.5,
              fontFamily: "Georgia, serif",
            }}
          >
            {reportContent}
          </div>
        </>
      )}

      <style>
        {`
          .loader {
            margin: auto;
            border: 8px solid #f3f3f3;
            border-top: 8px solid #004e92;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
