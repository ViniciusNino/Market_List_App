import { IToast } from './interface';

export const getToast = (
  success: boolean = true,
  title: string = 'Recovery email is on the way!',
  text: string = 'Don’t forget to check your spam box'
  ): IToast => {
    return {
      success: success,
      title: title,
      text: text
    }
}
