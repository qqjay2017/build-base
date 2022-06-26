export const EventProxy = function () {
  new MinioEvent();
};
// TODO 事件移动到这里面
export default class MinioEvent {
  listeners = {};

  getList(action: string) {
    !this.listeners[action] && (this.listeners[action] = []);

    return this.listeners[action];
  }

  on(action: string, callback) {
    this.getList(action).push(callback);
  }

  off(action: string, callback) {
    const list = this.getList(action);

    for (let i = list.length - 1; i >= 0; i--) {
      callback === list[i] && list.splice(i, 1);
    }
  }
  emit(action: string, data?: any) {
    const list = this.getList(action).map((cb) => {
      return cb;
    });

    for (let i = 0; i < list.length; i++) {
      list[i](data);
    }
  }
}
