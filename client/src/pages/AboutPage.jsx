import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader title="About Page" />

      <Grid container spacing={2}>
        <Grid item md={7} alignSelf="center">
          Welcome to Biz Card, the premier destination for discovering the most
          successful businesses in Israel. Our platform is dedicated to
          showcasing the best and brightest companies that have made a
          significant impact in their respective industries and contributed to
          the overall success of the Israeli economy.
          <br /> <br />
          Our team is passionate about highlighting the innovative and
          entrepreneurial spirit of Israel, and we believe that by sharing the
          stories of these companies, we can inspire the next generation of
          entrepreneurs and leaders.
          <br /> <br />
          With Biz Card, you can easily browse and explore a curated list of
          top-performing businesses across a variety of sectors, including
          technology, finance, healthcare, and more. Each profile features a
          detailed overview of the company's history, mission, products or
          services, and notable achievements.
          <br /> <br />
          We also provide regular updates on the latest news and developments in
          the Israeli business community, as well as insightful interviews with
          industry experts and thought leaders.
          <br /> <br />
          Whether you're a budding entrepreneur, investor, or simply interested
          in learning more about the thriving Israeli business scene, Biz Card
          is your go-to resource for discovering the companies that are driving
          innovation and growth in this dynamic market.
          <br /> <br />
          Join us on this exciting journey of discovery and inspiration –
          download Biz Card today!
        </Grid>
        <Grid
          item
          md={5}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img
            // src="/assets/images/business-card1.webp"
            src="https://source.unsplash.com/random/?business"
            alt="card"
            width="90%"
            height="90%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
