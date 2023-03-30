import React from "react";
import { string } from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Error = ({ errorMessage }) => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="RED">
            Oops... something went wrong: {errorMessage}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            style={{ borderRadius: "30px" }}
            width="70%"
            src="/assets/images/oops.jpg"
            alt="broken robot"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

Error.propTypes = {
  errorMessage: string.isRequired,
};

export default Error;
