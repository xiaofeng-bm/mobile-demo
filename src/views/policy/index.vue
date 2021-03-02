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

    <div class="main">
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        value="详情"
        is-link
        @click="goDetailPage(item)"
      ></van-cell>
    </div>
  </div>
</template>

<script>
import { GetSlipPolicyList } from "@/api/policy";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: "数据加载中",
        duration: 0,
      });
      GetSlipPolicyList().then((res) => {
        this.$toast.clear();
        this.list = res.policies;
      });
    },
    goDetailPage(item) {
      this.$router.push({
        path: '/policy/detail',
        query: {
          id: item.id
        }
      })
    }
  },
};
</script>

<style scoped>
.main {
  padding: 20px 0;
}
</style>
