<template>
  <div class="scoreList" >
    <div class="itemList" v-if="list.length>0 || loading">
      <div class="item" v-for="element in list" :key="element.id">
         11111
      </div>
    </div>
    <el-empty description="暂无记录" v-else>
    </el-empty>
    <div class="pagination" v-if="list.length>0">
      <el-pagination background layout="prev, pager, next" :total="total" 
      @current-change="changePage" :pager-count="3" />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { Search, Plus, Expand } from '@element-plus/icons-vue'
const { router, fetch } = inject('global')

const loading = ref(false)
const list = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)


// 获取列表
function getList(){
  loading.value = true
  fetch.get(`/admin/vote/report`,{
    params:{
      page: page.value,
      size: size.value,
      judgeRoleId: localStorage.getItem('judgeRoleId')
    }
  }).then(res=>{
    if(res.data){
      list.value = res.data.records
      total.value = res.data?.total || 0
    }
  }).catch(err=>{

  }).finally(()=>{
    loading.value = false
  })
}

// 改变页数
function changePage(val){
  page.value = val
  getList()
}


onMounted(()=>{
  getList()
})


</script>

<style lang="less" scoped>
.scoreList {
  height: 100vh;
  overflow-y: auto;
  width: 100vw;
  font-size: 14px;
  .itemList{
    overflow: hidden;
    margin-bottom: 40px ;
    .item{
      margin: 10px;
      position: relative;
      padding: 20px 20px 20px 20px;
      box-shadow:  var(--el-box-shadow-light);
      border-radius: 4px;
      border: 1px solid #ddd;
    }
  }
  .pagination .el-pagination{
    justify-content: center;
  }
}
</style>
