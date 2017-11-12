import { MethodNotImplemented } from './APIError';

class Producer {
  sendMessage(topic, message, errorCallback) {
    throw MethodNotImplemented();
  }
}

export default { Producer };
