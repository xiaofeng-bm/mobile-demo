<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="$router.push({path: '/'})"
        custom-style="color: #7ba79d"
      />
      <van-notice-bar
        left-icon="volume-o"
        text="销售金额为累加金额。公式：销售金额=当月销售金额+前几个月销售金额"
      />
      <van-row class="month-container">
        <van-col span="24">
          <van-dropdown-menu active-color="#c30f1e">
            <van-dropdown-item
              v-model="type"
              :options="type_options"
              @change="getData"
            />
          </van-dropdown-menu>
        </van-col>
      </van-row>
    </van-sticky>

    <div v-if="month_list" class="main-container">
      <el-table :data="month_list" size="mini">
        <el-table-column
          :label="level === 'RSD' ? '季度' : '月份'"
          width="70px"
        >
          <template slot-scope="scope">
            <span v-if="level === 'RSD'">{{ scope.row.quarter }}季度</span>
            <span v-else>{{ scope.row.month }}月</span>
          </template>
        </el-table-column>
        <el-table-column label="销量(盒)">
          <template slot-scope="scope">
            <el-input
              v-if="!isOptuneRSD"
              type="number"
              v-model="scope.row.ytd_qty"
              placeholder="请填写..."
              size="mini"
              :disabled="!scope.row._input"
              @input="handleSalesInput($event, scope.row, scope.$index)"
            ></el-input>
            <div v-else @click="showSalesDetail(scope.row, scope.$index)">
              <span>{{ scope.row.total_ytd_qty }}</span>
              <svg-icon v-if="scope.row._input" icon-class="right" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="销售金额" align="right" width="70px">
          <template slot-scope="scope">
            <span v-if="!isOptuneRSD">{{ scope.row.ytd_amt }}</span>
            <span v-else>{{ scope.row.total_ytd_amt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="bu_name === 'Zejula'"
          label="增长金额"
          align="right"
          min-width="100px"
        >
          <template slot-scope="scope">
            <div v-if="!isOptuneRSD">

            </div>
            <el-input
              v-if="scope.row._input"
              type="number"
              v-model="scope.row.increase"
              placeholder="请填写..."
              size="mini"
            ></el-input>
            <span v-else>{{ scope.row.increase }}</span>
          </template>
        </el-table-column>
        <el-table-column label="指标金额" align="right">
          <template slot-scope="scope">
            <div
              v-if="isOptuneRSD"
              @click="showQuotaDetail(scope.row, scope.$index)"
            >
              <span>{{ scope.row.total_ytd_target }}</span>
              <svg-icon icon-class="right" />
            </div>
            <span v-else>{{ scope.row.ytd_target }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <van-popup v-model="popup.sales.show" position="bottom" round>
      <van-field
        v-model="popup.sales.ytd_qty"
        label-width="150px"
        label="YTD销量(盒)-整体"
        :disabled="!popup.sales.can_input"
        placeholder="请输入YTD销量"
      ></van-field>
      <van-field
        v-model="popup.sales.hit_ytd_qty"
        label-width="150px"
        label="YTD销量(盒)-重点区域"
        placeholder="请输入YTD销量-重点区域"
        :disabled="!popup.sales.can_input"
      ></van-field>
      <div class="display-flex padding-5">
        <el-button class="flex-1" type="info" @click="handleCancel"
          >取消</el-button
        >
        <el-button class="flex-1" type="danger" @click="handleAdd"
          >确定</el-button
        >
      </div>
    </van-popup>

    <van-popup v-model="popup.quota.show" position="bottom" round>
      <van-field
        v-model="popup.quota.ytd_target"
        label="指标"
        disabled
        placeholder="请输入指标"
      ></van-field>
      <van-field
        v-model="popup.quota.hit_ytd_target"
        label="指标-重点区域"
        disabled
        placeholder="请输入重点区域指标"
      ></van-field>
      <div class="display-flex padding-5">
        <el-button class="flex-1" type="danger" @click="handleQuotaAdd"
          >确定</el-button
        >
      </div>
    </van-popup>

    <el-button
      class="submit-btn"
      type="danger"
      @click="handleSubmit"
      :loading="loading"
      >开始试算</el-button
    >
  </div>
</template>

<script>
import {
  GetTrialData,
  GetSlipTrialArgv,
  GetTrialRunCalc,
  GetCsrfTokenData,
} from "@/api/trial";
import { CancelToken } from "axios";

export default {
  name: 'bonus-trial',
  data() {
    return {
      type: "H1",
      loading: false,
      bu_name: "",
      level: "",
      csrf_view_token: "", // 提交时需要传给后台的token，注：只有提交时需要这个
      product: "",
      argv_list: [],
      activeName: [],
      errorMessage: "",
      type_options: [
        { text: "H1", value: "H1" },
        { text: "H2", value: "H2" },
      ],
      month_list: [],
      popup: {
        sales: {
          show: false,
          ytd_qty: "",
          hit_ytd_qty: "",
          can_input: true, // 是否可以输入
        },
        quota: {
          show: false,
          ytd_target: "",
          hit_ytd_target: "",
        },
      },
      current_index: 0,
      last_edit_month: null,
      cancel: null,
    };
  },
  created() {
    this.getData();
    this.getPriceData();
    this.getCsrfToken();
  },
  computed: {
    getProduct() {
      return this.$route.query.type;
    },
    isOptuneRSD() {
      return this.bu_name === "Optune" && this.level === "RSD";
    },
    price() {
      const list = this.argv_list;
      for (let i = 0; i < list.length; i++) {
        if (this.bu_name === list[i].argv_name) {
          return list[i].argv_value;
        }
      }
      return "";
    },
  },
  methods: {
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
      GetTrialData(
        {
          slices: this.type,
          product: this.getProduct,
        },
        new CancelToken((c) => (this.cancel = c))
      ).then((res) => {
        this.$toast.clear();
        if (res.success) {
          this.bu_name = res.res_data.bu;
          this.level = res.res_data.level;
          if (res.res_data.level === "RSD") {
            // Optunu产品，并且是为大区总监，需要特殊处理
            this.month_list = res.res_data.quarter_list;
          } else {
            this.month_list = res.res_data.month_list;
          }
        }
      });
    },
    getPriceData() {
      GetSlipTrialArgv().then((res) => {
        this.argv_list = res.argv_list;
      });
    },
    getCsrfToken() {
      return new Promise((resolve, reject) => {
        GetCsrfTokenData()
          .then((res) => {
            this.csrf_view_token = res.csrf_view_token;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    showSalesDetail(row, index) {
      if (index > 0) {
        if (!this.month_list[index - 1].total_ytd_amt) {
          this.$dialog({
            message: "不能跨月填写，请先填写前一个月销量",
          });
          return;
        }
      }
      this.current_index = index;
      this.popup.sales.show = true;
      this.popup.sales.ytd_qty = row.ytd_qty;
      this.popup.sales.hit_ytd_qty = row.hit_ytd_qty;
      this.popup.sales.can_input = row._input;
    },
    showQuotaDetail(row, index) {
      this.current_index = index;
      this.popup.quota.show = true;
      this.popup.quota.ytd_target = row.ytd_target;
      this.popup.quota.hit_ytd_target = row.hit_ytd_target;
    },
    handleCancel() {
      this.popup.sales.show = false;
    },
    handleAdd() {
      if (this.popup.sales.can_input) {
        const index = this.current_index;

        // 销量=YTD整体销量+YTD重点区域销量
        // 销售金额 = 当月销量 * 单价 + 上个月销售金额;
        if (index > 0) {
          const total =
            parseInt(this.popup.sales.ytd_qty) +
            parseInt(this.popup.sales.hit_ytd_qty);
          this.month_list[this.current_index].total_ytd_amt =
            total * parseInt(this.price) +
            parseInt(this.month_list[index - 1].total_ytd_amt);
          this.month_list[this.current_index].total_ytd_qty = total;
        } else {
          const total =
            parseInt(this.popup.sales.ytd_qty) +
            parseInt(this.popup.sales.hit_ytd_qty);
          this.month_list[this.current_index].total_ytd_amt =
            total * parseInt(this.price);
          this.month_list[this.current_index].total_ytd_qty = total;
        }
      }
      this.month_list[this.current_index].ytd_qty = this.popup.sales.ytd_qty;
      this.month_list[this.current_index].hit_ytd_qty = this.popup.sales.hit_ytd_qty;
      this.popup.sales.show = false;
    },
    handleQuotaAdd() {
      this.popup.quota.show = false;
    },
    handleSubmit() {
      this.$toast.loading({
        message: "计算中，请稍后...",
        duration: 0,
      });
      this.loading = true;
      GetTrialRunCalc({
        headers: {
          "X-CSRFToken": this.csrf_view_token,
        },
        data: {
          trial_argv_list: this.month_list,
        },
      }).then((res) => {
        this.$toast.clear();
        this.loading = false;
        this.$store.dispatch("setTrialList", res.res_data);
        this.$router.push({
          path: "/bonus-result",
          query: {
            last_edit_month: this.last_edit_month,
            type: this.type,
          },
        });
      });
    },

    handleSalesInput(val, row, index) {
      let total = val * parseInt(this.price);
      // 销售金额为累加金额，当前月销售金额加前几个月销售金额
      if (index > 0) {
        // 上月销量校验
        if (!this.month_list[index - 1].ytd_amt) {
          this.$dialog.alert({
            title: "提示",
            message: "请先填写前一个月销量",
          });
          row.ytd_qty = "";
          row.ytd_amt = "";
          return;
        } else if (row.errorSales) {
          row.errorSales = "";
        }
        total = parseInt(total) + parseInt(this.month_list[index - 1].ytd_amt);
      }

      row.ytd_amt = total;
    },
    // handleSalesAreaInput(val, row, index) {
    //   let total = val * 100;
    //   // 销售金额为累加金额，当前月销售金额加前几个月销售金额
    //   if (index > 0) {
    //     // 上月销量校验
    //     if (!this.month_list[index - 1].sales_area_amount) {
    //       this.$dialog.alert({
    //         title: "提示",
    //         message: "请先填写前一个月重点区域销量",
    //       });
    //       row.sales_area = "";
    //       row.sales_area_amount = "";
    //       return;
    //     }
    //     total =
    //       parseInt(total) +
    //       parseInt(this.month_list[index - 1].sales_area_amount);
    //   }

    //   row.sales_area_amount = total;
    // },
  },
};
</script>

<style scoped>
.month-container {
  height: 48px;
  background-color: #fff;
}
.month-container .van-dropdown-menu__bar {
  box-shadow: none;
}
.month-container .van-col {
  height: 48px;
  text-align: center;
}
.month-container .sub-btn {
  width: 100%;
  height: 100%;
}

.bm-row {
  height: 48px;
  line-height: 46px;
}
.submit-btn {
  width: 94%;
  position: fixed;
  margin: 0 3%;
  bottom: 5px;
  z-index: 9;
}
.font-size-12 {
  font-size: 12px;
}
.display-flex {
  display: flex;
}
.padding-5 {
  padding: 5px;
}
.flex-1 {
  flex: 1;
}
</style>
<style>
.van-cell::after {
  content: none;
}
</style>
