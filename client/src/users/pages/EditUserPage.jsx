import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import UserForm from "../components/UserForm";
import UserFormNoPassword from "../components/UserFormNoPassword";
import initialUserForm from "../helpers/initialForms/initialUserForm";
import mapUserNoPassword from "../helpers/normalization/mapUserNoPassword";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import normalizeUserNoPassword from "../helpers/normalization/normalizeUserNoPassword";
import useUsers from "../hooks/useUsers";
import userSchema from "../models/joi-schema/userSchema";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { handleUpdateUser, handleGetUser, user } = useUsers();

  //  Create a new object containing the remaining properties. Calling an arrow function that updates the user when the form is submitted.
  const { value, ...rest } = useForm(initialUserForm, userSchema, () => {
    handleUpdateUser(user._id, {
      ...normalizeUserNoPassword({ ...value.data }),
      isAdmin: user.isAdmin,
    });
  });

  // Fetching user data from the server, transform it into the desired format, and update the state of the component with the retrieved data.
  useEffect(() => {
    handleGetUser(user._id).then((data) => {
      if (!user._id) return navigate(ROUTES.CARDS);

      const modeledUser = mapUserNoPassword(data);
      rest.setData(modeledUser);
    });
  }, []);

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserFormNoPassword
        title="Edit User form"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        errors={value.errors}
        data={value.data}
        onInputChange={rest.handleChange}
        setData={rest.setData}
      />
    </Container>
  );
};

export default EditUserPage;
