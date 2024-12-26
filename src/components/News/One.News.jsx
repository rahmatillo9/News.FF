import React, { useEffect, useState } from "react";
import { getOneNews, ArticleDelete } from "../../service/api";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getOneNews(id);
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setError("Failed to fetch the news.");
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
      navigate(-1);
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete the article.");
    }
  };

  const handleEdit = (newsId) => {
    navigate(`/EditeArticle/${newsId}`);
  };

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!news) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={news.imageUrl || "https://via.placeholder.com/800x400"}
          alt={news.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {news.title}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" color="text.secondary" paragraph>
            {news.description}
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                <strong>By:</strong> {news.user?.Lastname || "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Published:</strong> {new Date(news.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          disabled={news.authorId !== authorId}
          onClick={() => handleEdit(news.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={news.authorId !== authorId}
          onClick={() => handleDelete(news.id)}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Stack>
    </Box>
  );
};

export default NewsDetail;
