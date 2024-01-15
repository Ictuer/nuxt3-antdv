<template>
  <div @keydown.enter="onOk">
    <v-form ref="form" :schema="props.schema" :value="props.value" class="gap-3 p-3" />
    <a-divider class="my-0" />
    <a-flex class="px-3 py-2" justify="space-between">
      <a-button type="text" size="small" danger @click="onClear"> Xoá </a-button>
      <a-button type="primary" size="small" @click="onOk"> OK </a-button>
    </a-flex>
  </div>
</template>

<script setup>
  const form = ref(null)
  const props = defineProps({
    value: null,
    schema: {
      type: Object,
      required: true,
    },
    setSelectedKeys: {
      type: Function,
      required: true,
    },
    selectedKeys: {
      type: Array,
      default: () => [],
    },
    confirm: {
      type: Function,
      required: true,
    },
    clearFilters: {
      type: Function,
      required: true,
    },
    column: {
      type: Object,
    },
  })

  const onOk = async () => {
    const data = await form.value.validate().catch((e) => e)
    if (data instanceof Error) return
    props.setSelectedKeys(data ? [data] : [])
    props.confirm()
  }

  console.log(props.value)

  const onClear = () => {
    form.value.reset()
    props.clearFilters({ confirm: true })
  }
</script>
