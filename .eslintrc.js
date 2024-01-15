module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'no-undef': 'off',
  },
  root: true,
}
