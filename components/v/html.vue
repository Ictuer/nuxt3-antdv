<template>
  <quill-editor
    ref="root"
    v-bind="$attrs"
    :id="['form', 'item', ...$attrs.path].join('_')"
    toolbar="essential"
    v-model:content="model"
    content-type="html"
  />
</template>

<script setup>
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import { QuillEditor } from '@vueup/vue-quill'
  import { useInjectFormItemContext } from 'ant-design-vue/es/form'

  const formItemContext = useInjectFormItemContext()
  const model = defineModel()
  const root = ref()
  watch(model, () => {
    model.value = root.value.getText() === '\n' ? '' : root.value.getHTML()
    formItemContext.onFieldChange()
  })

  const focus = () => root.value.focus()

  defineExpose({
    focus,
  })
</script>

<style>
  .ql-container,
  .ql-toolbar {
    border: 1px solid #d9d9d9 !important;
    border-radius: 8px;
  }

  .ql-container {
    margin-top: 5px;
  }

  .ql-editor {
    min-height: 100px;
  }

  .ql-container:hover,
  .ql-container:focus-within {
    border-color: #40a9ff !important;
  }

  .ant-form-item-has-error .ql-container {
    border-color: #ff4d4f !important;
  }
</style>
