import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Logo from "../images/Logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/All/${category}`);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        padding: 4,
        mt: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box display="flex" alignItems="center" gap={2}>
            <img src={Logo} alt="News Logo" style={{ width: 80, height: 80 }} />
            <Typography variant="h5" fontWeight="bold">
              News
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" gap={2}>
            <Button
              onClick={() => handleCategoryClick("Uzb")}
              sx={{ color: "white", fontSize: 16 }}
            >
              O'zbek
            </Button>
            <Button
              onClick={() => handleCategoryClick("Jxn")}
              sx={{ color: "white", fontSize: 16 }}
            >
              Jahon Iqtisodiyot
            </Button>
            <Button
              onClick={() => handleCategoryClick("Spt")}
              sx={{ color: "white", fontSize: 16 }}
            >
              Sport
            </Button>
          </Box>
        </Grid>
      </Grid>


      <Divider sx={{ backgroundColor: "white", my: 3 }} />


      <Box textAlign="center">
        <Typography variant="body2" color="inherit">
          &copy; 2024 News™. Barcha huquqlar himoyalangan.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
