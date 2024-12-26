import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyBlog = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Invalid token. Please log in again.");
      }
    } else {
      setError("Token not found. Please log in.");
    }
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const response = await axios.get(`/author/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setArticles(response.data); 
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to fetch your articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">My Blog Posts</h2>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500">You have not uploaded any articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="p-4 border rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <p className="text-sm text-blue-500">Category: {article.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlog;
