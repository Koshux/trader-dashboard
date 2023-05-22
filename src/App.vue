<template>
  <main>
    <el-container style="height: 100vh;">
      <el-main>
        <template #default>
          <TheHomeView />
        </template>
      </el-main>
    </el-container>
  </main>
</template>

<script setup lang="ts">
import TheHomeView from '@/views/HomeView.vue'
</script>

<style scoped>
/* html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}

#app {
  height: inherit;
  width: inherit;
} */
</style>
