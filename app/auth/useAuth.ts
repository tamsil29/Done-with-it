import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const getSelf = useApi(usersApi.getMe)

  const logIn = async (token: string) => {
    const user = jwtDecode(token);
    // setUser(user);
    await authStorage.storeToken(token);
    updateSelf()
  }

  const updateSelf = async (user?:any) => {
    if(user) return setUser(user);

    const result = await getSelf.request();
    if(result.ok) setUser(result?.data);
  }

  const logOut = async () => {
    setUser(null);
    await authStorage.removeToken();
  };

  return { user, setUser, logOut, logIn, updateSelf };
};

export default useAuth;
