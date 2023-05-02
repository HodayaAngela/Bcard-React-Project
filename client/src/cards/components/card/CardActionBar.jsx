import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayOf, func, string } from 'prop-types';
import { useUser } from '../../../users/providers/UserProvider';
import CardDeleteDialog from './CardDeleteDialog';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routesModel';
import useCards from '../../hooks/useCards';

const CardActionBar = ({ onDelete, cardId, cardLikes, onLike, cardUserId }) => {
  // userFromLocalStorage:
  const { user } = useUser();

  // cardUserId:
  // <CardActionBar
  //       cardId={card._id}
  //       onDelete={onDelete}
  //       onLike={onLike}
  //       cardUserId={card.user_id}
  //       cardLikes={card.likes}
  //     />

  const navigate = useNavigate();
  const { handleLikeCard } = useCards([]);
  const [isDialogOpen, setDialog] = useState(false);
  const [isLiked, setLike] = useState(
    () => !!cardLikes.find((id) => id === user?._id)
  );

  const handleDialog = (term) => {
    if (term === 'open') return setDialog(true);
    setDialog(false);
  };

  const handleDeleteCard = () => {
    handleDialog();
    onDelete(cardId);
  };

  // onDelete:
  //CardsPage: const onDeleteCard = async (cardId) => {
  //   await handleDeleteCard(cardId);
  //   await handleGetCards();
  // };
  // handleDeleteCard:  useCards()

  const handleLike = async () => {
    setLike((prev) => !prev);
    await handleLikeCard(cardId);
    onLike();
  };

  // console.log(user._id, cardUserId);

  return (
    <>
      <CardActions
        disableSpacing
        sx={{ pt: 0, justifyContent: 'space-between' }}
      >
        <Box>
          {/* 5.3 + 5.4 */}

          {user &&
            (user.isAdmin || (user.isBusiness && user._id === cardUserId)) && (
              <IconButton
                aria-label="delete card"
                onClick={() => handleDialog('open')}
              >
                <DeleteIcon />
              </IconButton>
            )}

          {/* 5.3 +5.4 */}
          {user &&
            ((user.isAdmin && user._id === cardUserId) ||
              (user.isBusiness && user._id === cardUserId)) && (
              <IconButton
                aria-label="edit card"
                onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}
              >
                <EditIcon />
              </IconButton>
            )}
        </Box>

        <Box>
          <IconButton aria-label="call business">
            <CallIcon />
          </IconButton>

          {/* 5.2 */}
          {user && (
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
            </IconButton>
          )}
        </Box>
      </CardActions>

      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteCard}
      />
    </>
  );
};

CardActionBar.propTypes = {
  cardId: string.isRequired,
  onDelete: func.isRequired,
  onLike: func.isRequired,
  cardUserId: string.isRequired,
  cardLikes: arrayOf(string).isRequired,
};
export default CardActionBar;
