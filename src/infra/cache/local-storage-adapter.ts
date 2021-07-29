/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EncryptStorage } from 'encrypt-storage';

import { SetStorage } from 'data/protocols/cache/set-storage';

const { REACT_APP_ENCRYPT_KEY, REACT_APP_LOCAL_STORAGE_PREFIX } = process.env;

export const safeStorage = EncryptStorage(REACT_APP_ENCRYPT_KEY, {
  prefix: REACT_APP_LOCAL_STORAGE_PREFIX,
});

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    safeStorage.setItem(key, value);
  }
}
