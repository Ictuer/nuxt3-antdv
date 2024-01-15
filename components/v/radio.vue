<template>
  <a-radio-group v-model:value="model" v-bind="$attrs"></a-radio-group>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps()
</script>
