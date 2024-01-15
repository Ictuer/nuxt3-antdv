<template>
  <layout-dashboard>
    <template #header>
      <a-page-header class="bg-white" title="Danh sách thành viên" @back="$router.go(-1)">
        <template #extra>
          <a-button key="1" type="primary" @click="showModal">
            <template #icon><plus-outlined /></template>
            Primary
          </a-button>
        </template>
      </a-page-header>
    </template>
    <a-button @click="open = !open">open</a-button>
    <v-modal v-model:open="open" @ok="onOk" @cancel="console.log('what')" title="what the ok">
      <v-form
        ref="form"
        :value="single"
        :schema="{ type: 'number', rules: [{ required: true, message: 'fill' }] }"
        :mschema="define"
        class="h-96 overflow-auto"
      />
    </v-modal>
  </layout-dashboard>
</template>

<script setup>
  const form = ref()
  const single = ref(1)
  const multiple = reactive({
    name: 'name',
    age: 17,
    object: {
      pos: {
        x: 1,
        y: 2,
      },
    },
  })
  const define = {
    type: 'object',
    schema: [
      {
        type: 'string',
        label: 'String',
        key: 'string',
        required: true,

        cols: 12,
      },
      { type: 'number', label: 'Number', key: 'number', cols: 12 },
      {
        key: 'object',
        type: 'object',
        cols: 12,
        schema: [
          { key: 'name', label: 'Name', type: 'string', cols: 12 },
          { key: 'age', label: 'Age', type: 'number', cols: 12 },
          {
            key: 'pos',
            type: 'object',
            cols: 12,
            schema: [
              { key: 'x', type: 'number', label: 'X', cols: 12 },
              { key: 'y', type: 'number', label: 'Y', cols: 12 },
              { key: 'z', type: 'number', label: 'Y', cols: 12, required: true },
            ],
          },
        ],
      },
    ],
  }
  /* reactive({
    name: 'name',
    age: 17,
    object: {
      pos: {
        x: 1,
        y: 2,
      },
    },
  }) */
  const formData = reactive({
    form: {
      form: {},
    },
    string: '',
  })
  const onOk = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    // const data = await
    const data = await form.value.validate()
    console.log(data)
  }

  const open = ref(false)

  const message = useMessage()
  const notify = useNotify()

  const schema = [
    // {
    //   key: 'number',
    //   label: 'Number',
    //   type: 'number',
    //   class: 'col-span-6',
    //   rules: [{ required: true, message: 'kkk' }],
    // },
    {
      key: 'string',
      label: 'String',
      type: 'string',
      class: 'col-span-6',
      rules: [],
    },
    {
      key: 'text',
      label: 'Text',
      type: 'text',
      class: 'col-span-12',
      rules: [],
    },
    {
      key: 'html',
      label: 'HTML',
      type: 'html',
      class: 'col-span-12',
      rules: [{ required: true, message: 'kkk' }],
    },
    {
      key: 'radio',
      label: 'Radio',
      type: 'radio',
      class: 'col-span-12',
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
      class: 'col-span-12',
      rules: [],
      checkedChildren: 'Yes',
      unCheckedChildren: 'No',
    },
    {
      key: 'checkbox',
      label: 'Checkbox',
      type: 'checkbox',
      class: 'col-span-12',
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
      class: 'col-span-12',
      rules: [],
    },
    {
      key: 'select',
      label: 'Select',
      type: 'select',
      class: 'w-full',
      class: 'col-span-12',
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
      class: 'col-span-12',
      // rules: [{ required: true, message: 'kkk' }],
    },
    {
      key: 'form',
      type: 'form',
      label: 'Range',
      schema: [
        {
          key: 'form',
          type: 'form',
          label: 'Range',
          class: 'col-span-4',
          schema: [
            {
              key: 'text',
              type: 'text',
              class: 'col-span-6 h-full',
              required: true,
            },
            {
              key: 'html',
              type: 'html',
              class: 'col-span-6',
            },
          ],
        },
        {
          key: 'text',
          type: 'text',
          class: 'col-span-4 h-full',
          required: true,
        },
        {
          key: 'html',
          type: 'html',
          class: 'col-span-4',
          required: true,
        },
      ],
    },
  ]
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
</script>
