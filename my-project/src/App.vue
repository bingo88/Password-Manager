<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    // const express = require('express')

  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "/wxcomponents/dist/common/index.wxss";
page {
  background-color: #f5f5f5;
}
</style>
