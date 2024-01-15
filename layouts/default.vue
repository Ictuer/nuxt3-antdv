<template>
  <a-config-provider :locale="vi" component-size="middle">
    <a-app>
      <slot></slot>
    </a-app>
  </a-config-provider>
</template>

<script setup>
  import vi from 'ant-design-vue/es/locale/vi_VN'
</script>
