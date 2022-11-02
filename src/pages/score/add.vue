<template>
  <div class="addScore">
    <div class="name">
      <el-form label-width="100px" label-position="left" v-loading="loading">
        <el-form-item label="评分项：">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="standard" type="textarea" :rows="3" />
        </el-form-item>
        <!-- <el-form-item label="可评人员：">
          <el-radio-group v-model="available" class="ml-4">
            <el-radio :label="0">不区分</el-radio>
            <el-radio :label="1">评委</el-radio>
            <el-radio :label="2">观众</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="可评人员：">
          <el-radio-group v-model="judgeRoleId" class="ml-4">
            <el-radio :label="0">所有人</el-radio>
            <el-radio
              style="width: 100%"
              :label="item.id"
              v-for="item in judgeRoleList"
              :key="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="满分：">
          <el-input-number
            v-model="maxScore"
            :min="1"
            :max="999"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div class="handle">
      <el-button type="primary" @click="handleSubmit" :loading="loading"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, onMounted } from 'vue';
  import { Search, Plus, Message } from '@element-plus/icons-vue';
  import { useRoute } from 'vue-router';
  const { router, fetch, message } = inject('global');

  const name = ref('');
  const standard = ref('');
  const maxScore = ref(1);
  const judgeRoleId = ref(0);
  const judgeRoleList = ref([]);
  const id = ref('');
  const loading = ref(false);

  // 点击提交
  function handleSubmit() {
    if (name.value?.length > 30 || name.value?.length == 0) {
      ElMessage.error('评分项名称字数在：1-30之间');
      return;
    }
    if (standard.value?.length > 100 || standard.value?.length == 0) {
      ElMessage.error('描述字数在：1-100之间');
      return;
    }
    if (id.value) {
      loading.value = true;
      fetch
        .put('/admin/ruleItem', {
          name: name.value,
          standard: standard.value,
          judgeRoleId: judgeRoleId.value,
          maxScore: maxScore.value,
          id: id.value,
        })
        .then((res) => {
          ElMessage.success('修改成功');
          router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
      return;
    }
    loading.value = true;
    fetch
      .post('/admin/ruleItem', {
        name: name.value,
        standard: standard.value,
        judgeRoleId: judgeRoleId.value,
        maxScore: maxScore.value,
      })
      .then((res) => {
        ElMessage.success('添加成功');
        router.go(-1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  // 获取详情
  function getInfo(id) {
    loading.value = true;
    fetch
      .get(`/admin/ruleItem/${id}`)
      .then((res) => {
        if (res.data?.id) {
          name.value = res.data?.name || '';
          standard.value = res.data?.standard || '';
          judgeRoleId.value = res.data?.judgeRoleId || 0;
          maxScore.value = res.data?.maxScore || 1;
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  // 获取评委角色列表
  function getjudgeRoleList() {
    loading.value = true;
    fetch
      .get('/admin/judgeRole')
      .then((res) => {
        if (res.data) {
          judgeRoleList.value = res.data;
          if (!judgeRoleId.value) {
            judgeRoleId.value = judgeRoleList.value[0]?.id || 0;
          }
        }
      })
      .catch((err) => {})
      .finally(() => {
        loading.value = false;
      });
  }

  onMounted(() => {
    getjudgeRoleList();
    const route = useRoute();
    id.value = route.query.id;
    if (id.value) {
      getInfo(id.value);
    }
  });
</script>

<style lang="less" scoped>
  .addScore {
    font-size: 12px;
    .name {
      padding: 20px 20px 0 20px;
    }
    .handle {
      padding: 0 20px;
      .el-button {
        width: 100%;
      }
    }
  }
</style>
