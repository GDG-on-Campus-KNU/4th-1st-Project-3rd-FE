import ErrorStore from '@_/fetches/ErrorStore';

import UnexpectedNetworkError from './UnexpectedNetworkError';

export default class AuthErrorStore extends ErrorStore<UnexpectedNetworkError> {}
