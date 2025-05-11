export default class NetworkError extends Error {
  code: string;
  shouldHandled: boolean = true;

  constructor({ code }: { code: string }) {
    super();
    this.code = code;
  }
}
