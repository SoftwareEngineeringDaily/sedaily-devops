import { MethodNotImplemented } from './APIError';

class Consumer {

  subscribe(args, callback, errorCallback) {
    throw MethodNotImplemented();
  }

  unsubscribe(args, callback, errorCallback) {
    throw MethodNotImplemented();
  }
}


export default { Consumer };
