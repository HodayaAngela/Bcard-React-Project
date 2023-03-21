import React, { useEffect } from "react";

import { useUser } from "../../users/providers/UserProvider";
// import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const { handleUpdateCard, handleGetCard, card } = useCards();

  const { value, ...rest } = useForm(initialCardForm, cardSchema, () => {
    handleUpdateCard(card._id, {
      ...normalizeCard({ ...value.data }),
      bizNumber: card.bizNumber,
      user_id: card.user_id,
    });
  });

  useEffect(() => {
    handleGetCard(id).then((data) => {
      if (user._id !== data.user_id) navigate(ROUTES.CARDS);
      const modeledCard = mapCardToModel(data);
      rest.setData(modeledCard);
    });
  }, [handleGetCard, id, navigate, rest, user._id]);
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
          name="title"
          label="title"
          error={value.errors.title}
          onChange={rest.handleChange}
          data={value.data}
          sm={6}
        />
      </Form>
    </Container>
  );
};

// EditCardPage.propTypes = {};

export default EditCardPage;
