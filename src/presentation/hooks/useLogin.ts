import { useEffect, useState } from "react";
import { AuthenticationParams } from "@/models/auth.model";
import authenticationUsecase from "@/usecases/authentication.usecase";
import storageUsecase from "@/usecases/storage.usecase";

const tokenKey = "token";

const useLogin = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = storageUsecase.get(tokenKey);

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const login = async ({ email, password }: AuthenticationParams) => {
    const { token } = await authenticationUsecase.auth({ email, password });
    storageUsecase.set(tokenKey, token);
    setIsLogged(true);
  };

  const logout = () => {
    storageUsecase.remove(tokenKey);
    setIsLogged(false);
  };

  return {
    login,
    logout,
    isLogged,
  };
};

export default useLogin;
