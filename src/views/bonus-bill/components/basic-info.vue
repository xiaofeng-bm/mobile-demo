<template>
  <div v-if="data" class="basic-container">
    <van-row class="row-container" gutter="10">
      <van-col class="font-weight" span="6">
        产品
      </van-col>
      <van-col span="8">
        {{ data['产品'] }}
      </van-col>
      <van-col class="font-weight" span="4">
        工号
      </van-col>
      <van-col span="6">
        {{ data['工号'] }}
      </van-col>
    </van-row>
    <van-row class="row-container" gutter="10">
      <van-col class="font-weight" span="6">
        区域编号
      </van-col>
      <van-col span="8">
        {{ data['区域编号'] }}
      </van-col>
      <van-col class="font-weight" span="4">
        姓名
      </van-col>
      <van-col span="6">
        {{ data['姓名'] }}
      </van-col>
    </van-row>
    <van-row class="row-container" gutter="10">
      <van-col class="font-weight" span="6">
        区域名称
      </van-col>
      <van-col span="18">
        {{ data['区域名称'] }}
      </van-col>
    </van-row>
    <van-row class="row-container" gutter="10">
      <van-col class="font-weight" span="6">
        类型
      </van-col>
      <van-col span="6">
        {{ data['类型'] }}
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.basic-container {
  padding: 10px 20px;
}
.row-container {
  height: 30px;
  line-height: 30px;

  font-size: 12px;
}
.font-weight {
  font-weight: 700;
}
</style>
