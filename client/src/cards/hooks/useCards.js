import { useCallback, useState, useMemo } from "react";
import {
  adminNumber,
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "./../services/cardApiService";
import useAxios from "../../hooks/useAxios";
import normalizeCard from "./../helpers/normalization/normalizeCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import { useEffect } from "react";
// import { getFavoriteCards } from "../../../../server/cards/models/cardsAccessDataService";

const useCards = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState();
  const [card, setCard] = useState();
  const [query, setQuery] = useState("");
  const [filteredCards, setFilter] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (cards) {
      setFilter(
        cards.filter(
          (card) =>
            card.title.includes(query) || String(card.bizNumber).includes(query)
        )
      );
    }
  }, [cards, query]);

  const snack = useSnack();
  useAxios();

  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
      snack("success", "Cards imported from DB");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetCardsForLikes = useCallback(async () => {
    // without snack
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error.message, null);
    }
  }, []);

  const handleGetCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      requestStatus(false, error.message, null);
    }
  }, []);

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error.message, null);
    }
  }, []);

  const handleUpdateCard = useCallback(
    async (cardId, cardFromClient) => {
      try {
        setLoading(true);
        const card = await editCard(cardId, cardFromClient);
        requestStatus(false, null, null, card);
        snack("success", "The business card has been successfully updated");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, snack]
  );

  const handleCreateCard = useCallback(
    async (cardFromClient) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeCard(cardFromClient);
        const card = await createCard(normalizedCard);
        requestStatus(false, null, null, card);
        snack("success", "A new business card has been created");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [navigate, snack]
  );

  const handleDeleteCard = useCallback(
    async (cardId) => {
      try {
        setLoading(true);
        await deleteCard(cardId);
        requestStatus(false, null, cards, null);
        snack("success", "The business card has been deleted");
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [cards, snack]
  );

  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      // const cards = await handleGetCards(cardUserId);
      const cards = await getCards();
      const favCards = cards.filter(
        (card) => !!card.likes.find((id) => id === user._id)
      );
      requestStatus(false, null, favCards);
    } catch (error) {
      requestStatus(false, error.message, null);
    }
  }, [user]);

  const handleLikeCard = useCallback(
    async (cardId) => {
      try {
        setLoading(true);
        const card = await changeLikeStatus(cardId);
        const cards = await handleGetCardsForLikes();
        requestStatus(false, null, cards, card);
      } catch (error) {
        requestStatus(false, error.message, null);
      }
    },
    [handleGetCardsForLikes]
  );

  const handleAdminNumber = useCallback(
    async (cardId, cardFromClient) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeCard(cardFromClient);
        const card = await adminNumber(cardId, normalizedCard);
        requestStatus(false, null, cards, card);
        snack("success", "The business card has been successfully updated");
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [cards, snack]
  );

  const value = useMemo(() => {
    return { isLoading, cards, card, error, filteredCards };
  }, [isLoading, cards, card, error, filteredCards]);

  return {
    value,
    handleGetCards,
    handleGetMyCards,
    handleCreateCard,
    handleGetFavCards,
    handleGetCard,
    handleUpdateCard,
    handleDeleteCard,
    handleLikeCard,
    handleAdminNumber,
    requestStatus,
  };
};

export default useCards;
