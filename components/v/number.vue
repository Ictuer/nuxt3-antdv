<template>
  <a-input-number v-model:value="model" class="w-full" v-bind="$attrs"></a-input-number>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps()
</script>
