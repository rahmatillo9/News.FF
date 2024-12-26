import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [Lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        setLastname(decoded.Lastname);
        setRole(decoded.role);
        setEmail(decoded.email);
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Invalid token. Please log in again.");
      }
    } else {
      setError("Token not found. Please log in.");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Profile Information</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-2">Last Name</label>
          <p className="w-full p-3 border rounded-md bg-gray-100">{Lastname}</p>
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <p className="w-full p-3 border rounded-md bg-gray-100">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-2">Role</label>
          <p className="w-full p-3 border rounded-md bg-gray-100">{role}</p>
        </div>

        <div>
          <label className="block mb-2">User ID</label>
          <p className="w-full p-3 border rounded-md bg-gray-100">{userId}</p>
        </div>
      </div>
    </div>
  );
};

export default Profil;
