<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-text="返回"
        :right-text="win_open ? '新建申诉' : ''"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="handleGoAdd"
      />
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="filter_info.showing_status"
          :options="filter_info.appeal_status_list"
          @change="getData"
        >
        </van-dropdown-item>
        <van-dropdown-item
          v-model="filter_info.showing_category"
          :options="filter_info.appeal_category_list"
          @change="getData"
        >
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <h2 class="title-block">申诉列表</h2>
    <el-table :data="tableData" size="mini">
      <el-table-column label="申诉类型">
        <template slot-scope="scope">
          <span>{{ scope.row.category.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申诉状态" prop="status" align="center">
        <template slot-scope="scope">
          <van-tag :color="status_map[scope.row.status.label]">{{
            scope.row.status.label
          }}</van-tag>
        </template>
      </el-table-column>
      <el-table-column label="申诉时间" align="center">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80px" align="center">
        <template slot-scope="scope">
          <span style="color: #1989fa;" @click="goDetailPage(scope.row)"
            >详情</span
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAppealData } from "@/api/appeal";
export default {
  data() {
    return {
      filter_info: {
        showing_status: "",
        appeal_status_list: [],
        showing_category: "",
        appeal_category_list: [],
      },
      tableData: [],
      list_fields: [],
      status_map: {
        待处理: "#968c8c",
        处理中: "#d8b25c",
        已完成: "#7ba79d",
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    win_open() {
      return this.$store.getters.getWinOpen || false;
    }
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      getAppealData({
        search_val: "",
        showing_status: this.filter_info.showing_status,
        showing_category: this.filter_info.showing_category,
      })
        .then((res) => {
          // 清除loading状态
          this.$toast.clear();
          // 将申诉类型数组存到store中，方便新建申诉使用
          this.$store.dispatch(
            "setAppealList",
            res.context.appeal_category_list
          );

          const data = this.handleContext(res.context);
          this.filter_info.appeal_category_list = data.appeal_category_list;
          this.filter_info.appeal_status_list = data.appeal_status_list;

          this.tableData = data.appeal_list;
          this.list_fields = data.list_fields;
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    handleContext(data) {
      // 1、处理筛选过滤部分
      data.appeal_category_list = this.handleFilterData(
        data.appeal_category_list,
        "全部类型"
      );
      data.appeal_status_list = this.handleFilterData(
        data.appeal_status_list,
        "全部状态"
      );
      return data;
    },
    /**
     * 对筛选状态和类型进行处理
     * 1、数组首部添加全部选项
     * 2、[{ label: '进行中', value: '0' }] => [{ text: '进行中', value: '0' }]
     */
    handleFilterData(arr, text) {
      arr.unshift({
        label: text,
        value: "",
      });
      return arr.map((item) => {
        return {
          text: item.label,
          value: item.value,
        };
      });
    },
    handleGoAdd() {
      this.$router.push({
        path: "/appeal/add",
      });
    },
    formatTime(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${day}`;
    },
    goDetailPage(row) {
      const itemInfo = {
        row: row,
        list_fields: this.list_fields,
      };
      // 将当前item信息存入vuex
      this.$store.dispatch("setItemData", itemInfo);

      this.$router.push({
        path: "/appeal/detail",
      });
    },
  },
};
</script>

<style scoped>
.text-align-center {
  text-align: center;
}
.text-align-right {
  text-align: right;
}
.title-block {
  margin: 0;
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding-top: 20px;
}
</style>
