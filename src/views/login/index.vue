<template>
  <div class="container">
    <div class="login-wrapper">
      <van-image :src="logo"></van-image>
      <div class="user-info">
        <van-field
          class="flex-item"
          v-model="userInfo.username"
          left-icon="manager"
          label="用户名"
          placeholder="请输入用户名"
        ></van-field>
        <van-field
          class="flex-item"
          v-model="userInfo.password"
          left-icon="lock"
          label="密码"
          placeholder="请输入密码"
        ></van-field>
      </div>

      <el-button class="login-btn" type="danger" size="small">登录</el-button>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      logo: logo,
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.user-info {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 1px;
  margin-bottom: 10px;
}
.login-btn {
  width: 100%;
}
</style>
