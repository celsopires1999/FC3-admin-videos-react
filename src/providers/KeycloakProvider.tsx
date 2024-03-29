import { useDispatch } from "react-redux";
import { keycloak } from "../keycloakConfig";
import {
  setAuthenticated,
  setToken,
  setUserDetails,
} from "../features/auth/authSlice";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function KeycloakProvider({ children }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "login-required",
        });

        if (authenticated) {
          dispatch(setAuthenticated(true));
          dispatch(setToken(keycloak.token));
          const userInfo = await keycloak.loadUserInfo();
          dispatch(setUserDetails(userInfo));
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (e) {
        console.error("Keycloak initialization error: ", e);
        dispatch(setAuthenticated(false));
      }
    };

    const updateToken = (refresh = false) => {
      if (refresh) {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            dispatch(setToken(keycloak.token));
          }
        });
      }
    };

    keycloak.onTokenExpired = () => {
      updateToken(true);
    };

    initKeycloak();
  }, [dispatch]);

  return <>{children}</>;
}
