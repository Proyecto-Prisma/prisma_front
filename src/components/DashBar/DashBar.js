import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleIcon from "@mui/icons-material/Article"; // Ícono de formulario
import BarChartIcon from "@mui/icons-material/BarChart"; // Ícono de gráfico
import HistoryIcon from "@mui/icons-material/History"; // Ícono de historial
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Home from "../Home/Home";
import Graphs from "../Graphs/Graps";
import History from "../History/History";
import profilePhoto from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;
const pink = "#FF005B";
const darkPink = "#C0005E";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("SLR");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleAvatarClose();
  };
  
  const handleLogoutClick = () => {
    localStorage.removeItem("authData");
    handleAvatarClose();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: pink }}>
        <Toolbar sx={{ backgroundColor: pink, color: "white" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={"bold"}>
            Mi Tablero PRISMA
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Avatar
            alt="User Avatar"
            src={profilePhoto}
            sx={{ cursor: "pointer" }}
            onClick={handleAvatarClick}
            style={{ backgroundColor: darkPink }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAvatarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Cerrar Sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            color: pink,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: pink }} />
            ) : (
              <ChevronRightIcon sx={{ color: pink }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ fontWeight: "bold" }}>
          {["SLR", "Mis Gráficas", "Mi Historial"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              selected={selectedItem === text}
              onClick={() => handleListItemClick(text)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: pink }}>
                  {" "}
                  {index % 3 === 0 ? (
                    <ArticleIcon />
                  ) : index % 3 === 1 ? (
                    <BarChartIcon />
                  ) : (
                    <HistoryIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {selectedItem === "SLR" && <Home />}
        {selectedItem === "Mis Gráficas" && <Graphs />}
        {selectedItem === "Mi Historial" && <History />}
      </Main>
    </Box>
  );
}
