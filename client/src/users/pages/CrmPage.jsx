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

const CrmPage = () => {
  const { user } = useUser();
  const { handleGetUsers, handleDeleteUser, handleChangeBizStatus, value } =
    useUsers();
  const { error, isLoading, users } = value;
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers, navigate, user]);

  const onDeleteUser = async (userId) => {
    await handleDeleteUser(userId);
    await handleGetUsers();
  };

  const onUpdateUser = async (userId) => {
    await handleChangeBizStatus(userId, user);
    await handleGetUsers();
  };

  return (
    <Container>
      <PageHeader
        title="CRM SYSTEM"
        subtitle="Here you can find a CRM system of all the users"
      />
      {isLoading && <Spinner />}
      {!users && error && <Error errorMessage={error} />}

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
