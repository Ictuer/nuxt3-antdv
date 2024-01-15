<template>
  <a-switch v-model:checked="model" v-bind="$attrs"></a-switch>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({})
</script>
