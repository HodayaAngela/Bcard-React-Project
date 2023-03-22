import React from "react";
import { string } from "prop-types";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { useTheme } from "../providers/ThemeProvider";

const PageHeader = ({ title, subtitle }) => {
  const { isDark } = useTheme();
  return (
    <>
      <Typography
        sx={{ color: isDark ? "white" : " rgba(1, 41, 16, 0.352)" }}
        variant="h2"
        fontWeight={"bold"}
        component="h1"
        textAlign={"center"}
      >
        {title}
      </Typography>
      <Typography variant="h5" component="h2">
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string,
};

export default PageHeader;
