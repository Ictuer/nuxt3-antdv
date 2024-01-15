<template>
  <a-table ref="table" :columns="customColumns" v-bind="$attrs">
    <template
      #customFilterDropdown="{
        prefixCls,
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        filters,
        visible,
        column,
        close,
      }"
    >
      <v-table-filter
        v-if="column.filter?.schema"
        :schema="column.filter?.schema"
        v-bind="{
          prefixCls,
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          filters,
          visible,
          column,
          close,
        }"
      />
    </template>

    <template #bodyCell="{ index, text, value, record, column }">
      <component
        v-if="columnsSlots[column.key] || column.render"
        :is="columnsSlots[column.key] || column.render"
        :index="index"
        :text="text"
        :value="value"
        :record="record"
        :column="column"
      />
      <template v-else> {{ text }} </template>
    </template>
    <template v-for="[name] in tableSlots" #[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
  </a-table>
</template>

<script setup>
  const COLUMN_PREFIX = 'column.'

  const table = ref()
  const slots = useSlots()
  const props = defineProps({
    columns: {
      type: Array,
      default: () => [],
    },
  })

  const customColumns = computed(() =>
    props.columns.map((column) => {
      return {
        ...column,
        filteredValue: column.filter?.value,
        customFilterDropdown: !!column.filter?.schema,
        dataIndex: column.key,
      }
    }),
  )

  const columnsSlots = computed(() =>
    Object.fromEntries(
      Object.keys(slots)
        .filter((key) => key.startsWith(COLUMN_PREFIX))
        .map((key) => [key.slice(COLUMN_PREFIX.length), slots[key]]),
    ),
  )

  const skipSlots = ['customFilterDropdown', 'headerCell', 'bodyCell']
  const tableSlots = computed(() =>
    Object.keys(slots)
      .filter((key) => !key.startsWith(COLUMN_PREFIX) && !skipSlots.includes(key))
      .map((key) => [key, slots[key]]),
  )
</script>
