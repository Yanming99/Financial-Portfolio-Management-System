import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetDashboard from "./components/AssetDashboard.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("register");
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        mode === "register" ? "/api/users/register" : "/api/users/login";
      const response = await axios.post(`http://localhost:8080${endpoint}`, {
        username,
        password,
      });
      setMessage(response.data);
      setLoggedInUser(username);
    } catch (error) {
      setMessage("❌ " + (error.response?.data || "Something went wrong"));
    }
    setLoading(false);
  };

  if (loggedInUser) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>🎉 Welcome, {loggedInUser}!</h2>
        <AssetDashboard username={loggedInUser} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          {mode === "register" ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
            }}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "register"
              ? "Register"
              : "Login"}
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: message.startsWith("❌") ? "red" : "green",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          {mode === "register" ? "Already have an account?" : "New user?"}{" "}
          <span
            onClick={() =>
              setMode(mode === "register" ? "login" : "register")
            }
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            {mode === "register" ? "Switch to Login" : "Switch to Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
