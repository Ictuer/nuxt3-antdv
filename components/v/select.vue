<template>
  <a-select v-model:value="model" v-bind="$attrs"></a-select>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps()
</script>
