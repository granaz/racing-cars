import { RcErrors, ResponseError } from "./ResponseError.service";

export class ResponseBuilder {
  public statusCode: number;

  public body;

  public Error: RcErrors;

  constructor(body?: any) {
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
    if (this.Error) {
      this.statusCode = this.Error.statusCode;
      this.body = {
        errors: [
          {
            code: this.Error.code,
            message: this.Error.message,
          }
        ]
      }
    }

    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.body),
    }
  }

  /**
   * addError
   */
  public addError(err: RcErrors) {
    if (err.code && err.message && err.statusCode) {      
      this.Error = err;
    } else {
      this.Error = new RcErrors(ResponseError.INTERNAL_SERVER_ERROR);
    }

    return this;
  }
}