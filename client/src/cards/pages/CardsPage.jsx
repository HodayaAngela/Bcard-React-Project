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
        subtitle="Here are some of successful business cards in Israel:"
      />

      <CardsFeedback
        cards={filteredCards}
        error={error}
        isLoading={isLoading}
        onDelete={onDeleteCard}
        onLike={handleLikeCard}
        title="Oops, no business cards to show"
      />
    </Container>
  );
};

export default CardsPage;
