import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCategoryClick = (category) => {
    navigate(`/All/${category}`);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    setAnchorElUser(null);
    navigate("/profile"); 
  };

  const MyBlog = () => {
    setAnchorElUser(null);
    navigate("/myBlog");
  }
  const categories = [
    { id: "Uzb", label: "O'zbek" },
    { id: "Jxn", label: "Jahon Iqtisodiyot" },
    { id: "Spt", label: "Sport" },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img src={Logo} alt="News Logo" style={{ width: 50, height: 50 }} />
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              News
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 3,
            }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                sx={{ color: "white", textTransform: "none" }}
              >
                {category.label}
              </Button>
            ))}
          </Box>


          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: { xs: 1, md: 0 },
              justifyContent: { xs: "flex-end", md: "initial" },
            }}
          >
            <Link to="/newCr" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="secondary">
                Maqola qo‘shish +
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined" sx={{ color: "white", borderColor: "white" }}>
                Login
              </Button>
            </Link>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfileClick}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem >
                <Typography textAlign="center">Edit Profil</Typography>
              </MenuItem>
              <MenuItem onClick={MyBlog} >
                <Typography textAlign="center">My MyBlog</Typography>
              </MenuItem>
            </Menu>
          </Box>


          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { md: "none" } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {categories.map((category) => (
              <ListItem key={category.id} disablePadding>
                <ListItemButton onClick={() => handleCategoryClick(category.id)}>
                  <ListItemText primary={category.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ padding: 2 }}>
            <Link to="/newCr" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="secondary" fullWidth>
                Maqola qo‘shish +
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none", marginTop: "10px" }}>
              <Button
                variant="outlined"
                sx={{ color: "primary.main", borderColor: "primary.main", marginTop: 2 }}
                fullWidth
              >
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
