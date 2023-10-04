import { useEffect, useState } from "react";
import authenticationUsecase from "../usecases/authentication.usecase";
import { AuthenticationParams } from "../models/auth.model";
import storageUsecase from "../usecases/storage.usecase";

const tokenSymbol = Symbol("token");

const useLogin = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = storageUsecase.get(String(tokenSymbol));

    console.log("token symbol", String(tokenSymbol));

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const login = async ({ email, password }: AuthenticationParams) => {
    const { token } = await authenticationUsecase.auth({ email, password });
    storageUsecase.set(String(tokenSymbol), token);
    setIsLogged(true);
  };

  const logout = () => {
    storageUsecase.remove(String(tokenSymbol));
    setIsLogged(false);
  };

  return {
    login,
    logout,
    isLogged,
  };
};

export default useLogin;
