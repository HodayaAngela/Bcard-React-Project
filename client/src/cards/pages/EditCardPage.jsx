import React, { useEffect } from "react";

import { useUser } from "../../users/providers/UserProvider";
// import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import normalizeCard from "../helpers/normalization/normalizeCard";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import initialCardForm from "./../helpers/initialForms/initialCardForm";
import cardSchema from "../models/joi-schemas/cardSchema";
import useCards from "./../hooks/useCards";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";

const EditCardPage = () => {
  const { handleUpdateCard, handleGetCard, card } = useCards();

  // Dynamic secondary routing
  const { cardId } = useParams();

  const navigate = useNavigate();
  const { user } = useUser();

  const { value, ...rest } = useForm(initialCardForm, cardSchema, () => {
    if (card && card._id) {
      handleUpdateCard(card._id, {
        ...normalizeCard({ ...value.data }),
        user_id: card.user_id,
      });
    }
  });

  useEffect(() => {
    handleGetCard(cardId).then((data) => {
      if (user._id !== data.user_id) navigate(ROUTES.CARDS);
      const modeledCard = mapCardToModel(data).preventDefault();
      rest.setData(modeledCard);
    });
  }, [cardId, handleGetCard, navigate, rest, user._id]);

  // if (!user) return <Navigate replace to={ROUTES.CARDS} />;
  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title="Edit Card"
        onSubmit={rest.onSubmitForEdit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
      />
    </Container>
  );
};

export default EditCardPage;
