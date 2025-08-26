import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userActions'; // <-- IMPORT LOGOUT ACTION

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info from the Redux state
  const { userInfo } = useSelector((state) => state.user);

  // State for the user dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    handleClose(); // Close the menu first
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Site Title - always visible */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          E-Learning Platform
        </Typography>

        {/* --- Conditional Rendering Logic --- */}
        {userInfo ? (
          // If user IS logged in, show their name and a dropdown menu
          <div>
            <Button
              color="inherit"
              onClick={handleMenu}
              startIcon={<AccountCircle />}
            >
              {userInfo.name}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {/* Add a new MenuItem specifically for Instructors */}
              {userInfo && userInfo.role === "Instructor" && (
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/courses/create"
                >
                  Create Course
                </MenuItem>
              )}
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/profile"
              >
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          // If user IS NOT logged in, show Login and Register buttons
          <Box>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;