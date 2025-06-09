import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ylmmhqvvpi.execute-api.us-west-2.amazonaws.com/prod/feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(result.message || "Feedback submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setResponseMessage("Could not reach server.");
    }
  }

  return (
    <>
      <div className="app-background">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="card p-5 shadow-lg feedback-card text-center">
            {/* Logo */}
            <img
              src={logo}
              alt="Sergoit Logo"
              style={{
                height: "80px",
                marginBottom: "1rem",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

            {/* Heading */}
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                background: "linear-gradient(to right, #15803d, #4ade80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                padding: "0.25rem 0.5rem",
                display: "inline-block",
              }}
              className="mb-3"
            >
              Sergoit View Gardens
            </h1>

            <p className="text-secondary mb-4">We’d love to hear your feedback!</p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label text-light">Name*</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label text-light">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label text-light">Message*</label>
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Share your thoughts with us..."
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-100 mt-3"
                style={{
                  background: "linear-gradient(to right, #15803d, #4ade80)",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                 Submit Feedback
              </button>
            </form>

            {responseMessage && (
              <div
                className="alert mt-4 text-center"
                role="alert"
                style={{
                  backgroundColor: "#1E40AF",
                  color: "white",
                  border: "none",
                }}
              >
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="text-center mt-5 small">
  <hr className="bg-light" />
  <p className="mb-1" style={{ fontWeight: "500", color: "#000000" }}>
    &copy; 2025 Sergoit View Gardens
  </p>
  <p className="mb-2" style={{ color: "#000000" }}>
    <i className="bi bi-geo-alt-fill" style={{ color: "#000000" }}></i> Eldoret, Kenya &nbsp;
    <i className="bi bi-envelope-fill" style={{ color: "#000000" }}></i>{" "}
    <a
      href="mailto:info@sergoitviewgardens.co.ke"
      className="text-decoration-none"
      style={{ color: "#000000", fontWeight: "500" }}
    >
      info@sergoitviewgardens.co.ke
    </a>
  </p>
  <p>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2 text-decoration-none"
      style={{ color: "#000000", fontWeight: "500" }}
    >
      <i className="bi bi-instagram" style={{ color: "#000000" }}></i> Instagram
    </a>
    |
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2 text-decoration-none"
      style={{ color: "#000000", fontWeight: "500" }}
    >
      <i className="bi bi-facebook" style={{ color: "#000000" }}></i> Facebook
    </a>
  </p>
</footer>



    </>
  );
}

export default App;
