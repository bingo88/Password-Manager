<template>
  <view class="container">
    <view v-for="item in otherInfos" :key="item.id" class="card">
      <view class="row">网站名称： {{ item.site }}</view>
      <view class="row">用户名： {{ item.username }}</view>
      <view class="row">
        <view v-if="item.id === selectId && password"
          >密码：{{ password }}</view
        >
        <view v-else>密码：*******</view>
      </view>
      <view class="row">
        <van-button
          type="info"
          @click="updatePwd(item.id)"
          size="small"
          custom-style="margin-right:10px"
          >更新</van-button
        >
        <van-button
          type="info"
          @click="getPwd(item.id)"
          size="small"
          custom-style="margin-right:10px"
          >查看</van-button
        >
        <van-button type="danger" @click="cancelPwd(item.id)" size="small"
          >删除</van-button
        >
      </view>
    </view>
    <van-dialog
      use-slot
      show-cancel-button
      title="主密码"
      :show="showDialog"
      @cancel="onCancel"
      @confirm="onConfirm"
    >
      <van-field
        :value="input"
        placeholder="请输入用户名"
        :border="true"
        @change="onInput"
      />
    </van-dialog>
  </view>
</template>
  
  <script>
import {
  getOtherInfo,
  delectOtherInfo,
  updatePassword,
  isMasterKeySame,
} from "../../utils/api.js";
import md5 from "js-md5";
import { calcEntropy } from "@/utils/common.js";
import { renderPassword } from "@/utils/renderPassword.js";
export default {
  data() {
    return {
      otherInfos: [],
      showDialog: false,
      input: "",
      selectId: -1, //查看的密码的id
      password: "",
    };
  },
  async onShow() {
    const response = await getOtherInfo();
    if (response.code === "200") {
      this.otherInfos = response.data;
    }
  },
  methods: {
    getPwd(id) {
      this.password = "";
      this.showDialog = true;
      this.selectId = id;
    },
    onInput(e) {
      this.input = e.detail;
    },
    onCancel() {
      this.showDialog = false;
      this.input = "";
    },
    // 删除密码
    async cancelPwd(id) {
      this.selectId = id;
      const response = await delectOtherInfo({ id });
      if (response.code === "200") {
        this.otherInfos = this.otherInfos.filter((item) => item.id !== id);
      }
    },
    // 更新密码
    async updatePwd(id) {
      this.selectId = id;
      const pwdOtherInfo = this.otherInfos.find((item) => item.id === id);
      // 计算密码
      const options = {
        lowerCase: pwdOtherInfo.lower_case,
        upperCase: pwdOtherInfo.upper_case,
        digital: pwdOtherInfo.digital,
        specialCharacters: pwdOtherInfo.special_characters,
        length: pwdOtherInfo.pass_length,
        counter: ++pwdOtherInfo.counter,
      };
      const entropy = await calcEntropy(
        { site: pwdOtherInfo.site, login: pwdOtherInfo.username, options },
        this.input
      );
      this.password = renderPassword(entropy, options);
      updatePassword({ id, counter: options.counter });
    },
    // 查看密码
    async onConfirm() {
      const hashedPassword = md5(this.input);
      this.showDialog = false;
      let result = await isMasterKeySame({ masterPassword: hashedPassword });
      if (result.code === "200") {
        const pwdOtherInfo = this.otherInfos.find(
          (item) => item.id === this.selectId
        );
        // 计算密码
        const options = {
          lowerCase: pwdOtherInfo.lower_case,
          upperCase: pwdOtherInfo.upper_case,
          digital: pwdOtherInfo.digital,
          specialCharacters: pwdOtherInfo.special_characters,
          length: pwdOtherInfo.pass_length,
          counter: pwdOtherInfo.counter,
        };
        const entropy = await calcEntropy(
          { site: pwdOtherInfo.site, login: pwdOtherInfo.username, options },
          this.input
        );
        this.password = renderPassword(entropy, options);
      } else {
        uni.showToast({
          title: "主密钥输入错误",
          icon: "error",
          duration: 2000,
        });
      }
      this.input = "";
    },
  },
};
</script>
  
<style scoped>
.container {
  padding: 10px;
}
.card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  height: 120px;
}
.row {
  flex: 1;
}
</style>
  