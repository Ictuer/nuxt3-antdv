<template>
  <a-modal v-model:open="open" :confirm-loading="pending" @ok="onOk" v-bind="$attrs">
    <template v-for="(_, name) in $slots" v-slot:[name]="slotProps = {}">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>
  </a-modal>
</template>

<script setup>
  const attrs = useAttrs()
  const open = defineModel('open')
  const pending = ref(false)

  const onOk = async () => {
    pending.value = true
    try {
      const closeAfterOk = await attrs.onOk?.()
      if (closeAfterOk) {
        open.value = false
      }
    } catch {}
    pending.value = false
  }
</script>
