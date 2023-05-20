<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px">
      <el-menu default-active="1" class="el-menu-vertical">
        <el-menu-item index="1">Home</el-menu-item>
      </el-menu>
    </el-aside>
    <main ref="chartContainer">
      <TheDashboard />
    </main>
  </el-container>
</template>

<script setup lang="ts">
import TheDashboard from '@/components/TheDashboard.vue'
</script>

<style scoped>
main {
  padding: 20px;
  background-color: #fff;
  overflow: auto;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

