<template>
  <el-row :span="12">
    <el-col class="grid-content">
      <TheHeading />
    </el-col>
  </el-row>

  <el-row :span="24">
    <el-col class="grid-content">
      <TheDashboard />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheDashboard from '@/components/TheDashboard.vue'
import TheHeading from '@/components/TheHeading.vue'
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
}

</style>
