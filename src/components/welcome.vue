<template>
  <div class="welcome">
    <el-alert class="elalert" title="心意花店" type="info" :closable=false description="心意花店 满意您的心意">
    </el-alert>
    <el-row class="home-panel" :gutter="0">
      <el-col :span="8">
        <el-card class="panel income-panel">
          <span>今日收入</span>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="panel customer-panel">
          <span>今日顾客</span>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="panel bills-panel">
          <span>今日账单</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "@/vuex/store";
import axios from "axios";
import { mapState } from "vuex";
export default {
  data: function() {
    return {
      token: ""
    };
  },
  created: function() {
    const self = this;
    var token = this.getCookie("token");
    this.token = token;
    if (this.token == "") {
      this.$alert("未登录 请登录", "您未登陆", {
        confirmButtonText: "ok",
        callback: action => {
          self.$router.push({ path: `/login` });
        }
      });
    } else {
      axios.defaults.headers.common["token"] = this.token;
      axios
        .get(this.url + "/api/users", {})
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            if (data.code === 0) {
            }
          }
        })
        .catch(function(error) {
          if (error.response.status == 401) {
            self.$alert("请登录后访问", "未登录", {
              confirmButtonText: "ok",
              callback: action => {
                self.$router.push({ path: `/login` });
              }
            });
          }
        });
    }
  },
  computed: mapState({
    // token: state => state.token,
    url: state => state.url
  }),
  store
};
</script>


<style scoped>
.welcome {
  text-align: center;
}
.elalert {
  width: 50%;
  margin: 0 auto 0 auto;
  margin-top: 5%;
}

.home-panel {
  width: 80%;
  margin: 0 auto 0 auto;
  margin-top: 50px;
}

.panel {
  margin-left: 30px;
}

.income-panel {
}
.customer-panel {
}
.bills-panel {
}
</style>
