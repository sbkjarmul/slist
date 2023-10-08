import { AuthAPI, mockAuth } from "@/infrastructure/auth.api";

describe("AuthAPI", () => {
  let authAPI: AuthAPI;

  beforeEach(() => {
    authAPI = new AuthAPI();
  });

  describe("auth", () => {
    it("should return a Promise containing the mockAuth object", async () => {
      const result = await authAPI.auth();
      expect(result).toEqual(mockAuth);
    });
  });
});
