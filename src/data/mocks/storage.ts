import { SetStorage } from 'data/protocols';

export class SetStorageMock implements SetStorage {
  key = '';

  value: any = '';

  async set(key: string, value: string | number): Promise<void> {
    this.key = key;
    this.value = value;
  }
}
