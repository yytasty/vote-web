<template>
  <div class="addScore">
    <div class="name">
      <el-form label-width="100px" label-position="left" v-loading="loading">
        <el-form-item label="评分项：">
          <el-input v-model="name"  />
        </el-form-item>
        <el-form-item label="可评人员：">
          <el-radio-group v-model="available" class="ml-4">
            <el-radio :label="0">不区分</el-radio>
            <el-radio :label="1">评委</el-radio>
            <el-radio :label="2">观众</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="满分：">
          <el-input-number v-model="maxScore" :min="1" :max="999" @change="handleChange" />
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div class="handle">
      <el-button  type="primary" @click="handleSubmit" :loading="loading"
       :disabled="name.length==0||name.length>30">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { inject, ref , onMounted} from 'vue'
import { Search, Plus, Message } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const { router, fetch, message } = inject('global')

const name = ref('')
const available = ref(0)
const maxScore = ref(1)
const id = ref('')
const loading = ref(false)

// 点击提交
function handleSubmit(url){
  if(id.value){
    loading.value = true
    fetch.put('/admin/ruleItem',{
      name:name.value,
      available:available.value,
      maxScore: maxScore.value,
      id: id.value
    }).then(res=>{
      ElMessage.success('修改成功')
      router.go(-1)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      loading.value = false
    })
    return 
  }
  loading.value = true
  fetch.post('/admin/ruleItem',{
    name:name.value,
    available:available.value,
    maxScore: maxScore.value
  }).then(res=>{
    ElMessage.success('添加成功')
    router.go(-1)
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

// 获取详情
function getInfo(id){
  loading.value = true
  fetch.get(`/admin/ruleItem/${id}`
  ).then(res=>{
    if(res.data?.id){
      name.value = res.data?.name
      available.value = res.data?.available
      maxScore.value = res.data?.maxScore
    }
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

onMounted(()=>{
  const route = useRoute()
  id.value = route.query.id
  if(id.value){
    getInfo(id.value)
  }
})

</script>

<style lang="less" scoped>
.addScore {
  font-size: 12px;
  .name{
    padding: 20px 20px 0 20px;
  }
  .handle{
    padding: 0 20px;
    .el-button{
      width: 100%;
    }
  }
}

</style>
