import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCards from "../hooks/useCards";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import { Box, Button, Input, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useUser } from "../../users/providers/UserProvider";

const CardDetailsPage = () => {
  // Dynamic secondary routing
  const { cardId } = useParams();

  const { user } = useUser();
  const { handleGetCard, handleAdminNumber } = useCards();

  const [cardData, setCardData] = useState("");

  useEffect(() => {
    handleGetCard(cardId).then((data) => {
      const modeledCard = mapCardToModel(data);
      setCardData(modeledCard);
    });
  }, [handleGetCard, cardId]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
      >
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", sm: 151 } }}
          image={cardData.imageUrl}
          alt="business card"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h4">
              {cardData.title}
            </Typography>

            <Typography variant="h6" color="-moz-initial">
              Business card number: {cardData.bizNumber}
            </Typography>

            <Box sx={{ display: user && user.isAdmin ? "block" : "none" }}>
              <Input
                name="bizNumber"
                label="bizNumber"
                type="number"
                onChange={(e) => (cardData.bizNumber = e.target.value)}
                placeholder={`${cardData.bizNumber}`}
              />
              <Button
                variant="text"
                color="primary"
                onClick={() => handleAdminNumber(cardId, cardData)}
              >
                Update number
              </Button>
              <br />
            </Box>
            <br />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {cardData.description}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Our web page: {cardData.webUrl}
            </Typography>
            {/* <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Card creation date: {cardData.createdAt}
            </Typography> */}
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <a href={cardData.webUrl} target="_blank" rel="noopener noreferrer">
              For more details click here 👈
            </a>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CardDetailsPage;
