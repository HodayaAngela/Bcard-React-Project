import React, { useEffect } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

const MyCardsPage = () => {
  const { user } = useUser();
  const { value, handleGetMyCards, handleDeleteCard } = useCards();
  const { isLoading, error, cards } = value;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isBusiness) navigate(ROUTES.CARDS);
    else handleGetMyCards();
  }, [user, handleGetMyCards, navigate]);

  // if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.CARDS} />;

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId);
    await handleGetMyCards();
  };

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader
        title="My Cards Page"
        subtitle="Welcome to our business card creator page, where you can easily access and manage your existing business cards and create new ones at your convenience."
      />

      {cards && (
        <Fab
          onClick={() => navigate(ROUTES.CREATE_CARD)}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 75,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
      />
    </Container>
  );
};

export default MyCardsPage;
