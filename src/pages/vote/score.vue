<template>
  <div class="scoreList" >
    <el-card class="table">
      <el-table :data="list" style="width: 100%" v-loading="loading">
        <el-table-column prop="contestantName" label="选手名称" />
        <el-table-column prop="currentScore" label="当前分数" />
        <el-table-column prop="score" label="人工分数" >
          <template #default="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.scoreEdit"></el-input>
            <span v-else>{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" >
          <template #default="scope">
            <div style="padding-bottom:10px">
              <el-button type="primary" :loading="loading" size="small" @click="handleEdit(scope.row)">{{scope.row?.isEdit?'保存':'修改'}}</el-button>
            </div>
            <div>
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="#626AEF"
                :title="`你确定要删除${scope.row?.contestantName}的人工分数吗？`"
                @confirm="handleDelete(scope.row)"
              >
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { Search, Plus, Expand, Loading } from '@element-plus/icons-vue'
const { router, fetch } = inject('global')

const loading = ref(false)
const list = ref([])


// 获取列表
function getList(){
  loading.value = true
  fetch.get(`/admin/manualScore`).then(res=>{
    if(res.data){
      list.value = res.data
    }
  }).catch(err=>{

  }).finally(()=>{
    loading.value = false
  })
}

// 点击了修改或者保存
function handleEdit(item){
  // 未修改变修改
  if(!item.isEdit) {
    item.isEdit = true
    item.scoreEdit = item.score
    return 
  }
  if(!Number(item.scoreEdit) || Number(item.scoreEdit) <= 0){
    ElMessage.error('请填入正确的分数！')
    return 
  }
  // 点击保存
  loading.value = true
  fetch.post(`/admin/manualScore`,{contestantId:item.contestantId,score:Number(item.scoreEdit)}).then(res=>{
    if(res.data){
      ElMessage.success('保存成功')
      item.score = item.scoreEdit
      item.isEdit = false
    }else{
      ElMessage.error(res?.msg||'保存失败')
    }
  }).catch(err=>{
    ElMessage.error(err?.msg||'保存失败')
  }).finally(()=>{
    loading.value = false
  })
}

// 点击了删除
function handleDelete(item){
 fetch.delete(`/admin/manualScore/${item.contestantId}`).then(()=>{
  ElMessage.success('删除成功')
  item.score = undefined
 }).finally(()=>{
  item.isEdit = false
 })
}

onMounted(()=>{
  getList()
})


</script>

<style lang="less" scoped>
.scoreList {
  padding: 10px;
  .table{
    margin: 20px 0;
  }
  .pagination .el-pagination{
    justify-content: center;
  }
}
</style>
