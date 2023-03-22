import React, { useCallback, useEffect } from "react";
// import { useUser } from "../../users/providers/UserProvider";
// import { Navigate } from "react-router-dom";s
// import ROUTES from "../../routes/routesModel";
import useCards from "../hooks/useCards";
import { Container } from "@mui/system";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
// import { useNavigate } from "react-router-dom";
import "../../cards/pages/CardsPage.css";

const FavCardsPage = () => {
  // const { user } = useUser();
  const { value, ...rest } = useCards();
  const { isLoading, error, cards } = value;
  const { handleDeleteCard, handleGetFavCards } = rest;

  // const navigate = useNavigate();

  useEffect(() => {
    handleGetFavCards();
  }, [handleGetFavCards]);

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

  // if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container>
      <PageHeader
        title={<h1 className="center-title">Favorite Cards Page</h1>}
        subtitle="Here you can find all your favorite business cards"
      />
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
      />
    </Container>
  );
};

export default FavCardsPage;
