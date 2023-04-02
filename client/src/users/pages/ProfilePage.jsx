import React, { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";
import { Container } from "@mui/system";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { Avatar, Typography, Grid } from "@mui/material";
import mapUserToModel from "../helpers/normalization/mapUserToModel";

const ProfilePage = () => {
  const [userData, setUserData] = useState("");
  const { handleGetUser, value } = useUsers();
  const { isLoading, error, user } = value;

  useEffect(() => {
    if (user) {
      handleGetUser(user._id).then((data) => {
        const mapUser = mapUserToModel(data);
        setUserData(mapUser);
      });
    }
  }, [handleGetUser, user._id]);

  return (
    <Container>
      <PageHeader
        title="User Information"
        subtitle="Here, you can view detailed information about your user account."
      />
      {isLoading && <Spinner />}
      {error && <Error errorMessage={error} />}
      {userData != null && (
        <>
          <Grid
            container
            minHeight={180}
            mb={5}
            mt={5}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Typography
                variant="h4"
                color="initial"
              >{`First name: ${userData.first}`}</Typography>
              <Typography
                variant="h4"
                color="initial"
              >{`Last name : ${userData.last}`}</Typography>
              <Typography
                variant="h4"
                color="initial"
              >{`Email : ${userData.email}`}</Typography>
              <Typography
                variant="h4"
                color="initial"
              >{`Phone : ${userData.phone}`}</Typography>
              <Typography
                variant="h4"
                color="initial"
              >{`Address : ${userData.street} ${userData.houseNumber}  ${userData.city}`}</Typography>
              <Typography variant="h4" color="initial">{`Business: ${
                user?.isBusiness || false
              }`}</Typography>
              <Typography variant="h4" color="initial">{`Admin: ${
                user?.isAdmin || false
              }`}</Typography>
            </Grid>
            <Grid item>
              <Avatar
                alt="User card img"
                src="https://source.unsplash.com/random/?USER-PROFILE"
                sx={{ width: 350, height: 350 }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
