import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import LeftNavBar from "./left-navigations/LeftNavBar";
import RightNavBar from "./right-navigation/RightNavBar";
import SearchBar from "./right-navigation/SearchBar";
import { MenuProvider } from "./menu/MenuProvider";
import { createTheme } from "@mui/material/styles";
export const NavBar = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#004d40",
      },
    },
  });

  return (
    <MenuProvider>
      <AppBar position="sticky" theme={theme}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LeftNavBar />

          <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <SearchBar />
          </Box>

          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
};
