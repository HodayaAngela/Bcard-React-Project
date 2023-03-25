import React, { useCallback, useEffect } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useCards from "../hooks/useCards";
import { Container } from "@mui/system";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";

const FavCardsPage = () => {
  // Will be displayed to a regular user
  const { user } = useUser();
  const { value, ...rest } = useCards();
  const { isLoading, error, cards } = value;
  const { handleDeleteCard, handleGetFavCards } = rest;

  useEffect(() => {
    handleGetFavCards();
  }, [user, handleGetFavCards]);

  const onDeleteCard = useCallback(
    async (cardId) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    [handleDeleteCard, handleGetFavCards]
  );

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, [handleGetFavCards]);

  // 2.2 + 5.2
  if (!user || user.isAdmin || user.isBusiness)
    return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title="My Favorites"
        subtitle="Here you can find all your favorite business cards"
      />
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
        title="You have not yet selected cards of your preference"
      />
    </Container>
  );
};

export default FavCardsPage;
