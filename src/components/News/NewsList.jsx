import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { getNewsAll } from '../../service/api'; 

const NewsList = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNewsAll();
        setNews(data); 
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchData();
  }, []);



  const handleGetOne = (NewsId) => {
    navigate(`/OneNews/${NewsId}`);
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">News Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={article.imageUrl || 'https://via.placeholder.com/400'}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title.length > 50 ? article.title.slice(0, 50) + '...' : article.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {article.description.length > 150
                  ? article.description.slice(0, 150) + '...'
                  : article.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">By:</span>
                  <span className="italic text-gray-600">{article.user?.Lastname || 'Unknown'}</span>
                </div>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleGetOne(article.id)}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
