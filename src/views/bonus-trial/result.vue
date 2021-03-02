<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" custom-style="color: #7ba79d" />
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item
        v-for="item in list"
        :title="item.title"
        :name="item.value"
        :key="item.title"
        icon="after-sale"
      >
        <template slot="value">
          {{ item.total }}
        </template>
        <el-table :data="item.table" border :show-header="false" size="mini">
          <el-table-column prop="type"></el-table-column>
          <el-table-column prop="value" align="right"></el-table-column>
        </el-table>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 9,
      type: "",
      last_edit_month: null,
      list: [],
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.activeName = +this.$route.query.last_edit_month;

    this.list = this.$store.getters.getTrialList;
  },
  methods: {
    getData() {},
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
table tr {
  width: 100%;
}
</style>
<style>
  .van-nav-bar .van-icon {
    color: #94b6d2;
  }
  .van-nav-bar__text {
    color: #94b6d2;
  }
</style>