<template>
  <div>
    {{ { a } }} {{ { b } }} {{ console.log(OK) }}
    <!-- <component :is="OK" :b="b" class="bg-green-500" v-model:a="a" v-model:b="b" /> -->
    <OK />
  </div>
</template>

<script setup lang="jsx">
  const a = ref(1)
  const b = ref(2)

  const OK = ({ a, 'onUpdate:a': updateA, b, 'onUpdate:b': updateB }) => {
    return (
      <>
        <div onClick={() => updateA(a + 1)}> a + 1</div>
        <div onClick={() => updateB(b + 1)}> b + 1</div>
      </>
    )
  }

  h('div', () => text)

  const columns = [
    {
      render: ({ text }) => <div>{text}</div>,
    },
  ]
</script>
