<template>
  <div class="container">
    <div>
      <van-image :src="logo"></van-image>
      <div class="login-wrapper">
        <div class="user-info">
          <van-field
            class="flex-item"
            v-model="userInfo.oldpass"
            label="旧密码"
            placeholder="请输入旧密码"
          ></van-field>
          <van-field
            class="flex-item"
            v-model="userInfo.newpass"
            label="新密码"
            placeholder="请输入新密码"
          ></van-field>
          <van-field
            class="flex-item"
            v-model="userInfo.againpass"
            :border="false"
            label="再次确认"
            placeholder="请再次输入新密码"
          ></van-field>
        </div>

        <el-button class="login-btn" type="danger" size="small">确定</el-button>
      </div>
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
        oldpass: "",
        newpass: "",
        againpass: "",
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
