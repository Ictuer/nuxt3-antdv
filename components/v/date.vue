<template>
  <a-date-picker v-model:value="model" v-bind="$attrs"></a-date-picker>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({})
</script>
