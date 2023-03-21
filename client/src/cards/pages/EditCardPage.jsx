import React, { useEffect } from "react";

import { useUser } from "../../users/providers/UserProvider";
// import PropTypes from "prop-types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import normalizeCard from "../helpers/normalization/normalizeCard";
import cardSchema from "../models/joi-schemas/cardSchema";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import ROUTES from "../../routes/routesModel";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import { Container } from "@mui/system";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import useCards from "../hooks/useCards";

const EditCardPage = () => {
  // Dynamic secondary routing
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    handleUpdateCard,
    handleGetCard,
    value: { card },
  } = useCards();

  const { value, ...rest } = useForm(initialCardForm, cardSchema, () => {
    handleUpdateCard(card._id, {
      ...normalizeCard({ ...value.data }),
      bizNumber: card.bizNumber,
      user_id: card.user_id,
    });
  });

  useEffect(() => {
    handleGetCard(cardId).then((data) => {
      if (user._id !== data.user_id) navigate(ROUTES.CARDS);
      const modeledCard = mapCardToModel(data);
      rest.setData(modeledCard);
    });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        padding: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onChange={rest.validateForm}
        styles={{ maxWidth: "800px" }}
        to={ROUTES.CARDS}
        title="Edit card"
      >
        <Input
          label="title"
          name="title"
          error={value.errors.title}
          onChange={rest.handleChange}
          data={value.data}
          sm={12}
        />
      </Form>
    </Container>
  );
};

// EditCardPage.propTypes = {};

export default EditCardPage;
