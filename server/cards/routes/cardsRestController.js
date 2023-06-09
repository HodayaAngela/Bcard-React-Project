const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeCard = require("../helpers/normalizeCard");
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  getMyLikesCards,
  adminNumber,
} = require("../models/cardsAccessDataService");
const validateCard = require("../validations/cardValidationService");
const router = express.Router();

router.get("/my-cards", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const card = await getMyCards(_id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let card = req.body;
    const user = req.user;

    if (!user.isBusiness)
      return handleError(res, 403, "Authentication Error: Unauthorize user");

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeCard(card, user._id);

    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let cardId = req.params.id;
    let card = req.body;
    let { _id, isBusiness } = req.user;
    if ((!isBusiness && _id !== card.user_id) || _id !== card.user_id)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an business type user to update a  card"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    card = await normalizeCard(card);
    card = await updateCard(cardId, card);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const cardUserId = req.user._id;

    const card = await likeCard(cardId, cardUserId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/adminNumber/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const { _id, isAdmin } = req.user;
    const { bizNumber } = req.body;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user to update a card"
      );

    const card = await adminNumber(cardId, _id, bizNumber);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;

    const card = await deleteCard(cardId, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
