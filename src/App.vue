<template>
  <div id="app">
    <keep-alive :include="keepAliveInclued">
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import { GetSlipWinTimeStatus } from '@/api/appeal'
export default {
  name: "App",
  data() {
    return {
      keepAliveInclued: ['bonus-index', 'bonus-trial']
    }
  },
  created() {
    /**
     * 重要：只有在本地调试环境下，需要去测试服务器登录获取sessionid和csrftoken，并种到本地浏览器环境中，后续请求自动携带
     * 注意，注意，注意，千万不要在生产环境执行if里面的代码。
     */
    if (process.env.NODE_ENV === "development") {
      setToken('sessionid', '8meopuxphp6scopgtjmghauq7azprff1')
      setToken('csrftoken', 'GivyXpPLF6NTxXHgIuS4rV56xqsILCANjg8K8Zy1UkX11oCgnffPccQGslYjCjFV')
    }

    this.getWinStatus()
  },
  methods: {
    // 获取窗口期状态
    getWinStatus() {
      GetSlipWinTimeStatus().then(res => {
        this.$store.dispatch(
            "setWinSlip",
            res.has_slip
          );
      })
    }
  }
};
</script>
