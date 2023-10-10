import { StorageUseCase, IStorage } from "../../../usecases/storage.usecase";

describe("StorageUseCase", () => {
  let mockStorage: IStorage;
  let storageUseCase: StorageUseCase;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    storageUseCase = new StorageUseCase(mockStorage);
  });

  describe("get", () => {
    it("should call storage.getItem with the provided key", () => {
      const key = "test-key";
      storageUseCase.get(key);
      expect(mockStorage.getItem).toHaveBeenCalledWith(key);
    });

    it("should return the value returned by storage.getItem", () => {
      const key = "test-key";
      const value = "test-value";
      mockStorage.getItem = jest.fn().mockReturnValue(value);
      expect(storageUseCase.get(key)).toBe(value);
    });
  });

  describe("set", () => {
    it("should call storage.setItem with the provided key and value", () => {
      const key = "test-key";
      const value = "test-value";
      storageUseCase.set(key, value);
      expect(mockStorage.setItem).toHaveBeenCalledWith(key, value);
    });
  });

  describe("remove", () => {
    it("should call storage.removeItem with the provided key", () => {
      const key = "test-key";
      storageUseCase.remove(key);
      expect(mockStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });
});
