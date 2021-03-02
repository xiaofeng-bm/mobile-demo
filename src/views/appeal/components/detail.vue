<template>
  <div>
    <van-sticky>
      <van-nav-bar left-text="返回" left-arrow @click-left="$router.go(-1)" />
    </van-sticky>

    <div v-for="item in list_fields" :key="item.value">
      <van-cell
        v-if="item.value === 'category'"
        :title="item.label"
        :value="row[item.value].label"
      ></van-cell>
      <van-cell v-else-if="item.value === 'status'" :title="item.label">
        <van-tag :type="status_map[row[item.value].label]">{{
          row[item.value].label
        }}</van-tag>
      </van-cell>
      <van-cell
        v-else-if="item.value === 'create_time'"
        :title="item.label"
        :value="formatTime(row[item.value])"
      />
      <van-cell v-else :title="item.label" :value="row[item.value]" />
    </div>

    
      <h2 class="van-doc-demo-block__title">回复意见</h2>
      <!-- <div v-for="(item, index) in row.comment" :key="index"></div> -->
      <div class="replay-table">
        <el-table v-if="row.comment" :data="row.comment" size="mini" border>
          <el-table-column label="姓名" width="70px" prop="author_real_name"></el-table-column>
          <el-table-column label="发表于" prop="create_time"></el-table-column>
          <el-table-column label="内容" prop="content"></el-table-column>
        </el-table>
      </div>
    <h2 class="van-doc-demo-block__title">附件</h2>
    <div style="padding: 0 10px">
      
      <van-row gutter="10">
        <van-col
          v-for="item in row.attachment_urls"
          :key="item"
          span="8"
          style="height: 100px"
        >
          <van-image
            width="100%"
            height="100%"
            :src="item"
            fit="contain"
            @click="handleViewImage(item)"
          ></van-image>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      list_fields: [],
      row: null,
      status_map: {
        进行中: "primary",
        拒绝: "danger",
        同意: "success",
      },
    };
  },
  created() {
    const data = this.$store.getters.getItemData;
    this.list_fields = data.list_fields;
    this.row = data.row;
  },
  methods: {
    formatTime(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${day}`;
    },
    handleViewImage(item) {
      ImagePreview({
        images: [item],
        showIndex: false,
      });
    },
  },
};
</script>

<style scoped>
.van-doc-demo-block__title {
  margin: 0;
  padding: 16px 16px 16px;
  color: #323233;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
.replay-table {
  padding: 0 15px;
}
</style>
