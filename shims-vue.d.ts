declare module 'vue' {
  export interface GlobalComponents {
    AButton: import('ant-design-vue/es').Button
    AInput: import('ant-design-vue/es').Input
    ATable: import('ant-design-vue/es').Table
    VTable: import('ant-design-vue/es').Table
  }
}

export {}
