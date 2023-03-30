import { useState, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import {
  changeBizStatus,
  deleteUser,
  editUserData,
  getUserData,
  getUsers,
  login,
  signup,
} from "./../services/userApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import { useMemo } from "react";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { user, setUser, setToken } = useUser();
  useAxios();
  const snack = useSnack();
  const navigate = useNavigate();

  const requestStatus = useCallback(
    (loading, errorMessage, users, user = null) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      setUsers(users);
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, null, userFromLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, requestStatus, setToken]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
    navigate(ROUTES.CARDS);
  }, [navigate, setUser]);

  const handleSignUp = useCallback(
    async (user) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleGetUser = useCallback(async (userId) => {
    try {
      setLoading(true);
      const user = await getUserData(userId);
      requestStatus(false, null, null, user);
      return user;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      requestStatus(false, null, users, user);
      return users;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus, user]);

  const handleUpdateUser = useCallback(async (userId, userFromClient) => {
    try {
      setLoading(true);
      const user = await editUserData(userId, userFromClient);
      requestStatus(false, null, null, user);
      handleLogout();
      snack(
        "success",
        "The business user has been successfully updated, now sign in again"
      );
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        await deleteUser(userId);
        snack("success", "The business card has been successfully deleted");
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [snack]
  );

  const handleChangeBizStatus = useCallback(
    async (userId, userFromClient) => {
      try {
        setLoading(true);
        const user = await changeBizStatus(userId, userFromClient);
        requestStatus(false, null, users, user);
        snack("success", "The business user has been successfully updated");
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, snack, users]
  );

  const value = useMemo(
    () => ({
      isLoading,
      error,
      user,
      users,
    }),
    [isLoading, error, user, users]
  );

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignUp,
    handleGetUser,
    handleGetUsers,
    handleUpdateUser,
    handleDeleteUser,
    handleChangeBizStatus,
  };
};

export default useUsers;
