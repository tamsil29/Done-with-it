import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const getSelf = useApi(usersApi.getMe)

  const logIn = (token: string) => {
    const user = jwtDecode(token);
    setUser(user);
    authStorage.storeToken(token);
  }

  const updateSelf = async (user?:any) => {
    if(user) return setUser(user);

    const result = await getSelf.request();
    if(result.ok) setUser(result?.data?.data);
  }

  const logOut = async () => {
    setUser(null);
    await authStorage.removeToken();
  };

  return { user, setUser, logOut, logIn, updateUser: updateSelf };
};

export default useAuth;
