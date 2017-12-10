import { MethodNotImplemented } from './APIError';

class Producer {
  sendMessage(topic, message, callback) {
    throw MethodNotImplemented();
  }

  disconnect() {
    throw MethodNotImplemented();
  }
}

export default { Producer };
