<template>
  <div class="login" v-loading="fullscreenLoading">
    <img src="http://markdown-1252847423.file.myqcloud.com/hdImg_8148ac6933b711666d298e8b47ee047615186303817.jpg" width="100" height="100" alt="">
    <h3>欢迎使用记账系统+</h3>
    <el-form :inline="false" label-position="top" :model="loginFrom">
      <el-form-item>
        <el-input v-model="loginFrom.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginFrom.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="记住密码" prop="delivery">
        <el-switch v-model="loginFrom.remember"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "@/vuex/store";
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
        remember: 0
      },
      fullscreenLoading: false
    };
  },
  methods: {
    login() {
      console.log("submit!");
      const self = this;
      self.fullscreenLoading = true;
      axios
        .post(this.url + "/api/users", this.loginFrom)
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            if (data.code === 0) {
              self.token = data.data.token;
              self.setCookie("token", self.token, 60 * 60 * 24);
              self.$alert(self.token, "登陆成功", {
                confirmButtonText: "ok",
                callback: action => {
                  self.$router.push({ path: "/" });
                }
              });
            }
          }
          self.fullscreenLoading = false;
        })
        .catch(function(error) {
          if (error.response.status && error.response.status == 401) {
            self.$alert("账号密码错误", "账号密码错误", {
              confirmButtonText: "ok",
              callback: action => {}
            });
          } else if (error.response.status && error.response.status == 422) {
            self.$alert("参数错误", "参数错误", {
              confirmButtonText: "ok",
              callback: action => {}
            });
          } else {
            console.log(error);
          }
        });
      self.fullscreenLoading = false;
    }
  },
  created: function() {
    const self = this;
    var token = this.getCookie("token");
    this.token = token;
    if (this.token == "") {
      console.log("未登录");
    } else {
      const self = this;
      axios.defaults.headers.common["token"] = this.token;
      axios
        .get(this.url + "/api/users", {})
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            if (data.code === 0) {
              self.$alert("已帮你自动跳转", "您已登陆", {
                confirmButtonText: "ok",
                callback: action => {
                  self.$router.push({ path: `/` });
                }
              });
            }
          }
        })
        .catch(function(error) {});
    }
  },
  watch: {
    $route(newVal, oldVal) {}
  },
  computed: mapState({
    // token: state => state.token,
    url: state => state.url
  }),
  store
};
</script>

<style scoped>
.login {
  width: 300px;
  margin: 0 auto 0 auto;
  margin-top: 10%;
  text-align: center;
  color: #676a6c;
}
.login form {
  margin-top: 10px;
}
</style>