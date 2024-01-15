<template>
  <v-table
    :dataSource="data"
    :loading="pending"
    :row-selection="rowSelection"
    :columns="props.columns"
    bordered
    :scroll="{ y: 432 }"
    @change="onChange"
  >
    <template #column.action="data">
      <a-dropdown placement="left">
        <div class="text-center">
          <a-button shape="circle" type="text">
            <template #icon>
              <more-outlined />
            </template>
          </a-button>
        </div>
        <template #overlay v-if="actions.length">
          <a-menu>
            <a-menu-item v-for="action in actions" :key="action.text" v-bind="action" @click="action.execute?.({ index: data.index, value: getRaw(data.record), column: data.column })">
              {{ action.text }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <template v-if="bulkActions.length" #footer>
      <a-flex justify="end" wrap="wrap" gap="12">
        <a-button
          v-for="(action, index) in bulkActions"
          :key="action.text "
          :loading="bulkActionLoading === index"
          :disabled="
            (bulkActionLoading !== null && bulkActionLoading !== index) ||
            selectedRowKeys.length === 0 ||
            (action.enable && selectedRows.some((item) => !action.enable(item)))
          "
          v-bind="action"
        >
          {{ action.text }}
        </a-button>
      </a-flex>
    </template>
  </v-table>
</template>

<script setup>
  const props = defineProps({
    columns: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Array,
      default: () => [],
    },
    bulkActions: {
      type: Array,
      default: () => [],
    },
  })

  const bulkActions = props.bulkActions.map((action, index) => {
    const execute = async () => {
      bulkActionLoading.value = index
      await action?.execute(selectedRows.value)
      bulkActionLoading.value = null
    }
    return { ...action, onClick: execute, execute: undefined }
  })

  const bulkActionLoading = ref(null)

  const query = reactive({
    page: 2,
    results: 1000,
    sortField: ['name'],
    sortOrder: ['ascend'],
  })

  const { data, pending, refresh } = useFetch(`https://randomuser.me/api?noinfo`, {
    query,
    default: () => [],
    transform: (data) =>
      data.results.map((item) => {
        return {
          key: item.login.uuid,
          name: `${item.name.first} ${item.name.last}`,
          gender: item.gender,
          location: item.location.country,
          email: item.email,
        }
      }),
  })

  const onChange = (page, filters, sorter) => {
    query.sortField = [sorter.field]
    query.sortOrder = [sorter.order]
    query.gender = filters.gender || undefined
  }

  const selectedRowKeys = ref([])
  const selectedRows = computed(() => data.value.filter((item) => selectedRowKeys.value.includes(item.key)).map(getRaw))
  const rowSelection = computed(() => {
    return {
      selectedRowKeys: unref(selectedRowKeys),
      onChange: (changableRowKeys) => {
        selectedRowKeys.value = changableRowKeys
      },
    }
  })
</script>
