import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (token: string) => {
    const user = jwtDecode(token);
    setUser(user);
    authStorage.storeToken(token);
  }

  const logOut = async () => {
    setUser(null);
    await authStorage.removeToken();
  };

  return { user, setUser, logOut, logIn };
};

export default useAuth;
