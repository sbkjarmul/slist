import { renderHook, act } from "@testing-library/react";
import useLogin from "@/presentation/hooks/useLogin";
import authenticationUsecase from "@/usecases/authentication.usecase";
import storageUsecase from "@/usecases/storage.usecase";

jest.mock("@/usecases/authentication.usecase");
jest.mock("@/usecases/storage.usecase");

const mockedAuthenticationUsecase = jest.mocked(authenticationUsecase);
const mockedStorageUsecase = jest.mocked(storageUsecase);

describe("useLogin", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the expected initial state", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.isLogged).toBe(false);
  });

  it("should authenticate the user and store the token on successful login", async () => {
    const token = "test-token";
    const authenticationParams = {
      email: "test@test.com",
      password: "password",
    };
    const setItemMock = jest.fn();
    mockedStorageUsecase.set.mockImplementation(setItemMock);
    mockedAuthenticationUsecase.auth.mockResolvedValue({ token });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.login(authenticationParams);
    });

    expect(result.current.isLogged).toBe(true);
    expect(setItemMock).toHaveBeenCalledWith("token", token);
  });

  it("should clear the authentication state and remove the token on logout", () => {
    const removeItemMock = jest.fn();
    mockedStorageUsecase.remove.mockImplementation(removeItemMock);

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.logout();
    });

    expect(result.current.isLogged).toBe(false);
    expect(removeItemMock).toHaveBeenCalledWith("token");
  });
});
