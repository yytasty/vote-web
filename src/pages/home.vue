<template>
  <div class="home">
    <div class="itemList">
      <div class="item" @click="goPage('/player/list')">
        <el-icon class="img" style="color:#409EFF"><UserFilled /></el-icon>
        <div class="name">选手管理</div>
      </div>
      <div class="item" @click="goPage('/score/list')">
        <el-icon class="img" style="color:#67C23A"><Histogram /></el-icon>
        <div class="name">评分标准</div>
      </div>
      <div class="item" @click="goPage('/statistics')">
        <el-icon class="img" style="color:#E6A23C"><Management /></el-icon>
        <div class="name">统计设置</div>
      </div>
      <div class="item" @click="goPage('/rank')">
        <el-icon class="img" style="color:#F56C6C"><TrendCharts /></el-icon>
        <div class="name">数据展示</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { UserFilled, Histogram, Management, TrendCharts } from '@element-plus/icons-vue'
const { router, fetch } = inject('global')

function goPage(url){
  router.push(url)
}


</script>

<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  height: 100vh;
  font-size: 16px;
  width: 100%;
  .itemList{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .item{
      width: 50%;
      padding: 10px;
      text-align: center;
      .img{
        width: 80px;
        height: 80px;
        border-radius: 5px;
        font-size: 50px;
      }
    }
  }
}
</style>
