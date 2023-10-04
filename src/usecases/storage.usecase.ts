interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class StorageUseCase {
  constructor(private storage: IStorage) {}

  get(key: string): string | null {
    return this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    return this.storage.removeItem(key);
  }
}

export default new StorageUseCase(localStorage);
