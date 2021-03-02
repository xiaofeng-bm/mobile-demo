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

    <pdf v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  data() {
    return {
      url: "",
      numPages: 1,
    };
  },
  created() {
    this.url = this.$route.query.url;
  },
  mounted() {
    this.getNumPages();
  },
  methods: {
    getNumPages(url) {
      var loadingTask = pdf.createLoadingTask(
        process.env.VUE_APP_BASE_API + this.url
      );
      this.$toast.loading({
        message: "数据加载中",
        duration: 0,
      });
      loadingTask.promise.then((pdf) => {
          this.$toast.clear();
          this.url = loadingTask;
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf加载失败");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
