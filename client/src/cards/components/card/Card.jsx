import React from "react";
import { func } from "prop-types";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import cardType from "./../../models/types/cardType";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

const Card = ({ card, onDelete, onLike }) => {
  const navigate = useNavigate();

  return (
    <MuiCard
      sx={{
        minWidth: 280,
        opacity: [0.9, 0.8, 0.7],
        boxShadow: "0px 0px 10px 1px rgba(0,1,0,0.4)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          opacity: 1,
          boxShadow: 0,
          transform: "translateY(-10px)",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_INFO}/${card._id}`)}
      >
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>

      <CardActionBar
        cardId={card._id}
        onDelete={onDelete}
        onLike={onLike}
        cardUserId={card.user_id}
        cardLikes={card.likes}
      />
    </MuiCard>
  );
};

Card.propTypes = {
  card: cardType.isRequired,
  onDelete: func.isRequired,
  onLike: func,
};

export default React.memo(Card);
