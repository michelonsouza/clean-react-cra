import { mockAccountModel } from 'domain/mocks';
import { AccountModel } from 'domain/models';
import { Authentication, AuthenticationParams } from 'domain/usecases';

export class AuthenticationSpy implements Authentication {
  private account = mockAccountModel();

  params?: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
