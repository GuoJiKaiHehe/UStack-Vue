import { Notification } from 'element-ui';
export function msg(type,title,message) {
  Notification[type]({
    title: title,
    message: message
  })
}
