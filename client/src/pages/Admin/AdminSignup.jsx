import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const AdminSignup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 768;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend ke sahi route par request bheji
      await axios.post(`${API_URL}/api/admin/signup`, data);
      alert("Admin Registered Successfully!");
      navigate("/admin"); // Success hone par login page par bhej rahe hain
    } catch (error) {
      alert("Error: Admin already exists or server error");
      console.error(error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #4a3365ff, #ac66e9ff, #3c2e58ff)", padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "30px", borderRadius: "15px", width: isMobile ? "95%" : "350px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", color: "#4a0b65ff", marginBottom: "20px" }}>Admin Signup</h2>
        
        <label>Name</label>
        <input name="name" placeholder="Full Name" required onChange={handleChange} style={{ width: "100%", padding: "10px", margin: "8px 0 15px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <label>Email</label>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} style={{ width: "100%", padding: "10px", margin: "8px 0 15px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} style={{ width: "100%", padding: "10px", margin: "8px 0 20px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <button type="submit" style={{ width: "100%", padding: "12px", background: "#593a78", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          SIGN UP
        </button>

        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
          Already have an account? <Link to="/admin">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;