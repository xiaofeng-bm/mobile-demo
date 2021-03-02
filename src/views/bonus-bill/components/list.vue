<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
        custom-style="color: #7ba79d"
      />
    </van-sticky>
    <el-table :data="list" size="mini">
      <el-table-column label="工号" prop="工号"></el-table-column>
      <el-table-column label="姓名" prop="姓名"></el-table-column>
      <el-table-column label="奖金">
        <template slot-scope="scope">
          <span
            >{{ scope.row['类型'] === 'RSD' ? scope.row['当季封顶后实发绩效奖'] : scope.row['当月封顶后实发绩效奖'] }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleViewDetail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetBigTableListData } from "@/api/bill";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getBigTable();
  },
  computed: {
    category() {
      return this.$route.query.category;
    },
    version() {
      return this.$route.query.version;
    },
  },
  methods: {
    getBigTable() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      GetBigTableListData({
        category: this.version,
        version: this.category,
      }).then((res) => {
        this.$toast.clear();
        this.list = res.data_list;
      });
    },
    handleViewDetail(row) {
      this.$router.push({
        path: "/bonus-bill/detail",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
