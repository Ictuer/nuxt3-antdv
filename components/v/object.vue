<template>
  <div class="grid grid-cols-12 gap-1.5">
    <component
      :is="getWapper(field.type)"
      v-for="field in props.schema"
      :key="field.key"
      :name="[...props.path, field.key]"
      :class="COLS[field.cols]"
      v-bind="pick(FORM_ITEM_PROPS, field)"
    >
      <component
        :is="COMPONENTS[field.type]"
        v-model="model[field.key]"
        v-bind="omit([...FORM_ITEM_PROPS, 'cols'], field)"
        :path="[...props.path, field.key]"
      />
    </component>
  </div>
</template>

<script setup>
  import pick from 'lodash/fp/pick'
  import omit from 'lodash/fp/omit'

  const FORM_ITEM_PROPS = [
    'class',
    'autoLink',
    'colon',
    'extra',
    'hasFeedback',
    'help',
    'htmlFor',
    'label',
    'labelAlign',
    'labelCol',
    'name',
    'required',
    'rules',
    'tooltip',
    'validateFirst',
    'validateStatus',
    'validateTrigger',
    'wrapperCol',
  ]

  const COMPONENTS = {
    number: defineAsyncComponent(() => import('./number')),
    string: defineAsyncComponent(() => import('./string')),
    text: defineAsyncComponent(() => import('./text')),
    html: defineAsyncComponent(() => import('./html')),
    radio: defineAsyncComponent(() => import('./radio')),
    switch: defineAsyncComponent(() => import('./switch')),
    checkbox: defineAsyncComponent(() => import('./checkbox')),
    file: defineAsyncComponent(() => import('./file')),
    date: defineAsyncComponent(() => import('./date')),
    range: defineAsyncComponent(() => import('./range')),
    select: defineAsyncComponent(() => import('./select')),
    object: defineAsyncComponent(() => import('./object')),
  }

  const COLS = {
    undefined: 'col-span-12',
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  }

  const getWapper = (type) => (type === 'object' ? resolveComponent('div') : resolveComponent('a-form-item'))

  const props = defineProps({
    schema: {
      type: Array,
      default: () => [],
    },
    path: {
      type: Array,
      default: () => [],
    },
  })

  const model = defineModel({
    default: () => ({}),
  })
</script>
