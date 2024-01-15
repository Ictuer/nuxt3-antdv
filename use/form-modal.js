import { App } from 'ant-design-vue/es'
import vForm from '~/components/v/form'

var modal

const show = function ({ onOk, value, schema, form, ...rest }) {
  const content = h(vForm, {
    ...form,
    schema,
    value,
  })

  const instance = modal.confirm({
    icon: null,
    onOk: async () => {
      instance.update({
        cancelButtonProps: {
          disabled: true,
        },
      })
      try {
        return await content.component?.exposed?.validate().then((res) => onOk?.(res))
      } finally {
        instance.update({
          cancelButtonProps: {
            disabled: false,
          },
        })
      }
    },
    content,
    ...rest,
  })

  return instance
}

export const useFormModal = () => {
  modal = modal || App.useApp()?.modal
  if (!modal) {
    throw new Error('Please use useFormModal in outermost component')
  }
  return {
    show,
  }
}
