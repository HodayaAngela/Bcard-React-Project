import React, { useEffect } from "react";
import useUsers from "../hooks/useUsers";
import { Container, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Users from "../components/Users";
import UsersCardFeedback from "../components/UsersCardFeedback";

const CrmPage = () => {
  const { user } = useUser();
  const {
    handleGetUsers,
    handleDeleteUser,
    handleChangeBusinessStatus,
    value,
  } = useUsers();
  const { error, isLoading, users } = value;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) return navigate(ROUTES.CARDS);
    handleGetUsers();
  }, [handleGetUsers, navigate, user]);

  const onDeleteUser = async (userId) => {
    await handleDeleteUser(userId);
    await handleGetUsers();
  };

  const onUpdateUser = async (userId) => {
    await handleChangeBusinessStatus(userId, user);
    await handleGetUsers();
  };

  return (
    <Container>
      <PageHeader
        style={{
          paddingLeft: "60px",
          paddingRight: "60px",
          textAlign: "center",
        }}
        title="CRM SYSTEM"
        subtitle="Welcome to our platform, designed to provide a seamless and
            user-friendly experience for viewing and managing user profiles and
            their status."
      />

      {isLoading && <Spinner />}
      {error && <Error errorMessage={error} />}
      {!users && (
        <Typography>Oops... it seems there are no users to display</Typography>
      )}
      {users && (
        <Users
          users={users}
          onDelete={(parmas) => (id) => {
            onDeleteUser(parmas.id);
          }}
          onChangeStatus={(parmas) => (id) => {
            onUpdateUser(parmas.id);
          }}
        />
      )}
    </Container>
  );
};

export default CrmPage;
