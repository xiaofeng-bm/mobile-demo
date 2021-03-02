<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
        custom-style="color: #7ba79d"
      />
      <van-row class="month-container">
        <van-col span="24">
          <van-dropdown-menu active-color="#c30f1e">
            <van-dropdown-item
              v-model="year"
              :options="year_options"
              @change="getData"
            />
          </van-dropdown-menu>
        </van-col>
      </van-row>
    </van-sticky>

    <div class="main-container">
      <van-cell  v-for="(value, key) in category_list" :key="key" :value="value">
        <span slot="title" class="link-month" :class="{ 'color-light-yellow': key.includes('Q') }" @click="handleGoDetail(key)"
          >{{ key }}总奖金</span
        >
      </van-cell>
      <!-- <el-table :data="tableData" :show-header="false">
        <el-table-column>
          <template slot-scope="scope">
            <span class="link-month" @click="handleGoDetail(scope.row)"
              >{{ scope.row.month }}总奖金</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="bonus" align="right"></el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script>
import { GetMonthData } from "@/api/bill";
import { CancelToken } from "axios";
export default {
  name: 'bonus-index',
  data() {
    return {
      year: 0,
      cancel: null,
      year_options: [],
      category_list: [],
    };
  },
  created() {
    this.handleYear();
    this.getData();
  },
  methods: {
    handleYear() {
      let currentYear = new Date().getFullYear();
      // 2年内，当前年和前一年，默认选择当前年
      this.year = currentYear;
      this.year_options = [
        { text: currentYear, value: currentYear },
        { text: currentYear - 1, value: currentYear - 1 },
      ];
    },
    cancelRequest() {
      if (typeof this.cancel === "function") {
        this.cancel("取消重复请求");
      }
    },
    getData() {
      this.cancelRequest();
      this.$toast.loading({
        message: "数据加载中",
        duration: 0,
      });
      GetMonthData(
        {
          year: this.year,
        },
        (new CancelToken((c) => (this.cancel = c)))
      ).then((res) => {
        this.$toast.clear();
        this.category_list = res.res_data;
      });
    },
    handleGoDetail(key) {
      this.$router.push({
        path: "/bonus-bill/sort",
        query: {
          category: key,
        },
      });
    },
  },
};
</script>

<style scoped>
.link-month {
  color: #7ba79d;
  text-decoration: underline;
}
</style>
