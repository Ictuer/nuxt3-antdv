<template>
  <layout-dashboard>
    <template #header>
      <a-page-header class="bg-white" title="Danh sách đơn hàng" @back="$router.go(-1)">
        <template #extra>
          <a-button key="1" type="primary" @click="showModal">
            <template #icon><plus-outlined /></template>
            Primary
          </a-button>
        </template>
      </a-page-header>
    </template>

    <v-segmented
      v-model="mode"
      :options="[
        { value: 0, title: 'Vi phạm ', payload: { color: 'green', count: 99 } },
        { value: 1, title: 'Hoàn tiền', payload: { color: 'blue', count: 99 } },
        { value: 2, title: 'Đang xử lý', payload: { color: 'orange', count: 'kk' } },
        { value: 3, title: 'Hoàn thành', payload: { color: 'cyan', count: 99 } },
        { value: 4, title: 'Khiếu nại', payload: { color: 'red', count: 99 } },
        { value: 5, title: 'Chờ kiểm tra', payload: { color: 'purple', count: 99 } },
      ]"
      class="mb-4 space-x-3"
    />

    <v-table-v2 :columns="columns" :actions="actions" :bulk-actions="bulkActions" />
  </layout-dashboard>
</template>

<script setup lang="jsx">
  const columns = [
    {
      title: 'Name',
      key: 'name',
      fixed: 'left',
      width: 100,
      sorter: true,
    },
    {
      title: 'Gender',
      key: 'gender',
      render: ({ text }) => <a-tag color="pink">{text}</a-tag>,
      width: 100,
      filter: {
        schema: {
          type: 'radio',
          cols: 12,
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
        },
      },
    },
    {
      title: 'Location',
      key: 'location',
      width: 100,
    },
    {
      title: 'Email',
      key: 'email',
      width: 100,
      sorter: (a, b) => a.email > b.email,
    },
    {
      key: 'action',
      width: 30,
      fixed: 'right',
    },
  ]

  const message = useMessage()
  const notify = useNotify()
  const actions = [
    {
      text: 'edit',
      icon: <plus-outlined />,
      execute: (x) => {
        console.log('edit', x)
      },
    },
  ]
  const bulkActions = [
    {
      text: 'Send Mail',
      type: 'primary',
      execute: async (x) => {
        console.log('Send Mail', x)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        message.info('ok', 0)
      },
    },
    {
      text: 'Accept',
      type: 'primary',
      execute: async (x) => {
        console.log('Accept', x)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      },
      enable: (item) => item.gender === 'male',
    },
  ]

  const mode = ref(1)

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
  const onTableChange = (page, filters, sorter) => {
    query.sortField = [sorter.field]
    query.sortOrder = [sorter.order]
    query.gender = filters.gender || undefined
  }

  const schema = {
    type: 'object',
    schema: [
      {
        key: 'number',
        label: 'Number',
        type: 'number',
        class: 'col-span-6',
        rules: [{ required: true, message: 'kkk' }],
      },
      {
        key: 'text',
        label: 'Text',
        type: 'text',
        cols: 6,
        rules: [],
      },
      {
        key: 'html',
        label: 'HTML',
        type: 'html',

        rules: [{ required: true, message: 'kkk' }],
      },
      {
        key: 'radio',
        label: 'Radio',
        type: 'radio',
        cols: 6,
        options: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
          { label: 'C', value: 3 },
        ],
        rules: [],
      },
      {
        key: 'switch',
        label: 'Switch',
        type: 'switch',
        cols: 12,
        rules: [],
        checkedChildren: 'Yes',
        unCheckedChildren: 'No',
      },
      {
        key: 'checkbox',
        label: 'Checkbox',
        type: 'checkbox',

        options: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
          { label: 'C', value: 3 },
        ],
        rules: [],
      },
      {
        key: 'file',
        label: 'File',
        type: 'file',

        rules: [],
      },
      {
        key: 'select',
        label: 'Select',
        type: 'select',
        class: 'w-full',

        options: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
          { label: 'C', value: 3 },
        ],
        rules: [],
      },
      { key: 'date', label: 'Date', type: 'date', class: 'col-span-12' },
      {
        key: 'range',
        label: 'Range',
        type: 'range',

        // rules: [{ required: true, message: 'kkk' }],
      },
    ],
  }
  const formModal = useFormModal()
  const showModal = function () {
    formModal.show({
      title: 'kkkk',
      closable: true,
      centered: true,
      value: form,
      schema,
      form: {
        class: 'h-96 overflow-auto',
      },
      okText: 'Tạo tài khoản',
      onOk: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log(data)
        message.success('thanh cong')
        notify.success({ message: 'kkkk' })
      },
    })
  }

  const form = reactive({
    number: 1,
    radio: 1,
    file: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  })
</script>
