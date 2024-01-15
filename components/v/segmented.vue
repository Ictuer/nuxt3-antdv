<template>
  <div ref="root" class="max-w-full overflow-auto rounded-md" style="{'--border-color': 'green'}">
    <a-segmented v-model:value="model" :options="props.options" size="large">
      <template #label="{ title, payload = {} }">
        <a-space>
          <span>{{ title }} </span>
          <a-badge v-if="payload.count !== undefined" :color="payload.color" :count="payload.count" class="border-0" />
        </a-space>
      </template>
    </a-segmented>
  </div>
</template>

<script setup>
  const model = defineModel()
  const props = defineProps({
    options: {
      type: Array,
      default: () => [],
    },
  })
</script>

<style scoped>
  :deep(.ant-badge) > .ant-badge-count {
    box-shadow: none;
  }
</style>
