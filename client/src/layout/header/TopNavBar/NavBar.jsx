import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import LeftNavBar from "./left-navigations/LeftNavBar";
import RightNavBar from "./right-navigation/RightNavBar";
import SearchBar from "./right-navigation/SearchBar";
import { MenuProvider } from "./menu/MenuProvider";
import { createTheme } from "@mui/material/styles";
import { useTheme } from "../../../providers/ThemeProvider";
export const NavBar = () => {
  const { isDark } = useTheme();

  const theme = createTheme({
    palette: {
      primary: {
        main: isDark ? "#212121" : "#004d40",
      },
      background: {
        default: isDark ? "#424242" : "#fafafa",
        paper: isDark ? "#616161" : "#fff",
      },
      text: {
        primary: isDark ? "#fff" : "#212121",
        secondary: isDark ? "#e0e0e0" : "#757575",
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
