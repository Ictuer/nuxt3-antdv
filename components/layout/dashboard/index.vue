<template>
  <a-layout>
    <a-layout-sider
      :collapsed="collapsed"
      class="border-0 border-r border-solid border-gray-200 bg-white"
      :trigger="null"
      collapsible
      width="300"
      breakpoint="md"
      :collapsed-width="collapsedWidth"
    >
      <div
        class="flex h-16 cursor-pointer items-center gap-1"
        :class="collapsed ? 'justify-center font-extrabold' : 'mx-6'"
      >
        <img src="/logo.png" class="w-10" />
        <a-typography-title
          v-if="!collapsed"
          :level="2"
          class="m-0 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
        >
          Hahaha
        </a-typography-title>
      </div>
      <a-menu :selected-keys="[$route.name]" class="border-0">
        <a-menu-item v-for="item in menu" :key="item.page">
          <nuxt-link :to="{ name: item.page }">
            <component :is="item.icon" class="text-base" />
            <span>{{ item.label }}</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        has-sider
        class="flex w-full items-center justify-between border-0 border-b border-solid border-gray-200 bg-white p-0 px-6"
      >
        <span class="cursor-pointer text-lg hover:text-blue-600" @click="collapsed = !collapsed">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
        </span>
        <div class="space-x-6">
          <a-dropdown placement="topRight" arrow>
            <a-badge dot>
              <notification-outlined class="text-base" />
            </a-badge>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">3rd menu item</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <a-dropdown placement="topLeft" arrow>
            <user-outlined class="text-base" />
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">3rd menu item</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="h-[calc(100vh-4rem)] overflow-auto">
        <slot name="header"></slot>
        <div class="mt-4 px-5">
          <div>
            <div class="max-w-full overflow-x-auto">
              <slot></slot>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="jsx">
  const layoutStore = useLayoutStore()
  const breakpoints = useBreakpoints()
  const menu = [
    {
      label: 'Thể loại',
      icon: () => <folder-open-outlined />,
      page: 'dashboard-categories',
    },
    {
      label: 'Sản phẩm',
      icon: () => <skin-outlined />,
      page: 'dashboard-products',
    },
    {
      label: 'Tài khoản',
      icon: () => <schedule-outlined />,
      page: 'dashboard-accounts',
    },
    {
      label: 'Đơn hàng',
      icon: () => <shopping-cart-outlined />,
      page: 'dashboard-orders',
    },
    {
      label: 'Gắn thẻ',
      icon: () => <tag-outlined />,
      page: 'dashboard-tags',
    },
    {
      label: 'Thành viên',
      icon: () => <team-outlined />,
      page: 'dashboard-users',
    },
    {
      label: 'Nạp tiền',
      icon: () => <money-collect-outlined />,
      page: 'dashboard-transactions',
    },
    {
      label: 'Tiếp thị',
      icon: () => <cluster-outlined />,
      page: 'dashboard-affiliates',
    },
    {
      label: 'Cài đặt',
      icon: () => <setting-outlined />,
      page: 'dashboard-settings',
    },
  ]
  const collapsed = ref(breakpoints.isSmaller('lg'))
  const collapsedWidth = computed(() => (breakpoints.isGreaterOrEqual('lg') ? undefined : 0))
</script>
