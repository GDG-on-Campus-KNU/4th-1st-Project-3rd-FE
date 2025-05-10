export default class NetworkError extends Error {
  code: string;
  shouldHandled: boolean = false;

  constructor({ code }: { code: string }) {
    super();
    this.code = code;
  }
}
