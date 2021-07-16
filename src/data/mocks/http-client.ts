import {
  HttpPostClient,
  HttpPostClientParams,
  HttpResponse,
  HttpStatusCode,
} from 'data/protocols';

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;

  body?: T;

  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };

  async post({ url, body }: HttpPostClientParams<T>): Promise<HttpResponse<R>> {
    this.url = url;
    this.body = body;

    return Promise.resolve(this.response);
  }
}
