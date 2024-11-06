import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header>
      <IconButton onClick={handleHomeClick} color="primary" aria-label="home">
        <HomeIcon />
      </IconButton>
    </header>
  );
};

export default Header;
