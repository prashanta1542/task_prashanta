import React, { useState } from "react";
import "./Login.css"; // Assuming a CSS file named Login.css exists

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, password })
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to dashboard on successful login
        window.location.replace("/dashboard"); // Choose redirection method here
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
      setUserId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="login-container"> {/* Class from Login.css */}
      <Navbar />
      <div className="login-form-wrapper"> {/* Class from Login.css */}
        <div className="login-card"> {/* Class from Login.css */}
          <div className="card-background"> {/* Class from Login.css (optional) */}
            {/* Background decoration (optional) */}
          </div>
          <div className="login-content"> {/* Class from Login.css */}
            <label htmlFor="" className="login-title">
              Login as an Admin
            </label>
            <form onSubmit={handleSubmit} className="form"> {/* Class from Login.css */}
              <div className="input-field"> {/* Class from Login.css */}
                <input
                  type="text"
                  name="userId"
                  value={userId}
                  onChange={handleChange}
                  placeholder="Enter given user id"
                  className="user-id-input" {/* Class from Login.css */}
                />
              </div>
              <div className="input-field"> {/* Class from Login.css */}
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="password-input" {/* Class from Login.css */}
                />
              </div>
              {error && <p className="error-message">{error}</p>} {/* Class from Login.css */}
              <div className="submit-button-container"> {/* Class from Login.css */}
                <button type="submit" className="submit-button"> {/* Class from Login.css */}
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
