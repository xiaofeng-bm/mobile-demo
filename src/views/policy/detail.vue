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

    <h2 class="title-block">政策内容</h2>
    <van-field
      v-model="content"
      rows="2"
      autosize
      type="textarea"
      label="内容"
    ></van-field>

    <h2 class="title-block">附件</h2>
    <div v-if="file_ext">
      <div v-for="(v, k, index) in file_ext" :key="k">
        <!-- <pdf v-if="isPDF(v)" class="pdf-wrapper" :src="base_url + v"></pdf> -->
        <p v-if="isPDF(v)" class="pdf-wrapper" @click="viewPDF(v)">{{ k }}</p>
        <van-image
          v-else
          width="100%"
          height="100%"
          :src="base_url + v"
          fit="contain"
          @click="handleViewImage(v, index)"
        ></van-image>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSlipPolicyInfo } from "@/api/policy";
import { ImagePreview } from "vant";


export default {
 
  data() {
    return {
      content: "",
      policy: null,
      file_ext: null,
      base_url: process.env.VUE_APP_BASE_API,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    icpowerID() {
      return this.$route.query.id || "";
    },
    imagesList() {
      const list = [];
      const file_ext = this.file_ext;
      const baseURL = this.base_url;
      for (const key in file_ext) {
        list.push(baseURL + file_ext[key]);
      }
      return list;
    },
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: "数据加载中",
        duration: 0,
      });
      GetSlipPolicyInfo({
        icpower_publish_id: this.icpowerID,
      }).then((res) => {
        this.$toast.clear();
        this.content = res.content;
        this.policy = res.policy;
        this.file_ext = res.file_ext;
        
      });
    },
    handleViewImage(item, index) {
      ImagePreview({
        images: this.imagesList,
        startPosition: index,
      });
    },
    isPDF(str) {
      return /(\.pdf)$/.test(str);
    },
    viewPDF(url) {
      // todo
      this.$router.push({
        path: '/policy/view-pdf',
        query: {
          url: url
        }
      })
    },
  },
};
</script>

<style scoped>
.title-block {
  margin: 0;
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding-top: 20px;
}
.pdf-wrapper {
  padding: 0 20px;
  color: #1989fa;
}
</style>
