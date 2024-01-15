<template>
  <a-range-picker v-model:value="model" v-bind="$attrs"></a-range-picker>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({})
</script>
