import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";

// ---- Signup Component ----
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, go to editor
    if (localStorage.getItem("token")) {
      navigate("/editor");
    }
  }, [navigate]);

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);

    if (res.ok && data.success) {
      localStorage.setItem("token", data.token); // save token
      navigate("/editor");
    }
  };

  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <h2 style={{ color: "white" }}>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignup} style={styles.button}>
          Sign Up
        </button>
        <p style={{ color: "white", marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

// ---- Login Component ----
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, go to editor
    if (localStorage.getItem("token")) {
      navigate("/editor");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);

    if (res.ok && data.success) {
      localStorage.setItem("token", data.token); // save token
      navigate("/editor");
    }
  };

  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <h2 style={{ color: "white" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <p style={{ color: "white", marginTop: "10px" }}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

// ---- Editor Component ----
function Editor() {
  const navigate = useNavigate();
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\nint main(){\n  cout << "Hello World";\n  return 0;\n}`
  );
  const [output, setOutput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
    }
  }, [navigate]);

  const runCode = async () => {
    const res = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setOutput(data.output);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>C++ Online Editor</h2>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="12"
        cols="80"
        style={{ width: "100%", fontFamily: "monospace", marginTop: "1rem" }}
      />
      <br />
      <button onClick={runCode} style={{ ...styles.button, marginTop: "10px" }}>
        Run Code
      </button>
      <pre style={styles.output}>{output}</pre>
    </div>
  );
}

// ---- App with Routes ----
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

// ---- Basic Styles ----
const styles = {
  center: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#222",
    padding: "2rem",
    borderRadius: "1rem",
    width: "300px",
  },
  input: {
    width: "100%",
    margin: "5px 0",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  output: {
    background: "#111",
    color: "lime",
    padding: "1rem",
    marginTop: "1rem",
    minHeight: "100px",
  },
};
