import { SaveAccessToken } from 'domain/usecases';
import { LocalSaveAccessToken } from 'data/usecases';
import { makeLocalStorageAdapter } from 'main/factories/cache';

export function makeLocalSaveAccessToken(): SaveAccessToken {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
}
