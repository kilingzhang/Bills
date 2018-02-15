<template>
    <div class="login">
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
      }
    };
  },
  methods: {
    login() {
      console.log("submit!");
      axios
        .post("/api/user", this.loginFrom)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function() {
    var token = this.getCookie("token");
    console.log(token);
    if (token == null) {
      console.log("unAuth");
    } else {
      this.$router.push({ path: `/welcome` });
    }
  },
  computed: mapState({
    token: state => state.token
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