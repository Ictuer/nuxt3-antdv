import { App, message, notification } from 'ant-design-vue/es'

export const useModal = () => {
  const { modal } = App.useApp()
  return modal
}

export const useMessage = () => message
export const useNotify = () => notification
