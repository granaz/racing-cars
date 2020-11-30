export class ResponseBuilder {
  public statusCode: number;

  public body: string;

  constructor(body: any) {
    this.body = body;
  }

  /**
   * ok
   */
  public ok() {
    this.statusCode = 200;

    return this;
  }

  /**
   * badRequest
   */
  public badRequest() {
    this.statusCode = 400;

    return this;
  }

  /**
   * build
   */
  public build() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.body),
    }
  }
}