<template>
  <div class="scoreList" v-loading="loading">
    <div class="title">请登录</div>
    <div class="item">
      <el-form  label-width="6em">
        <el-form-item label="名称：">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="phone" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="handleLogin" :loading="loading"
          :disabled="name.length==0||phone.length==0">点我登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { Search, Plus, Expand } from '@element-plus/icons-vue'
const { router, fetch } = inject('global')

const loading = ref(false)
const name = ref('')
const phone = ref('')

// 点击选择
function handleLogin(item){
  loading.value = true
  fetch.post(`/app/vote/phoneLogin`,{phone:phone.value,name:name.value}).then(res=>{
    if(res.data){
      ElMessage.success('登录成功')
      localStorage.setItem('phone',res.data.phone)
      localStorage.setItem('name',res.data.name)
      localStorage.setItem('judgeRoleId',res.data.judgeRoleId)
      jumpVote()
    }else{
      ElMessage.error(res.msg||'登录失败')
    }
  }).catch(err=>{
    ElMessage.error(err.msg||'登录失败')
  }).finally(()=>{
    loading.value = false
  })
}

// 跳转投票页面
function jumpVote(){
  router.push('/vote/list')
}

if(localStorage.getItem('phone')){
  jumpVote()
}

onMounted(()=>{

})


</script>

<style lang="less" scoped>
.scoreList {
  height: 100vh;
  overflow-y: auto;
  width: 100vw;
  font-size: 14px;
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color:palevioletred;
    padding: 10px;
  }
  .item{
    margin: 100px 10px;
    position: relative;
    padding: 20px 20px 20px 20px;
    box-shadow:  var(--el-box-shadow-light);
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
}
</style>
