import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Typography from "@mui/material/Typography";
import userType from "../types/userType";
import Users from "./Users";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

const UsersCardFeedback = ({ isLoading, error, users, onDelete }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (users && !users.length)
    return (
      <Typography variant="body1" color="initial">
        Oops, there are no user tables in the database that match the parameters
        you entered!
      </Typography>
    );
  if (users) return <Users users={users} onDelete={onDelete} />;
  return null;
};

UsersCardFeedback.propTypes = {
  isLoading: bool.isRequired,
  error: string,
  users: arrayOf(userType),
  onDelete: func.isRequired,
};

export default UsersCardFeedback;
