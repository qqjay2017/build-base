import { message, notification } from 'antd';
import { get } from 'lodash-es';

function antNotification(t, msg) {
  const mess = { success: '成功', info: '信息', warning: '警告', error: '错误' };
  notification.open({
    type: t,
    message: mess[t],
    description: msg,
  });
}

 function antMessage(t, msg) {
  if (t == 'success') {
    message.success(msg);
  } else if (t == 'error') {
    message.error(msg);
  } else if (t == 'warning') {
    message.warning(msg);
  }
}
export function onError(code: number, body = {}) {
  const originMsg = get(body, 'message', '服务器内部错误');
  if (code === 401) {
    sessionStorage.clear();
    window.location.reload();
  } else if (code === 403) {
    antNotification('error', '没有权限，请联系管理员授权');
  } else if (code === 500) {
    antNotification('error', originMsg === 'error.' ? '服务器内部错误' : originMsg);
  } else if (code === 400) {
  } else {
    antMessage('error', originMsg);
  }
}
