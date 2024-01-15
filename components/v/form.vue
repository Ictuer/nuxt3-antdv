<template>
  <a-form ref="form" v-bind="$attrs" :model="model" layout="vertical">
    <v-object v-model="model" :schema="[{ ...props.schema, key: 'value' }]" />
  </a-form>
</template>

<script setup>
  const form = ref()
  const props = defineProps({
    schema: {
      type: Object,
      default: () => null,
    },
    value: null,
  })
  const model = reactive({
    value: getRaw(props.value),
  })

  defineExpose({
    async validate() {
      try {
        const { value } = await form.value.validate()
        return value
      } catch (e) {
        form.value.scrollToField(e.errorFields[0].name, { behavior: 'smooth', block: 'center' })
        throw e
      }
    },
    reset() {
      form.value.resetFields()
    },
  })
</script>
