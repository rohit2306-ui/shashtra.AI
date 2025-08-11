import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // <-- Import react-markdown

export default function ProjectReport() {
  const [projectData, setProjectData] = useState(null);
  const [reportContent, setReportContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [error, setError] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [customResponse, setCustomResponse] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

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
        apiKey: "AIzaSyBHh_t14Dn3zrASWJKQ1QdKAH-8wRh-Hn8", // Replace with your API key
      });

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
        setProgressMessage(`Generating ${sections[i]} (${i + 1}/${sections.length})...`);

        const prompt = `
Generate the ${sections[i]} section of a professional project report.
Project Title: ${data.projectTitle}
Student: ${data.studentDetails.name}, Roll Number: ${data.studentDetails.rollNumber}, Branch: ${data.studentDetails.branch}
Professor: ${data.professorDetails.name}, ${data.professorDetails.designation}, ${data.professorDetails.department}
Write in formal academic style and all the text is black this is important point and design a good first page where user can set its collegge logog and name roll number submited by submit to and use ll things to make this formatting good.
        `;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        fullReport += `\n\n### ${sections[i]}\n\n${response.text || ""}`;
        setReportContent(fullReport);
      }

      localStorage.setItem("generatedReport", fullReport);
      setProgressMessage("Report generation completed!");
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate report. Please try again later.");
    } finally {
      setLoading(false);
      setProgressMessage("");
    }
  };

  // Custom Gemini content generator code unchanged...

  const generatePDF = () => {
    // Your existing PDF generation logic
  };

  const handleEdit = () => {
    localStorage.setItem("generatedReport", reportContent);
    navigate("/reporteditor");
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
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Final Project Report</h1>

      {loading && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div className="loader" />
          <p style={{ fontSize: 18, marginTop: 10 }}>{progressMessage || "Generating report... Please wait."}</p>
        </div>
      )}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && reportContent && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 15 }}>
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

          {/* Replace plain text div with ReactMarkdown */}
          <div
            style={{
              background: "#fff",
              color: "#000",
              padding: 20,
              borderRadius: 5,
              maxHeight: 500,
              overflowY: "auto",
              fontFamily: "Georgia, serif",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            <ReactMarkdown>{reportContent}</ReactMarkdown>
          </div>

          {/* Custom Gemini input section unchanged... */}
          <div
            style={{
              marginTop: 40,
              background: "#1a1f4c",
              padding: 20,
              borderRadius: 8,
              color: "#fff",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h2>Generate Custom Content with Gemini</h2>
            <textarea
              rows={4}
              placeholder="Enter your prompt here for Gemini..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                fontSize: 14,
                borderRadius: 5,
                border: "1px solid #004e92",
                resize: "vertical",
                marginBottom: 10,
                background: "#0b0f2f",
                color: "#eee",
              }}
            />
            <button
              onClick={generateCustomContent}
              disabled={customLoading}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(90deg, #004e92 0%, #000428 100%)",
                border: "none",
                borderRadius: 5,
                color: "#fff",
                fontSize: 16,
                cursor: "pointer",
                minWidth: 150,
              }}
            >
              {customLoading ? "Generating..." : "Generate"}
            </button>

            {customResponse && (
              <div
                style={{
                  marginTop: 20,
                  whiteSpace: "pre-wrap",
                  background: "#fff",
                  color: "#000",
                  padding: 15,
                  borderRadius: 5,
                  maxHeight: 300,
                  overflowY: "auto",
                  fontFamily: "Georgia, serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {customResponse}
              </div>
            )}
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

          /* Add some markdown styling */
          .markdown h1, .markdown h2, .markdown h3 {
            font-weight: bold;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
          }

          .markdown p {
            margin-bottom: 1em;
            text-align: justify;
          }

          .markdown ul, .markdown ol {
            margin-left: 1.5em;
            margin-bottom: 1em;
          }

          .markdown blockquote {
            margin: 1em 0;
            padding-left: 1em;
            border-left: 4px solid #ccc;
            color: #666;
            font-style: italic;
          }
        `}
      </style>
    </div>
  );
}
