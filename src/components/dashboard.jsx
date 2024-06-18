import React, { useEffect, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./login/LoginSlice";
import CategoryIndex from "./indexes/CategoryIndex";
import ProductIndex from "./indexes/ProductIndex";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import avatar from "../assets/avtar.png";

import "../styles/dashboard.css";

const drawerWidth = 240;

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

const AppBarStyled = styled(AppBar, {
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
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sideItems, setSideItems] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  console.log(decoded, "decoded");
  const { role } = useSelector((state) => state);
  dispatch(getUser(decoded.user.role));
  const [activeTab, setActiveTab] = useState(null);
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (decoded.user.role === "admin") {
      setSideItems(["Categories", "Products"]);
    }
    if (decoded.user.role === "user") {
      setSideItems(["Products"]);
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar
          className="bg-info"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ color: "black", mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar alt="a" src={avatar} sx={{ mr: 2 }} />
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ color: "black" }}
            >
              {decoded.user.role}
            </Typography>
          </Box>
          <IconButton color="black" onClick={handleLogout}>
            <Typography
              noWrap
              className="btn btn-danger"
              component="div"
              sx={{ color: "white", mr: 0 }}
            >
              Logout
            </Typography>
            <i className="bi bi-box-arrow-right "></i>
          </IconButton>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <b>
            <i>{decoded.user.role}</i>
          </b>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {sideItems.map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => handleTabClick(text.toLowerCase())}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <CategoryIcon /> : <ShoppingBagIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {/* {activeTab === "dashboard" &&(
          <div className="content " >
         
<img src="https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?b=1&s=170667a&w=0&k=20&c=Q73ir-wB0u0cUX1Ho6OABXrQEBoD9b8FFV4Bn_DsEB8=" alt=""  style={{height:"100vh",width:"100%"}}/>
          </div>
        )} */}
        {activeTab === "categories" && (
          <div className="content ">
            <CategoryIndex />
          </div>
        )}
        {activeTab === "products" && (
          <div className="content">
            <ProductIndex />
          </div>
        )}
      </Main>

      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
    </Box>
  );
}

export default Dashboard;
