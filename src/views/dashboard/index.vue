<template>
  <div class="dashboard">
    <div class="list-item" v-for="item in list" :key="item.title" @click="handleGoPage(item)">
      <div class="list-icon">
        <svg-icon :icon-class="item.icon" />
      </div>
      <span class="list-text">{{ item.title }}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "模拟计算器",
          icon: "calculator",
          url: "/bonus-trial",
        },
        {
          title: "奖金对账单",
          icon: "bill",
          url: "/bonus-bill",
        },
        {
          title: "申诉",
          icon: "appeal",
          url: "/appeal",
        },
        {
          title: "政策",
          icon: "policy",
          url: "/policy",
        },
      ],
    };
  },
  methods: {
    handleGoPage(item) {
      this.$router.push({
        path: item.url
      })
    }
  }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.list-item {
  width: 50%;
  padding: 20px 0;
  display: inline-block;
  text-align: center;
  color: rgb(195, 15, 30);
}
.list-icon {
  font-size: 60px;
}
.list-text {
  color: #333
}
</style>
