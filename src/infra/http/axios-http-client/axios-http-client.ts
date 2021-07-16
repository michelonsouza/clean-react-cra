import axios from 'axios';

import {
  HttpPostClient,
  HttpPostClientParams,
  HttpResponse,
} from 'data/protocols';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post<R = any>({
    url,
    body,
  }: HttpPostClientParams<any>): Promise<HttpResponse<R>> {
    const { data, status } = await axios.post<R>(url, body);

    return {
      statusCode: status,
      body: data,
    };
  }
}
