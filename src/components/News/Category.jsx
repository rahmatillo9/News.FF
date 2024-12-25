import React, { useEffect, useState } from "react";
import { getByCategory } from "../../service/api";
import { useParams, useNavigate } from "react-router-dom";

const Category = () => {
  const { ctg } = useParams(); 
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); 
      try {
        const data = await getByCategory(ctg); 
        setNews(data);
      } catch (error) {
        setError("Failed to fetch the news for this category.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [ctg]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          ← Back
        </button>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 text-xl mb-4">No news found for this category.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          ← Back
        </button>
      </div>
    );
  }

  const handleGetOne = (NewsId) => {
    navigate(`/OneNews/${NewsId}`);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        {ctg.toUpperCase()} News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {article.description.length > 200
                  ? article.description.slice(0, 200) + "..."
                  : article.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>By: {article.user?.Lastname || "Unknown"}</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <button
                onClick={() => handleGetOne(article.id)} 
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="block mx-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
      >
        ← Back
      </button>
    </div>
  );
};

export default Category;
