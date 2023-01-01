<template>
  <div class="statistics">
    <div class="name">
      <el-form  label-width="130px" label-position="left"  v-loading="loading">
        <el-form-item label="排名统计方式：">
          <el-radio-group v-model="mode" class="ml-4">
            <el-radio :label="0">平均分</el-radio>
            <el-radio :label="1" >总分</el-radio>
            <el-radio :label="2" >加权平均模式</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="color:red"  v-if="mode==2">提示：加权平均模式，不应用去掉多少个最高分去掉多少个最低分</div>
        <el-form-item label="去除最低分个数：" v-if="mode!=2">
          <el-input-number v-model="removeLowestScore" :min="0" :max="999"  />
          <span style="margin-left:10px">个</span>
        </el-form-item>
        <el-form-item label="去除最高分个数：" v-if="mode!=2">
          <el-input-number v-model="removeHighestScore" :min="0" :max="999"   />
          <span style="margin-left:10px">个</span>
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div class="handle">
      <el-button  type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { inject, ref , onMounted} from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const { router, fetch, message } = inject('global')

const mode = ref(0)
const removeLowestScore = ref(0)
const removeHighestScore = ref(0)
const loading = ref(false)

// 点击提交
function handleSubmit(url){
  loading.value = true
  fetch.put('/admin/statisticsSetting',{
    mode:mode.value,
    removeLowestScore:removeLowestScore.value,
    removeHighestScore: removeHighestScore.value
  }).then(res=>{
    console.log('添加成功')
    router.go(-1)
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

// 获取详情
function getInfo(){
  loading.value = true
  fetch.get(`/admin/statisticsSetting`
  ).then(res=>{
    if(res.data){
      mode.value = res.data?.mode || 0
      removeLowestScore.value = res.data?.removeLowestScore || 0
      removeHighestScore.value = res.data?.removeHighestScore || 0
    }
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

onMounted(()=>{
  getInfo()
})

</script>

<style lang="less" scoped>
.statistics {
  font-size: 14px;
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
