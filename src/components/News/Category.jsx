import React, { useEffect, useState } from "react";
import { getByCategory } from "../../service/api";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Box>
    );
  }

  if (news.length === 0) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          No news found for this category.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Box>
    );
  }

  const handleGetOne = (NewsId) => {
    navigate(`/OneNews/${NewsId}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}>
        {ctg.toUpperCase()} News
      </Typography>
      <Grid container spacing={3}>
        {news.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={article.imageUrl || "https://via.placeholder.com/400x200"}
                alt={article.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {article.description.length > 100
                    ? article.description.slice(0, 100) + "..."
                    : article.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>By:</strong> {article.user?.Lastname || "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Published:</strong> {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: "right" }}>
                <Button size="small" color="primary" onClick={() => handleGetOne(article.id)}>
                  Read more →
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Box>
    </Box>
  );
};

export default Category;
