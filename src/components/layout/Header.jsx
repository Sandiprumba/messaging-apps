import { setIsNewGroup, setIsNotification } from "../../redux/reducers/misc";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, IconButton, Tooltip, Backdrop, Badge } from "@mui/material";
import { orange } from "../../constants/color";
import { Add as AddIcon, Menu as MenuIcon, Search as SearchIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile, setIsSearch } from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialogue = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //using the misc reducer created in redux createSlice misc

  const { isSearch, isNotification, isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

  //prev represents the previous state value
  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  //open new group
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  //using redux to to open the notifications
  //reset the notifications as well
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  //it was saying against react so kept it inside useeffect
  // useEffect(() => {
  //   dispatch(resetNotificationCount());
  // });

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Lets-Chat
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn title={"Search"} icon={<SearchIcon />} onClick={openSearch} />
              <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />
              <IconBtn title={"Manage Group"} icon={<GroupIcon />} onClick={navigateToGroup} />
              <IconBtn title={"Notifications"} icon={<NotificationsIcon />} onClick={openNotification} value={notificationCount} />
              <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={logoutHandler} />
              {/* prev was like this */}
              {/* <Tooltip title="Manage Groups">
                <IconButton color="inherit" size="large" onClick={navigateToGroup}>
                  <GroupIcon />
                </IconButton>
              </Tooltip> */}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* backdrop true */}
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialogue />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};
//the code is repeated so
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

IconBtn.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Header;
