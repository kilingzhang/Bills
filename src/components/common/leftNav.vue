<template>
  <div class="left-nav">
    <img class="left-nav-logo" src="http://markdown-1252847423.file.myqcloud.com/hdImg_8148ac6933b711666d298e8b47ee047615186303817.jpg">
    <ul>
      <li>
        <router-link to="/">
          <i class="icon iconfont icon-homepage"></i><br>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/customers">
          <i class="icon iconfont icon-mine"></i><br>
          <span>客户</span>
        </router-link>
      </li>
      <li>
        <router-link to="/bills">
          <i class="icon iconfont icon-document"></i><br>
          <span>账单</span>
        </router-link>
      </li>
      <li>
        <router-link to="/settings">
          <i class="icon iconfont icon-setup"></i><br>
          <span>设置</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style>
.left-nav-logo {
  width: 100%;
  height: 80px;
}
.left-nav {
  color: #fff;
  font-size: 10px;
  height: 100%;
  min-width: 80px;
  max-width: 120px;
  height: 100%;
  float: left;
  background-color: #409eff;
}
.left-nav ul {
}
.left-nav li {
  list-style: none;
  text-align: center;
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #409eff;
}
.iconfont {
  font-size: 36px;
}
</style>
