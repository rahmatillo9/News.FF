import React, { useEffect, useState } from "react";
import { getOneNews, ArticleDelete } from "../../service/api";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // JWT decode qilish uchun

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [authorId, setAuthorId] = useState(null); // JWT dan olgan user ID
  const [error, setError] = useState(null); // Token xatolarini ko'rsatish uchun
  const navigate = useNavigate();

  // JWT token orqali user ID olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.id) {
          setAuthorId(decoded.id); // User ID ni olish
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

  // Newsni olish
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getOneNews(id);
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        alert("Failed to fetch the news.");
      }
    };

    fetchNews();
  }, [id]);

  const handleDelete = async (newsId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      await ArticleDelete(newsId);
      alert("Article deleted successfully!");
      navigate(-1); // Orqaga qaytadi
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete the article.");
    }
  };

  const handleEdit = (newsId) => {
    navigate(`/EditeArticle/${newsId}`);
  };

  if (!news) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-yellow-300 shadow-2xl rounded-lg overflow-hidden">
      <div className="relative h-auto">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white px-4 text-center drop-shadow-lg">
            {news.title}
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          {news.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
          <span>
            <strong className="text-gray-800">By:</strong> {news.user?.Lastname || "Unknown"}
          </span>
          <span>
            <strong className="text-gray-800">Published:</strong> {new Date(news.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => handleDelete(news.id)}
            type="button"
            className={`text-white font-medium rounded-lg text-sm px-4 py-2 ${
              news.authorId !== authorId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
            }`}
            disabled={news.authorId !== authorId}
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(news.id)}
            type="button"
            className={`text-white font-medium rounded-lg text-sm px-4 py-2 ${
              news.authorId !== authorId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
            }`}
            disabled={news.authorId !== authorId}
          >
            Edit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
