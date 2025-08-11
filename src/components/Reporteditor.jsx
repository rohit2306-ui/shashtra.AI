import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const LINES_PER_PAGE = 30;

export default function ReportEditor() {
  const [reportText, setReportText] = useState("");
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedReport = localStorage.getItem("generatedReport") || "";
    setReportText(savedReport);
  }, []);

  // Split report into pages by lines
  useEffect(() => {
    const lines = reportText.split("\n");
    const newPages = [];
    for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
      newPages.push(lines.slice(i, i + LINES_PER_PAGE).join("\n"));
    }
    setPages(newPages);
    setCurrentPage(0);
  }, [reportText]);

  const handleTextChange = (e) => {
    setReportText(e.target.value);
  };

  const generatePDF = () => {
    if (!reportText) {
      alert("Report content is empty!");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(reportText, 180);
    let y = 20;

    lines.forEach((line, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 15, y);
      y += 8;
    });

    doc.save("Edited_Project_Report.pdf");
  };

  const goPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goNextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        background: "#f0f0f0",
        borderRadius: 8,
        minHeight: "80vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Edit Project Report</h1>

      <textarea
        style={{
          width: "100%",
          height: 400,
          padding: 15,
          fontSize: 14,
          fontFamily: "Georgia, serif",
          lineHeight: 1.6,
          borderRadius: 6,
          border: "1px solid #ccc",
          resize: "vertical",
          whiteSpace: "pre-wrap",
        }}
        value={reportText}
        onChange={handleTextChange}
      />

      <div
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <button
            onClick={goPrevPage}
            disabled={currentPage === 0}
            style={{
              padding: "10px 20px",
              marginRight: 10,
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
            }}
          >
            Prev Page
          </button>
          <button
            onClick={goNextPage}
            disabled={currentPage === pages.length - 1}
            style={{
              padding: "10px 20px",
              cursor: currentPage === pages.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next Page
          </button>
        </div>

        <div>
          Page {currentPage + 1} of {pages.length}
        </div>

        <button
          onClick={generatePDF}
          style={{
            padding: "12px 24px",
            background: "#004e92",
            border: "none",
            borderRadius: 5,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>

      {/* Display current page text */}
      <div
        style={{
          marginTop: 20,
          padding: 10,
          background: "#fff",
          borderRadius: 6,
          minHeight: 200,
          whiteSpace: "pre-wrap",
          fontFamily: "Georgia, serif",
          fontSize: 14,
          lineHeight: 1.6,
          border: "1px solid #ccc",
        }}
      >
        {pages[currentPage]}
      </div>
    </div>
  );
}
