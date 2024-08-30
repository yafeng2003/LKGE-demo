<template>
    <el-menu
      :default-active="activeMenu"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleMenuSelect"
      background-color="#f5f7fa"
      text-color="#333"
      active-text-color="#409EFF"
      border-bottom="1px solid #dcdfe6"
    >
      <el-menu-item index="complaints">投诉</el-menu-item>
      <el-menu-item index="knowledge">知识图谱</el-menu-item>
    </el-menu>
  </template>
  
  <script>
  export default {
    props: {
      activeMenu: String
    },
    methods: {
      handleMenuSelect(index) {
        this.$emit('select', index);
      }
    }
  };
  </script>
  