import { SaveAccessToken } from 'domain/usecases';

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string | null = null;

  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}
