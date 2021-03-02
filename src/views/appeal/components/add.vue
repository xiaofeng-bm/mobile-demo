<template>
  <div>
    <van-sticky>
      <van-nav-bar left-text="返回" left-arrow @click-left="$router.go(-1)" />
    </van-sticky>

    <van-cell
      is-link
      :value="data.type ? data.type : '点击选择'"
      @click="sheet.type.show = true"
    >
      <template slot="title">
        <span>申诉类型</span>
        <svg-icon icon-class="required" />
      </template>
    </van-cell>
    <van-cell
      is-link
      :value="data.account ? data.account : '点击选择'"
      @click="sheet.account.show = true"
    >
      <template slot="title">
        <span>对账单</span>
        <svg-icon icon-class="required" />
      </template>
      <div v-if="data.category || data.versions">
        <div>{{ data.category }}</div>
        <div>{{ data.versions }}</div>
      </div>
      <div v-else>点击选择</div>
    </van-cell>

    <van-field
      v-model="data.content"
      rows="2"
      label="申诉内容"
      type="textarea"
      maxlength="100"
      placeholder="请输入申诉内容"
      show-word-limit
    >
      <template slot="label">
        <span>申诉内容</span>
        <svg-icon icon-class="required" />
      </template>
    </van-field>

    <div class="img-upload__wrapper">
      <van-uploader 
        ref="image" 
        v-model="data.file_list" 
        max-count="3" 
        accept="image/gif,image/png,image/jpg,image/jpeg"
        :after-read="afterRead"
      ></van-uploader>
    </div>

    <van-action-sheet
      v-model="sheet.type.show"
      :actions="sheet.type.options"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel('type')"
      @select="handleTypeSelect"
    />
    <van-action-sheet
      v-model="sheet.account.show"
      :closeable="false"
      cancel-text="取消"
      @cancel="handleAccountCancel"
    >
      <van-radio-group v-model="radioValue">
        <div v-for="item in sheet.account.options" :key="item.category">
          <h2 class="title-block">{{ item.category }}</h2>
          <van-cell-group>
            <van-cell
              style="padding-left: 30px"
              :title-class="
                data.account === item.category + child ? 'color-red' : ''
              "
              v-for="child in item.versions"
              :key="child"
              :title="child"
              @click="handleSelect(item, child)"
            >
              <template #right-icon>
                <van-radio
                  :name="item.category + child"
                  checked-color="#c30f1e"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </van-radio-group>
    </van-action-sheet>

    <el-button class="submit-btn" type="danger" @click="handleSubmit"
      >提交</el-button
    >
  </div>
</template>

<script>
import {
  GetCsrfTokenData,
  SubmitAppealData,
  GetBonusListData,
  GetBigTableFirstData
} from "@/api/appeal";
import { handlerImgBinary } from '@/utils/index'

export default {
  data() {
    return {
      data: {
        type: "",
        category: "",
        appeal_category: "",
        versions: "",
        content: "",
        file_list: [],
      },
      csrf_view_token: "", // 提交时需要传给后台的token，注：只有提交时需要这个
      rsid: '',   // 后台用的id
      acceptTypes: [],
      sheet: {
        type: {
          show: false,
          options: [
            { name: "流向不正确" },
            { name: "指标不正确" },
            { name: "重点医院标记不正确" },
          ],
        },
        account: {
          show: false,
          options: [],
        },
      },
    };
  },
  created() {
    this.initGetData();
    this.handleSheetTypeOptions();
  },
  computed: {
    radioValue: {
      get() {
        return this.data.category + this.data.versions;
      },
      set(newVal) {
        return newVal;
      },
    },
  },
  methods: {
    initGetData() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      Promise.all([this.getCsrfToken(), this.getBonusList()]).finally(() => {
        this.$toast.clear();
      });
    },
    getCsrfToken() {
      return new Promise((resolve, reject) => {
        GetCsrfTokenData()
          .then((res) => {
            this.csrf_view_token = res.csrf_view_token;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getBonusList() {
      return new Promise((resolve, reject) => {
        GetBonusListData()
          .then((res) => {
            this.sheet.account.options = res.my_results;
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    handleSheetTypeOptions() {
      const list = this.$store.getters.getAppealCategoryList;
      console.log(list);
      this.sheet.type.options = list.map((item) => {
        return {
          name: item.label,
          value: item.value,
        };
      });
    },
    onCancel() {
      this.data.type = "";
    },
    afterRead(file) {
      this.data.file_list[this.data.file_list.length - 1].filename = file.file.name
    },
    handleTypeSelect(item) {
      this.data.type = item.name;
      this.data.appeal_category = item.value;
    },
    handleSelect(item, child) {
      this.data.category = item.category;
      this.data.versions = child;
      this.sheet.account.show = false;

      this.handleGetResid();
    },
    handleGetResid() {
      this.$toast.loading({
        message: "处理中，请稍后...",
        duration: 0,
      });
      GetBigTableFirstData({
        version: this.data.category,
        category: this.data.versions
      }).then(res => {
        this.$toast.clear()
        if(res.success) {
          this.rsid = res.data.id
        }
      })
    },
    handleAccountCancel() {
      this.data.category = "";
      this.data.versions = "";
      // this.sheet.account.show = false;
    },
    handleSubmit() {
      if (this.validate()) {
        this.$toast.loading({
          message: "提交中...",
          duration: 0,
        });

        let formData = new FormData();
        // const blob = new Blob([JSON.stringify()])
        console.log(this.$refs.image)

        formData.append('csrfmiddlewaretoken', this.csrf_view_token)
        formData.append('appeal_title', this.data.type)
        formData.append('appeal_category', this.data.appeal_category)
        formData.append('appeal_content', this.data.content)
        formData.append('filepond', '')
        formData.append('slip_category', this.data.versions)
        formData.append('slip_version_tag', this.data.category)
        formData.append('resid', this.rsid)
        this.data.file_list.forEach(file => {
          formData.append('appeal_attachment', handlerImgBinary(file, file.filename))
        })
        

        SubmitAppealData({
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }).then((res) => {
          this.$toast.clear()
          this.$router.go(-1)
        });
      }
    },
    validate() {
      if (!this.data.type) {
        this.$toast.fail("申诉类型不能为空");
        return;
      }
      if (!this.data.versions) {
        this.$toast.fail("对账单不能为空");
        return;
      }
      if (!this.data.content) {
        this.$toast.fail("申诉内容不能为空");
        return;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.flexd-container {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-3 {
  flex: 3;
}
.van-action-sheet__header {
  font-size: 14px;
}
.van-action-sheet__header .cancel {
  color: #969799;
}
.van-action-sheet__header .title {
  color: #7ba79d;
}
.van-action-sheet__header .submit {
  color: #c30f1e;
}
.title-block {
  margin: 0;
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding-top: 20px;
}
.img-upload__wrapper {
  margin: 20px 0 0 20px;
}
.submit-btn {
  width: 94%;
  position: fixed;
  margin: 0 3%;
  bottom: 5px;
}
</style>
