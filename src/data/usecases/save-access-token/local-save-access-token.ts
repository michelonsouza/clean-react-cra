import { SaveAccessToken } from 'domain/usecases/save-access-token';
import { SetStorage } from 'data/protocols';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setSorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setSorage.set('accessToken', accessToken);
  }
}
