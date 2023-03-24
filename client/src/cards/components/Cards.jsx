import React from "react";
import Card from "./card/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { arrayOf } from "prop-types";
import cardType from "../models/types/cardType";

const Cards = ({ cards, onDelete, onLike }) => {
  // const handleDelete = (text) => console.log(text);
  // const handleLike = (text) => console.log(text);

  if (!cards.length)
    return (
      <Typography m={2}>
        Oops... it seems there are no business cards to display
      </Typography>
    );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      p={1}
    >
      {cards.map((card) => (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3} m={3}>
          <Card card={card} onDelete={onDelete} onLike={onLike} />
        </Grid>
      ))}
    </Grid>
  );
};

Cards.propTypes = {
  cards: arrayOf(cardType).isRequired,
  // onDelete: func.isRequired,
  // onLike: func,
};

export default Cards;
