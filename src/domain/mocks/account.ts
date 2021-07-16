import faker from 'faker';

import { AccountModel } from 'domain/models';
import { AuthenticationParams } from 'domain/usecases';

export function mockAuthenticationParams(): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function mockAccountModel(): AccountModel {
  return {
    accessToken: faker.datatype.uuid(),
  };
}
