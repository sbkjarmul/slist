import { AuthModel, AuthenticationParams } from "@/models/auth.model";

export interface IAuthAPI {
  auth: (params: AuthenticationParams) => Promise<AuthModel>;
}

const mockAuth: AuthModel = {
  token: "1234",
};

export class AuthAPI implements IAuthAPI {
  auth(): Promise<AuthModel> {
    return Promise.resolve(mockAuth);
  }
}
