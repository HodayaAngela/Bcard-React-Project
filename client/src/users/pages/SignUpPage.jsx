import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import Container from "@mui/material/Container";
import useForm from "../../forms/hooks/useForm";
import useUsers from "../hooks/useUsers";
import initialSignUpForm from "../helpers/initialForms/initialSignUpForm";
import signUpSchema from "../models/joi-schema/signUpSchema";
import UserForm from "../components/UserForm";

const SignUpPage = () => {
  const { handleSignUp } = useUsers();

  const { value, ...rest } = useForm(
    initialSignUpForm,
    signUpSchema,
    handleSignUp
  );

  const { user } = useUser();

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm
        title="register user"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default SignUpPage;
