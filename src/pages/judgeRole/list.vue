<template>
  <div class="scoreList" v-loading="loading">
    <div class="itemList">
      <div class="item" v-for="element in list" :key="element.id">
        <div class="top">
          <!-- <div class="handleMove">
            <el-icon><Expand /></el-icon>
          </div> -->
          <div class="left">{{element.name}}</div>
          <div class="right">权重：{{ element.weight }} %</div>
        </div>
        <div class="bottom">
          <el-button type="primary" link @click="handleEdit(element)">编辑</el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            :title="`你确定要删除${element.name}吗？`"
            @confirm="handleDelete(element)"
          >
            <template #reference>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <el-card class="add" @click="jumpAddRole">
        <el-icon><Plus /></el-icon>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { Search, Plus, Expand } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'
const { router, fetch } = inject('global')

const searchValue = ref('')
const loading = ref(false)
const list = ref([])

// 改变排序
watch(()=>list.value,()=>{
  changeIndex()
})

// 点击搜索
function handleSearch(url){
  router.push(url)
}

// 获取列表
function getList(){
  loading.value = true
  fetch.get('/admin/judgeRole').then(res=>{
    if(res.data){
      list.value = res.data
    }
  }).catch(err=>{

  }).finally(()=>{
    loading.value = false
  })
}

// 更新排名
function changeIndex(){
  // fetch.post('/admin/judgeRole/sort', list.value.map(v=>v.id))
}

// 点击删除
function handleDelete(item){
  fetch.delete(`/admin/judgeRole/${item.id}`).then(res=>{
    getList()
  })
}

// 跳转添加页面
function jumpAddRole(){
  router.push('/judgeRole/add')
}

// 点击修改
function handleEdit(item){
  router.push(`/judgeRole/add?id=${item.id}`)
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
      .handleMove{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 20;
        font-size: 20px;
      }
      .top{
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
      }
      .bottom{
        display: flex;
        justify-content: space-between;
      }
    }
    .add{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      margin: 10px;
    }
  }
}
</style>
