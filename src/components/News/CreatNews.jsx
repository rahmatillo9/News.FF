import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const CreateMaqola = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState(""); 
  const [authorId, setAuthorId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.id) {
          setAuthorId(decoded.id);
        } else {
          setError("Token invalid or missing userId.");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Invalid token. Please log in again.");
      }
    } else {
      setError("Token not found. Please log in.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) { 
      setError("Title, description, and category are required!");
      return;
    }

    if (!authorId) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "/News",
        {
          title,
          description,
          imageUrl,
          category,
          authorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setCategory(""); 
        setError("");

        alert("Article created successfully");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the article.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Article</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="imageUrl">
            Image URL (Optional)
          </label>
          <input
            type="text"
            id="imageUrl"
            className="w-full p-2 border rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="w-full p-2 border rounded"
            value={category} // To'g'ri nom ishlatilmoqda
            onChange={(e) => {
              console.log("Category changed to:", e.target.value); 
              setCategory(e.target.value); 
            }}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Uzb">Uzbek</option>
            <option value="Jxn">Jahon</option>
            <option value="Spt">Sport</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Article
        </button>
      </form>
    </div>
  );
};

export default CreateMaqola;
