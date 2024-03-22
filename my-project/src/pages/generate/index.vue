<template>
  <view class="container">
    <van-field
      :value="site"
      id="site"
      label="网站名称"
      left-icon="underway"
      placeholder="请输入网站名称"
      @change="onChange"
    />
    <van-field
      :value="usename"
      id="usename"
      label="用户名"
      left-icon="contact"
      placeholder="请输入用户名"
      @change="onChange"
    />
    <van-field
      :value="masterPassword"
      id="masterPassword"
      label="主密钥"
      placeholder="请输入主密钥"
      left-icon="lock"
      type="password"
      @change="onChange"
    />
    <view class="row">
      <van-button type="info" v-if="!isgenerated" @click="generateKey"
        >生成密码</van-button
      >
      <van-button v-else>{{ generatedPwd }}</van-button>
      <van-icon
        name="setting"
        size="25px"
        color="rgb(25, 137, 250)"
        @click="showOption = true"
      />
    </view>
    <van-dialog use-slot title="设置" :show="showOption" @close="onClose">
      <view class="options">
        <view>
          <view class="title">选项</view>
          <view class="checkbox-group">
            <van-checkbox :value="lowerCase" @change="lowerCase = !lowerCase"
              >a-z</van-checkbox
            >
            <van-checkbox :value="upperCase" @change="upperCase = !upperCase"
              >A-Z</van-checkbox
            >
            <van-checkbox :value="digital" @change="digital = !digital"
              >0-9</van-checkbox
            >
            <van-checkbox
              :value="specialCharacters"
              @change="specialCharacters = !specialCharacters"
              >%!@#</van-checkbox
            >
          </view>
        </view>
        <view class="row">
          <view>长度</view>
          <van-stepper :value="length" id="length" @change="onChange" />
        </view>
        <view class="row">
          <view>计数器（变更）</view>
          <van-stepper :value="counter" id="counter" @change="onChange" />
        </view>
      </view>
    </van-dialog>
  </view>
</template>

<script>
import md5 from "js-md5";
import { calcEntropy } from "@/utils/common.js";
import { renderPassword } from "@/utils/renderPassword.js";
import { insertOtherInfo,isMasterKeySame } from "../../utils/api.js";

export default {
  data() {
    return {
      site: "",
      usename: "",
      masterPassword: "",
      showOption: false,
      lowerCase: true,
      upperCase: true,
      digital: true,
      specialCharacters: true,
      length: 16,
      counter: 1,
      isgenerated: false,
      generatedPwd: "",
    };
  },
  onShow() {
    this.site = "";
    this.usename = "";
    this.masterPassword = "";
    this.isgenerated = false;
  },
  methods: {
    onChange(e) {
      this[e.target.id] = e.detail;
    },
    onClose() {
      this.showOption = false;
    },
    // 生成密码
    async generateKey() {
      // 校验是否和设置的主密码一致
      const hashedPassword = md5(this.masterPassword);
      let result = await isMasterKeySame({ masterPassword: hashedPassword });
      if (result.code === "200") {
        const options = {
          lowerCase: this.lowerCase,
          upperCase: this.upperCase,
          digital: this.digital,
          specialCharacters: this.specialCharacters,
          length: this.length,
          counter: this.counter,
        };
        this.generatedPwd = await calcEntropy(
          { site: this.site, login: this.usename, options },
          this.masterPassword
        ).then((entropy) => {
          return renderPassword(entropy, options);
        });
        this.isgenerated = true;
        insertOtherInfo({ site: this.site, login: this.usename, options });
      } else {
        uni.showToast({
          title: "主密钥输入错误",
          icon: "error",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: #fff;
}
.row {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.row ::v-deep.van-button {
  height: 35px;
}
.options {
  padding: 0 10px;
}
.checkbox-group {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
