import { MethodNotImplemented } from './APIError';

class Consumer {
  subscribe(args, callback) {
    throw MethodNotImplemented();
  }

  unsubscribe(args, callback) {
    throw MethodNotImplemented();
  }

  getSlice(args, callback) {
    throw MethodNotImplemented();
  }

  disconnect() {
    throw MethodNotImplemented();
  }
}


export default { Consumer };
