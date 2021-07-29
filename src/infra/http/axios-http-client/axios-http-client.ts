import axios, { AxiosResponse } from 'axios';

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
    let httpResponse: AxiosResponse<R>;

    try {
      httpResponse = await axios.post<R>(url, body);

      return {
        statusCode: httpResponse.status,
        body: httpResponse.data,
      };
    } catch ({ response }) {
      httpResponse = response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
