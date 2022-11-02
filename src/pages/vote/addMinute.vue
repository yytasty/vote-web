<template>
  <div class="addScore">
    <div class="top">
      <div class="name">
        {{ name }}
      </div>
    </div>
    <el-divider />
    <div class="form" v-loading="loading">
      <div class="item" v-for="item in scoreList" :key="item.id">
        <div class="name">{{ item.name }}（{{ item.maxScore }}分）：</div>
        <div class="msg">{{ item.standard }}</div>
        <div class="num">
          <el-slider
            v-model="item.score"
            show-input
            :step="0.5"
            :max="item.maxScore"
          />
        </div>
      </div>
    </div>
    <el-divider />
    <div class="handle">
      <!-- <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        :icon="InfoFilled"
        icon-color="#626AEF"
        :title="`你确定要提交当前评价吗？`"
        @confirm="handleSubmit(element)"
      >
        <template #reference>
          <el-button type="primary" :loading="loading"
            >确定（总分：{{ sum }} 分）</el-button
          >
        </template>
      </el-popconfirm> -->
      <el-button type="primary" :loading="loading" @click="handleMessage"
        >提交（总分：{{ sum }} 分）</el-button
      >
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, onMounted, computed } from 'vue';
  import { Search, Plus } from '@element-plus/icons-vue';
  import { useRoute } from 'vue-router';
  const { router, fetch, message } = inject('global');

  const scoreList = ref([]);
  const id = ref('');
  const name = ref('');
  const loading = ref(false);
  const sum = computed(() => {
    let num = 0;
    scoreList.value.forEach((element) => {
      num += element.score || 0;
    });
    console.log(num);
    return num;
  });

  // 确认
  function handleSubmit() {
    loading.value = true;
    fetch
      .post('/app/vote/v2', {
        judgeId: localStorage.getItem('judgeId'),
        judgeRoleId: localStorage.getItem('judgeRoleId'),
        contestantId: id.value,
        scoreList: scoreList.value.map((v) => {
          return {
            ruleItemId: v.id,
            score: v.score,
          };
        }),
      })
      .then((res) => {
        if (res.data) {
          ElMessage.success('提交成功');
          router.go(-1);
        } else {
          ElMessage.error(res?.msg || '提交失败');
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  // 点击提交
  function handleMessage() {
    ElMessageBox.confirm('', '确认提交', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'info',
    }).then(() => {
      handleSubmit();
    });
  }

  // 获取列表
  function getList() {
    loading.value = true;
    fetch
      .get(`/app/ruleItem?judgeRoleId=${localStorage.getItem('judgeRoleId')}`)
      .then((res) => {
        scoreList.value = res.data.map((v) => {
          v.score = 0;
          return v;
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  onMounted(() => {
    getList();
    const route = useRoute();
    id.value = route.query.id;
    name.value = route.query.name;
  });
</script>

<style lang="less" scoped>
  .addScore {
    font-size: 14px;
    padding-bottom: 20px;
    .top {
      text-align: center;
      font-size: 16px;
      padding-top: 20px;
    }
    .form {
      padding: 0 20px;
      .item {
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        .msg {
          // text-indent: 2em;
          font-size: 12px;
          padding: 10px 0;
          color: #999;
        }
        .num {
          padding-left: 20px;
        }
      }
      /deep/.el-input-number {
        width: 120px;
      }
    }
    .handle {
      padding: 0 20px;
      .el-button {
        width: 100%;
      }
    }
  }
</style>
