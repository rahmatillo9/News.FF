import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNewsByUser } from "../../service/api"; // Ma'lumotni foydalanuvchiga oid olish uchun bu funksiya kerak
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const MyBlog = () => {
  const [myArticles, setMyArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        // Foydalanuvchi maqolalarini olish
        const data = await getNewsByUser(); // bu funksiyani backendni yangilab, foydalanuvchining maqolalarini olish uchun yozish kerak
        setMyArticles(data);
      } catch (error) {
        console.error("Failed to fetch my articles:", error);
      }
    };

    fetchMyArticles();
  }, []);

  const handleGetOne = (articleId) => {
    navigate(`/OneNews/${articleId}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Blog
      </Typography>
      <Grid container spacing={4}>
        {myArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={article.imageUrl || "https://via.placeholder.com/400"}
                alt={article.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}
                >
                  {article.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar alt={article.user?.Lastname || "Unknown"} />
                    <Typography variant="body2" color="text.secondary">
                      {article.user?.Lastname || "Unknown"}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleGetOne(article.id)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBlog;
