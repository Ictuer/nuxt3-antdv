<template>
  <a-textarea v-model:value="model" v-bind="$attrs"></a-textarea>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({})
</script>
