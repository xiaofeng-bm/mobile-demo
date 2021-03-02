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

    <div v-if="detail_data">
      <basic-info :data="detail_data"></basic-info>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item
          title="销售绩效奖"
          name="销售绩效奖"
          icon="after-sale"
        >
          <el-table size="mini" border :data="sales_award" :show-header="false">
            <el-table-column>
              <template slot-scope="scope">
                <span
                  :class="{
                    'color-red': scope.row.title === '当月封顶后实发绩效奖' || scope.row.title === '当季封顶后实发绩效奖',
                  }"
                  >{{ scope.row.title }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="bonus" align="right">
              <template slot-scope="scope">
                <span
                  :class="{
                    'color-red': scope.row.title === '当月封顶后实发绩效奖' || scope.row.title === '当季封顶后实发绩效奖',
                  }"
                  >{{ scope.row.value }}</span
                >
              </template>
            </el-table-column>
          </el-table>
        </van-collapse-item>
      </van-collapse>
      <van-cell-group>
        <van-cell
          v-if="detail_keys.includes('进药奖')"
          title="进药奖"
          :value="detail_data['进药奖']"
        />
        <van-cell
          v-if="detail_keys.includes('行为考核')"
          title="行为考核"
          :value="detail_data['行为考核']"
        />
        <van-cell title="合规" :value="detail_data['合规']" />
        <van-cell
          title="奖金调整"
          :value="detail_data['奖金调整']"
        />
        <van-cell
          title="特殊奖金TBD1"
          :value="detail_data['特殊奖金TBD1']"
          icon="after-sale"
        />
        <van-cell
          title="特殊奖金TBD2"
          :value="detail_data['特殊奖金TBD2']"
          icon="after-sale"
        />
        <van-cell
          title="特殊奖金TBD3"
          :value="detail_data['特殊奖金TBD3']"
          icon="after-sale"
        />
        <van-cell
          title="特殊奖金TBD4"
          :value="detail_data['特殊奖金TBD4']"
          icon="after-sale"
        />
        <van-cell title="备注" :value="detail_data['备注']" icon="comment-o" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { GetBigTableDetailData } from "@/api/bill";
import BasicInfo from "./basic-info";
export default {
  components: {
    BasicInfo,
  },
  data() {
    return {
      activeName: "销售绩效奖",
      zejula_award: [
        "YTD销量",
        "YTD达成率",
        "YTD达成系数",
        "YTD贡献系数",
        "YTD达成奖",
        "YTD贡献奖",
        "增长金额",
        "增长系数",
        "YTD增长奖",
        "YTD绩效奖",
        "YTD已发绩效奖",
        "当月应发绩效奖",
        "当月封顶后实发绩效奖",
        "是否封顶",
      ],
      optune_award: [
        "YTD销量",
        "YTD达成率",
        "YTD达成系数",
        "YTD贡献系数",
        "YTD达成奖",
        "YTD贡献奖",
        "YTD绩效奖",
        "YTD已发绩效奖",
        "当月应发绩效奖",
        "当月封顶后实发绩效奖",
        "是否封顶",
      ],
      basic_info: null,
      detail_data: null,
      detail_keys: [],
      sales_award: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    getDataId() {
      return this.$route.query.id || "";
    },
    getLevel() {
      return this.detail_data["类型"];
    },
    getOptuneAward() {
      const basicList = [
        "YTD销量",
        "YTD达成率",
        "YTD达成系数",
        "YTD贡献系数",
        "YTD达成奖",
        "YTD贡献奖",
        "YTD绩效奖",
        "YTD已发绩效奖"
      ];
      let appendList = [];
      if (this.getLevel === "RSD") {
        appendList = ["当季应发绩效奖", "当季封顶后实发绩效奖", "是否封顶"];
      } else {
        appendList = ["当月应发绩效奖", "当月封顶后实发绩效奖", "是否封顶"];
      }

      return [...basicList, ...appendList];
    },
    getZejulaAward() {
      const basicList = [
        "YTD销量",
        "YTD达成率",
        "YTD达成系数",
        "YTD贡献系数",
        "YTD达成奖",
        "YTD贡献奖",
        "增长金额",
        "增长系数",
        "YTD增长奖",
        "YTD绩效奖",
        "YTD已发绩效奖",
      ];
      let appendList = [];
      if (this.getLevel === "RSD") {
        appendList = ["当季应发绩效奖", "当季封顶后实发绩效奖", "是否封顶"];
      } else {
        appendList = ["当月应发绩效奖", "当月封顶后实发绩效奖", "是否封顶"];
      }

      return [...basicList, ...appendList];
    },
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: "数据加载中",
        duration: 0,
      });
      GetBigTableDetailData({
        data_id: this.getDataId,
      }).then((res) => {
        this.$toast.clear();
        this.detail_data = res.data;
        this.detail_keys = Object.keys(res.data);
        this.adpaterData(res.data);
      });
    },
    adpaterData(data) {
      switch (data["产品"]) {
        case "Zejula":
          this.sales_award = this.getZejulaAward.map((item) => {
            return {
              title: item,
              value: data[item],
            };
          });
          return;
        case "Optune":
          this.sales_award = this.getOptuneAward.map((item) => {
            return {
              title: item,
              value: data[item],
            };
          });
          return;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
