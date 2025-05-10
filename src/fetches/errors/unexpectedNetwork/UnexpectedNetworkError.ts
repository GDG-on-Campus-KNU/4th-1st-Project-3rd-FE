import NetworkError from '../NetworkError';

export default class UnexpectedNetworkError extends NetworkError {
  constructor() {
    super({ code: 'none' });
  }
}
