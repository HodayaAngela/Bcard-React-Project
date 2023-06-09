import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "./../../../../routes/routesModel";

const LogoIcon = () => {
  return (
    <NavBarLink to={ROUTES.CARDS}>
      <IconButton
        sx={{ display: { xs: "inline-flex", md: "none" } }}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <Avatar
          alt="Business card icon"
          src="/assets/images/businessIcon.avif"
        />
      </IconButton>
    </NavBarLink>
  );
};

export default LogoIcon;
