import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import "../cards/pages/CardsPage.css";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title={<h1 className="center-title">About Page</h1>}
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          Israel is home to many successful businesses, ranging from startups to
          multinational corporations.
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/images/business-card1.webp"
            alt="card"
            width="100%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
