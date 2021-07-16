import axios from 'axios';
import faker from 'faker';

interface MockAxiosResult {
  mockedAxios: jest.Mocked<typeof axios>;
  mockedAxiosResult: Record<string, any>;
}

export function mockAxios(): MockAxiosResult {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.datatype.number(500),
  };

  mockedAxios.post.mockResolvedValue(mockedAxiosResult);

  return {
    mockedAxios,
    mockedAxiosResult,
  };
}
