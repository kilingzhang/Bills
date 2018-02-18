<template>
  <div class="bills" v-loading="fullscreenLoading">

    <div class="customer-bills">
      <el-alert v-if="customerId != null" class="elalert" :title="customerName" type="info" :closable=false description="">
      </el-alert>
      <el-button v-if="customerId != null" type="primary" @click="dialogBillsFormVisible = true">添加账单</el-button>
      <el-button type="warning" @click="deleteThreeBills">一键删除季度账单</el-button>
      <div class="bills-date-block">
        <el-date-picker v-model="selectDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <el-table :data="billsData" border show-summary style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="账单">
        </el-table-column>
        <el-table-column prop="amount" sortable label="金额">
        </el-table-column>
        <el-table-column prop="remark" sortable label="备注">
        </el-table-column>
        <el-table-column prop="created_at" sortable label="时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination small-pagination hidden-md-and-up">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" small layout="prev, pager, next" :total="dataTotal">
      </el-pagination>
    </div>
    <div class="pagination lg-pagination hidden-sm-and-down">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
      </el-pagination>
    </div>
    <el-dialog :title="billsTitle" :visible.sync="dialogBillsUpdateFormVisible">
      <el-form :model="billsUpdateForm" label-position="top">
        <el-form-item label="账目编辑" :label-width="formLabelWidth">
          <el-input v-model="billsUpdateForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="billsUpdateForm.amount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="billsUpdateForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBillsUpdateFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateBills()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="billsTitle" :visible.sync="dialogBillsFormVisible">
      <el-form :model="billsForm" label-position="top">
        <el-form-item label="账目名称" :label-width="formLabelWidth">
          <el-input v-model="billsForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="billsForm.amount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="billsForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBillsFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="storeBills()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/vuex/store";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "bills",
  data: function() {
    return {
      customerId: this.$route.params.customerId,
      dialogBillsFormVisible: false,
      dialogBillsUpdateFormVisible: false,
      dataTotal: 400,
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      fullscreenLoading: false,
      formLabelWidth: "120px",
      customerName: "",
      billsTitle: "",
      selectDate: new Date(),
      dialogBillsFormVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      billsData: [],
      billsUpdateForm: {
        id: 0,
        name: "",
        amount: "",
        remark: ""
      },
      billsForm: {
        name: "",
        amount: "",
        remark: "",
        customer_id: ""
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogBillsUpdateFormVisible = true;
      this.billsUpdateForm.id = row.id;
      this.billsUpdateForm.name = row.name;
      this.billsUpdateForm.amount = int(row.amount);
      this.billsUpdateForm.remark = row.remark;
      this.billsTitle = "编辑";
      this.editId = index;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.editId = index;
      this.$confirm("此操作将永久删除" + row.name + "账目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCustomer(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.initData();
    },
    changeDate() {
      this.initData();
    },
    storeBills() {
      const self = this;
      self.billsForm.customer_id = this.customerId;
      self.fullscreenLoading = true;
      axios.defaults.headers.common["token"] = this.token;
      axios
        .post(this.url + "/api/bills", this.billsForm)
        .then(function(response) {
          console.log(response);
          if (response.status) {
            switch (response.status) {
              case 200:
                var data = response.data;
                self.$alert("已创建" + data.name, "创建成功", {
                  confirmButtonText: "ok",
                  callback: action => {
                    self.billsForm = {
                      name: "",
                      amount: "",
                      remark: ""
                    };
                    self.initData();
                  }
                });
                break;
            }
          }
          self.fullscreenLoading = false;
        })
        .catch(function(error) {
          console.log(error);
          if (error.status) {
            switch (error.status) {
              case 422:
                var data = error.data;
                var msg = data.name;
                self.$alert(msg, "参数错误", {
                  confirmButtonText: "ok",
                  callback: action => {}
                });
                break;
            }
          }
          self.fullscreenLoading = false;
        });
    },
    updateBills() {
      const self = this;
      axios.defaults.headers.common["token"] = this.token;
      self.fullscreenLoading = true;
      axios
        .put(
          this.url + "/api/bills/" + this.billsUpdateForm.id,
          this.billsUpdateForm
        )
        .then(function(response) {
          console.log(response);
          if (response.status) {
            switch (response.status) {
              case 200:
                var data = response.data;
                self.$alert(data.name + "已更新", "更新成功", {
                  confirmButtonText: "ok",
                  callback: action => {
                    self.billsData[self.editId].name = data.name;
                    self.billsData[self.editId].tel = data.tel;
                    self.billsData[self.editId].remark = data.remark;
                    self.dialogBillsUpdateFormVisible = false;
                  }
                });
                break;
            }
          }
          self.fullscreenLoading = false;
        })
        .catch(function(error) {
          console.log(error);
          if (error.status) {
            switch (error.status) {
              case 422:
                var data = error.data;
                var msg = data.name;
                self.$alert(msg, "参数错误", {
                  confirmButtonText: "ok",
                  callback: action => {}
                });
                break;
            }
          }
          self.fullscreenLoading = false;
        });
    },
    deleteCustomer(id) {
      const self = this;
      self.fullscreenLoading = true;
      axios.defaults.headers.common["token"] = this.token;
      axios
        .delete(this.url + "/api/bills/" + id)
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            self.billsData.splice(self.editId, 1);
            self.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          self.fullscreenLoading = false;
        })
        .catch(function(error) {
          self.fullscreenLoading = false;
        });
    },
    deleteThreeBills() {},
    initData() {
      console.log(this.selectDate.toLocaleString());
      const self = this;
      self.fullscreenLoading = true;
      axios.defaults.headers.common["token"] = this.token;
      var url =
        this.customerId != null
          ? this.url +
            "/api/customers/" +
            this.customerId +
            "/bills/" +
            "?page=" +
            this.currentPage +
            "&limit=" +
            this.pageSize +
            "&start=" +
            this.toDate(this.selectDate)
          : this.url +
            "/api/bills" +
            "?page=" +
            this.currentPage +
            "&limit=" +
            this.pageSize +
            "&start=" +
            this.toDate(this.selectDate);
      console.log(url);
      axios
        .get(url, {})
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            self.billsData = data.bills;
            self.customerName = data.customer.name;
            self.dataTotal = data.total;
          }
          self.fullscreenLoading = false;
        })
        .catch(function(error) {
          self.fullscreenLoading = false;
        });
    }
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
    //InitData
    this.initData();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.params.customerId != oldVal.params.customerId) {
        this.customerId = this.$route.params.customerId;
      }
    },
    selectDate: function() {
      this.initData();
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
.bills {
  width: 80%;
  margin: 0 auto 0 auto;
  margin-top: 5%;
}
.bills-date-block {
  width: 200px;
  margin: 0 auto 0 auto;
  margin-bottom: 10px;
}
.elalert {
  width: 50%;
  text-align: center;
  margin: 0 auto 0 auto;
  margin-bottom: 10px;
}
</style>