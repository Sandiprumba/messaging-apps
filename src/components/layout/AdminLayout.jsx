import PropTypes from "prop-types";
import { Grid, Box, IconButton, Drawer, Stack, Typography, styled } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { grayColor, matteBlack } from "../../constants/color";
import { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

//creating a object like adminTabs is a common  pattern in  web development for defining navigation items in a menu or a sidebar .. in this case ADMINTABS is an array of objects where each object represents a tab in an admin dashboard..
const adminTabs = [
  {
    name: "Dashboard", //this displays the name of the tab
    path: "/admin/dashboard", // the route path associated with the tab
    icon: <DashboardIcon />, // an icon component representing the tab
  },
  {
    name: "Users", //this displays the name of the tab
    path: "/admin/users-management", // the route path associated with the tab
    icon: <ManageAccountsIcon />, // an icon component representing the tab
  },
  {
    name: "Chats", //this displays the name of the tab
    path: "/admin/chats-management", // the route path associated with the tab
    icon: <GroupsIcon />, // an icon component representing the tab
  },
  {
    name: "Messages", //this displays the name of the tab
    path: "/admin/message-management", // the route path associated with the tab
    icon: <MessageIcon />, // an icon component representing the tab
  },
];

//we are going to use the sidebar inside this component so we define here itmakes it easyu to organize and encapsulated making it easier to maintain
const Sidebar = ({ w = "100%" }) => {
  //use location can access the current location information  within the sidebar ..its used to conditionally render certain contentent or apply styles based on the current url
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };
  //stack is used to layout its children vertically or horizontally
  //typography is used for displaying text with predefined styles it allows you to easily apply different typographic styles to your text such as HEADING PARAGRAPHS AND OTHER TEXT ELEMENTS
  return (
    <Stack width={w} direction={"column"} p={"2rem"} spacing={"2rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Lets chat
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                color: "white",
                bgcolor: matteBlack,
                ":hover": { color: "white" },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
Sidebar.propTypes = {
  w: PropTypes.node.isRequired,
};

// const isAdmin = false;
const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);
  //to control the state of the menu open and close
  //to toggle the open and close of teh menu
  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  //to close the menu view
  const handleClose = () => {
    setIsMobile(false);
  };
  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>{isMobile ? <CloseIcon /> : <MenuIcon />}</IconButton>
      </Box>
      {/* the screen grid is ddivided here */}
      <Grid
        item
        md={4}
        lg={2}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={10}
        sx={{
          bgcolor: grayColor,
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="60vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
