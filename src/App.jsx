import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';

import NewsDetail from './components/News/One.News';
import Category from './components/News/Category';
import Login from './Login/Login';
import Sign from './Login/Sign';
import CreateMaqola from './components/News/CreatNews';
import EditMaqola from './components/News/New.Edite';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isFirstVisit = localStorage.getItem("firstVisit") === null;

    if (isFirstVisit) {
      localStorage.setItem("firstVisit", "false");
      console.log("First visit, redirecting to sign...");
      navigate("/sigin");
    } else if (!token) {
      console.log("Token not found, redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OneNews/:id" element={<NewsDetail />} />
          <Route path="/All/:ctg" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sigin" element={<Sign />} />
          <Route path="/newCr" element={<CreateMaqola />} />
          <Route path='/EditeArticle/:id' element={<EditMaqola/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
