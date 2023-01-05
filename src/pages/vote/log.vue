<template>
  <div class="scoreList">
    <el-card class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="judgeRoleName" label="评委身份名称" />
        <el-table-column prop="contestantName" label="组别" />
        <el-table-column prop="phone" label="评委手机号" />
        <el-table-column prop="name" label="评委名称" />
        <el-table-column prop="score" label="分数" />
      </el-table>
    </el-card>
    <div class="pagination" v-if="list.length > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage"
        :pager-count="3"
      />
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, onMounted, watch } from 'vue';
  import { Search, Plus, Expand } from '@element-plus/icons-vue';
  const { router, fetch } = inject('global');

  const loading = ref(false);
  const list = ref([]);
  const page = ref(1);
  const size = ref(10);
  const total = ref(0);

  // 获取列表
  function getList() {
    loading.value = true;
    fetch
      .get(`/admin/vote/report`, {
        params: {
          page: page.value,
          size: size.value,
        },
      })
      .then((res) => {
        if (res.data) {
          list.value = res.data.records;
          total.value = res.data?.total || 0;
        }
      })
      .catch((err) => {})
      .finally(() => {
        loading.value = false;
      });
  }

  // 改变页数
  function changePage(val) {
    page.value = val;
    getList();
  }

  onMounted(() => {
    getList();
  });
</script>

<style lang="less" scoped>
  .scoreList {
    padding: 10px;
    .table {
      margin: 20px 0;
    }
    .pagination .el-pagination {
      justify-content: center;
    }
  }
</style>
