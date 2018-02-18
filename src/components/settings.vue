<template>
  <div>

  </div>
</template>

<script>
import store from "@/vuex/store";
import axios from "axios";
import { mapState } from "vuex";
export default {
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

</style>