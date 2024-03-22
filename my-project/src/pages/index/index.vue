<template>
  <view class="container">
    <van-field
      :value="masterPassword"
      label="主密钥"
      placeholder="请输入主密钥"
      :error-message="errorMsg"
      left-icon="lock"
      @change="changePwd"
    />
    <view class="btn-row">
      <van-button
        type="info"
        round
        custom-style="width:100%"
        @click="setMasterPwd"
        >确认</van-button
      >
    </view>
  </view>
</template>
  
  <script>
import md5 from "js-md5";
import { insertHashPwd } from "../../utils/api.js";
export default {
  data() {
    return {
      masterPassword: "",
      errorMsg: "",
    };
  },
  onLoad() {},
  methods: {
    changePwd(e) {
      this.masterPassword = e.detail;
    },
    validPwd() {
      // 大写字母，小写字母，数字，特殊符号 `@#$%^&*`~()-+=` 中任意3项密码
      // 防止简单的猜测或暴力破解攻击
      const passwordReg =
        /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
      return passwordReg.test(this.masterPassword);
    },
    async setMasterPwd() {
      if (!this.validPwd()) {
        this.errorMsg =
          "主密钥需包含大写字母，小写字母，数字，特殊符号中任意3项";
      } else {
        this.errorMsg = "";
        const hashedPassword = md5(this.masterPassword);
        const result = await insertHashPwd({ masterPassword: hashedPassword });
        if (result.code === "200") {
          wx.showModal({
            title: "提示",
            content: result.msg,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                uni.switchTab({ url: "/pages/generate/index" });
              }
            },
          });
        }
      }
    },
  },
};
</script>
  
<style scoped>
.container {
  background-color: #fff;
}
.btn-row {
  padding: 10px;
}
</style>
  