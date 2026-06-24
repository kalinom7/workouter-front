export class HttpError extends Error {
  public status: number;
  public endpoint: string;
  public name: string;

  constructor(status: number, message: string, endpoint: string) {
    super(message);
    this.status = status;
    this.endpoint = endpoint;
    this.name = "HttpError";
  }
}