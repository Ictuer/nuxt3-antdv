<template>
  <a-checkbox-group v-model:value="model" v-bind="$attrs" class="flex flex-wrap"></a-checkbox-group>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({})
</script>
