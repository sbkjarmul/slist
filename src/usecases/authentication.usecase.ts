import { AuthModel, AuthenticationParams } from "@/models/auth.model";
import { AuthAPI, IAuthAPI } from "@/infrastructure/auth.api";

export interface IAuthenticationUseCase {
  auth: (authenticationParams: AuthenticationParams) => Promise<AuthModel>;
}

class AuthenticationUseCase implements IAuthenticationUseCase {
  constructor(private readonly authAPI: IAuthAPI) {}

  async auth(authenticationParams: AuthenticationParams): Promise<AuthModel> {
    const authModel = await this.authAPI.auth(authenticationParams);

    return authModel;
  }
}

export default new AuthenticationUseCase(new AuthAPI());
