import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "./../hooks/useCards";
// import { useUser } from "../../users/providers/UserProvider";

const CardsPage = () => {
  const { value, handleGetCards, handleDeleteCard, handleLikeCard } =
    useCards();
  const { isLoading, error, filteredCards } = value;

  useEffect(() => {
    handleGetCards();
  }, [handleGetCards]);

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId);
    await handleGetCards();
  };

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="On this page you can find all business cards form all categories"
      />

      <CardsFeedback
        cards={filteredCards}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
        onLike={handleLikeCard}
      />
    </Container>
  );
};

export default CardsPage;
