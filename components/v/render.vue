<template>
  <component v-if="isVNode(content)" :is="content" :data="data" />
  <template v-else>{{ content }}</template>
</template>

<script setup>
  import { isVNode } from 'vue'
  const props = defineProps({
    render: null,
    data: null,
  })
  const content = typeof props.render === 'function' ? props.render(props.data) : props.render
</script>
