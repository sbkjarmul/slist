import {
  AuthenticationUseCase,
  IAuthenticationUseCase,
} from "@/usecases/authentication.usecase";
import { AuthModel, AuthenticationParams } from "@/models/auth.model";
import { AuthAPI } from "@/infrastructure/auth.api";

jest.mock("@/infrastructure/auth.api");

describe("AuthenticationUseCase", () => {
  const authApi = jest.mocked(new AuthAPI());

  let authenticationUseCase: IAuthenticationUseCase;

  beforeEach(() => {
    authenticationUseCase = new AuthenticationUseCase(authApi);
  });

  describe("auth", () => {
    it("should call authAPI.auth with the correct parameters", async () => {
      const authenticationParams: AuthenticationParams = {
        email: "test@example.com",
        password: "password",
      };
      const expectedAuthModel: AuthModel = {
        token: "token",
      };

      authApi.auth.mockResolvedValueOnce(expectedAuthModel);

      const authModel = await authenticationUseCase.auth(authenticationParams);

      expect(authApi.auth).toHaveBeenCalledWith(authenticationParams);
      expect(authModel).toEqual(expectedAuthModel);
    });
  });
});
