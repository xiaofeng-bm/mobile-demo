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
    <van-empty v-if="is_empty" description="暂无"></van-empty>
    <!-- <h2 class="van-doc-demo-block__title">2020年1月</h2> -->
    <div v-else>
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
        value="详情"
        is-link
        @click="gotoList(item)"
      ></van-cell>
    </div>
  </div>
</template>

<script>
import { GetBonusListData } from "@/api/bill";
export default {
  data() {
    return {
      list: [],
      is_empty: false,
    };
  },
  created() {
    this.getBonusList();
  },
  computed: {
    category() {
      return this.$route.query.category;
    },
  },
  methods: {
    getBonusList() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      GetBonusListData().then((res) => {
        this.$toast.clear();

        this.list = this.adapterData(res.my_results);
      });
    },
    adapterData(list) {
      const result = list.filter((item) => {
        return item.category === this.category;
      });
      if (result.length === 0) {
        this.is_empty = true;
        return result;
      } else {
        return result[0].versions;
      }
    },
    gotoList(version) {
      this.$router.push({
        path: "/bonus-bill/list",
        query: {
          category: this.category,
          version: version,
        },
      });
    },
  },
};
</script>

<style scoped>
.van-doc-demo-block__title {
  margin: 0;
  padding: 16px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
</style>
