<template>
  <a-form
    :id="FORM_ID"
    ref="root"
    class="grid grid-cols-12 gap-x-3 gap-y-1.5"
    v-bind="$attrs"
    :model="model"
    layout="vertical"
  >
    <template v-if="Array.isArray(props.schema)">
      <a-form-item
        v-for="field in props.schema"
        :key="field.key"
        :name="field.key"
        v-bind="pick(FORM_ITEM_PROPS, field)"
        class="col-span-12"
      >
        <component
          ref="children"
          :is="$slots[ITEM_PREFIX + field.key] ? $slots[ITEM_PREFIX + field.key] : COMPONENTS[field.type]"
          v-model="model[field.key]"
          v-bind="omit(FORM_ITEM_PROPS, field)"
        />
      </a-form-item>
    </template>
    <template v-else>
      <a-form-item v-bind="pick(FORM_ITEM_PROPS, props.schema)" name="default" key="default" class="col-span-12">
        <component
          ref="children"
          :is="$slots.item ? $slots.item : COMPONENTS[props.schema.type]"
          v-model="model"
          v-bind="omit(FORM_ITEM_PROPS, props.schema)"
        />
      </a-form-item>
    </template>
  </a-form>
</template>

<script setup>
  import pick from 'lodash/fp/pick'
  import omit from 'lodash/fp/omit'
  const root = ref()
  const FORM_ID = 'f' + Date.now()
  const ERROR_CLASS = 'ant-form-item-has-error'
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
  const ITEM_PREFIX = 'item.'
  const COMPONENTS = {
    number: resolveComponent('v-number'),
    string: resolveComponent('v-string'),
    text: resolveComponent('v-text'),
    html: resolveComponent('v-html'),
    radio: resolveComponent('v-radio'),
    switch: resolveComponent('v-switch'),
    checkbox: resolveComponent('v-checkbox'),
    file: resolveComponent('v-file'),
    date: resolveComponent('v-date'),
    range: resolveComponent('v-range'),
    select: resolveComponent('a-select'),
    form: resolveComponent('v-form'),
  }

  const props = defineProps({
    schema: {
      type: [Object, Array],
      default: () => null,
    },
  })

  const children = ref([])
  const model = defineModel()

  defineExpose({
    async validate(scroll = true) {
      try {
        const [data] = await Promise.all([
          root.value.validate(),
          // ...children.value.map((child) => child?.validate?.(false)),
        ])
        return Array.isArray(props.schema) ? data : data.value
      } catch (e) {
        if (scroll)
          document.querySelector(`#${FORM_ID} .${ERROR_CLASS}`).scrollIntoView({ behavior: 'smooth', block: 'start' })
        throw e
      }
    },
    getData() {
      return getRaw(model)
    },
  })
</script>
