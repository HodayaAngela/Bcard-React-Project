import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Typography from "@mui/material/Typography";
import Cards from "./Cards";
import cardType from "../models/types/cardType";
// import cardType from "./../models/types/cardType";
import { makeFirstLetterCapital } from "../../utils/algoMethods";

const CardsFeedback = ({
  title,
  isLoading,
  error,
  cards,
  onDelete,
  onLike,
}) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && !cards.length)
    return (
      <Typography variant="body1" color="initial">
        {makeFirstLetterCapital(title)}
      </Typography>
    );
  if (cards) return <Cards cards={cards} onDelete={onDelete} onLike={onLike} />;
  return null;
};

CardsFeedback.propTypes = {
  isLoading: bool.isRequired,
  error: string,
  // cards: arrayOf(object),
  cards: arrayOf(cardType),
  onDelete: func.isRequired,
  onLike: func.isRequired,
};

CardsFeedback.defaultProps = {
  onLike: () => {},
};

export default React.memo(CardsFeedback);
