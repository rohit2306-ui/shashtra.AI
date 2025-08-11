import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/projectdetails");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #0a0f2a, #000000)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#fff",
      flexDirection: "column",
      padding: "20px",
      textAlign: "center"
    }}>
      <svg
        width="70"
        height="70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#39c0e0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: 20 }}
      >
        {/* Example simple logo, you can replace with your own */}
        <path d="M12 2L2 21h20L12 2z" />
        <path d="M12 16v-6" />
        <path d="M9 12h6" />
      </svg>

      <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: "0 0 10px" }}>
        Welcome to <span style={{ color: "#39c0e0" }}>शास्त्रAI</span>
      </h1>

      <p style={{ fontSize: "1.3rem", margin: "0 0 15px", color: "#7ee8fa" }}>
        An AI-driven Report Generator
      </p>

      <p style={{ maxWidth: 450, margin: "0 auto 30px", fontSize: "1rem", color: "#bbb" }}>
        Transform your ideas into professional reports with ease and speed.
      </p>

      <button
      className="but"
        onClick={handleGoogleLogin}
        style={{
          background: "linear-gradient(90deg, #0078D7 0%, #00BFFF 100%)",
          border: "none",
          borderRadius: "30px",
          padding: "14px 36px",
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 8px 15px rgba(0, 123, 255, 0.3)",
          transition: "background 0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, #005fa3 0%, #007acc 100%)"}
        onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(90deg, #0078D7 0%, #00BFFF 100%)"}
      >
        Get started &rarr;
      </button>
    </div>
  );
}
