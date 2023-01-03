<template>
  <div class="addPlayer">
    <!-- <div class="img">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="img" :src="img" class="avatar" />
        <div class="addIcon" v-else>
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          <div class="msg">上传图片</div>
        </div>
      </el-upload>
    </div> -->
    <div class="name" v-loading="loading">
      <el-form  label-width="8em">
        <el-form-item label="评委角色：">
          <el-input v-model="judgeRoleName" disabled />
        </el-form-item>
        <el-form-item label="评委名称：">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="phone" />
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div class="handle">
      <el-button type="primary" @click="handleSubmit" :loading="loading"
      :disabled="name.length==0||name.length>30">确定</el-button>
    </div>
  </div>
</template>

<script setup>
import { inject, ref,onMounted  } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const { router, fetch } = inject('global')

const img = ref('')
const name = ref('')
const phone = ref('')
const judgeRoleId = ref('')
const judgeRoleName = ref('')
const id = ref('')
const loading = ref(false)

// 点击提交
function handleSubmit(){
  const reg = /^1[1-9][0-9]{9}$/
  if(!reg.test(phone.value)){
    ElMessage.error('请填入正确的手机号')
    return 
  }
  if(id.value){
    loading.value = true
    fetch.put('/admin/phoneNameJudgeRoleRelation',{name:name.value, phone:phone.value, id: id.value, judgeRoleId:judgeRoleId.value}).then(res=>{
      if(res.code==0){
        ElMessage.success('修改成功')
        router.go(-1)
      }else{
        ElMessage.error(res?.msg||'修改失败')
      }
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      loading.value = false
    })
    return 
  }
  loading.value = true
  fetch.post('/admin/phoneNameJudgeRoleRelation',{name:name.value, phone:phone.value, judgeRoleId:judgeRoleId.value}).then(res=>{
    if(res.code==0){
      ElMessage.success('添加成功')
      router.go(-1)
    }else{
      ElMessage.error(res?.msg||'修改失败')
    }
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    loading.value = false
  })
}

// 获取详情
function getInfo(id){
  loading.value = true
  fetch.get(`/admin/judgeRole/${id}`
  ).then(res=>{
    if(res.data?.id){
      name.value = res.data.name
      weight.value = res.data.weight
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
  judgeRoleId.value = route.query.judgeRoleId
  judgeRoleName.value = route.query.judgeRoleName
  if(id.value){
    getInfo(id.value)
  }
})

</script>

<style lang="less" scoped>
.addPlayer {
  .img{
    text-align: right;
    padding: 20px 20px 0 20px;
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader /deep/ .el-upload {
      border: 1px solid #999;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader /deep/ .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .addIcon{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 178px;
      height: 178px;
      .el-icon.avatar-uploader-icon{
        font-size: 28px;
        margin-bottom: 10px;
      }
    }
  }
  .name{
    padding: 20px 15px 0 15px;
  }
  .handle{
    padding: 0 20px;
    .tips{
      padding-bottom: 10px;
      color:red;
    }
    .el-button{
      width: 100%;
    }
  }
}

</style>
