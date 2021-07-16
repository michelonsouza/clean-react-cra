import faker from 'faker';

import { HttpPostClientParams } from 'data/protocols';

export function mockPostRequestParams(
  hasBody = true,
): HttpPostClientParams<any> {
  const body = hasBody
    ? faker.random.objectElement({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    : undefined;

  return {
    url: faker.internet.url(),
    body,
  };
}
