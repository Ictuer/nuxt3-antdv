<template>
  <a-input v-model:value="model" v-bind="$attrs"></a-input>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({})
</script>
