<template>
  <div class="customer" v-loading="fullscreenLoading">
    <div class="customer-panel">
      <el-button class="add-customer-btn" @click="dialogCustomerFormVisible = !dialogCustomerFormVisible" type="primary">添加顾客</el-button>
    </div>
    <el-table class="customer-table" :data="tableData" style="width: 100%;">
      <el-table-column prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column label="顾客" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>点击进入{{scope.row.name}}账单详情</p>
            <div class="link-span" @click="linkBills(scope.row.id)" slot="reference">
              {{ scope.row.name }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="tel" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAddBills(scope.$index, scope.row)">添加订单</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination small-pagination hidden-md-and-up">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" small layout="prev, pager, next" :total="dataTotal">
      </el-pagination>
    </div>
    <div class="pagination lg-pagination hidden-sm-and-down">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
      </el-pagination>
    </div>
    <el-dialog title="添加顾客" :visible.sync="dialogCustomerFormVisible">
      <el-form :model="customerForm" label-position="top">
        <el-form-item label="顾客" :label-width="formLabelWidth">
          <el-input v-model="customerForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="customerForm.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="customerForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCustomerFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="storeCustomer()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="customerUpdateTitle" :visible.sync="dialogCustomerUpdateFormVisible">
      <el-form :model="customerUpdateForm" label-position="top">
        <el-form-item label="顾客" :label-width="formLabelWidth">
          <el-input v-model="customerUpdateForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="customerUpdateForm.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="customerUpdateForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCustomerUpdateFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateCustomer()">更 新</el-button>
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
  data() {
    return {
      dataTotal: 400,
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      billsTitle: "",
      customerUpdateTitle: "",
      tableData: [],
      dialogCustomerFormVisible: false,
      dialogCustomerUpdateFormVisible: false,
      dialogBillsFormVisible: false,
      fullscreenLoading: false,
      editId: 0,
      amount: 0,
      customerForm: {
        name: "",
        tel: "",
        remark: ""
      },
      customerUpdateForm: {
        id: "",
        name: "",
        tel: "",
        remark: ""
      },
      billsForm: {
        name: "",
        amount: "",
        remark: "",
        customer_id: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleAddBills(index, row) {
      this.dialogBillsFormVisible = true;
      this.billsTitle = "添加" + row.name.trim() + " 订单";
      this.billsForm.customer_id = row.id;
      console.log(index, row);
    },
    handleEdit(index, row) {
      this.customerUpdateTitle = "更新" + row.name.trim() + " 顾客信息";
      this.dialogCustomerUpdateFormVisible = true;
      this.customerUpdateForm.id = row.id;
      this.customerUpdateForm.name = row.name;
      this.customerUpdateForm.tel = row.tel;
      this.customerUpdateForm.remark = row.remark;
      this.editId = index;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.editId = index;
      this.$confirm("此操作将永久删除" + row.name + "客户, 是否继续?", "提示", {
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
    linkBills(customerId) {
      this.$router.push({ path: `/bills/${customerId}` });
    },
    storeCustomer() {
      const self = this;
      self.fullscreenLoading = true;
      axios.defaults.headers.common["token"] = this.token;
      axios
        .post(this.url + "/api/customers", this.customerForm)
        .then(function(response) {
          if (response.status) {
            switch (response.status) {
              case 200:
                var data = response.data;
                self.$alert("已创建" + data.name, "创建成功", {
                  confirmButtonText: "ok",
                  callback: action => {
                    self.customerForm = {
                      name: "",
                      tel: "",
                      remark: ""
                    };
                  }
                });
                break;
            }
          }
          self.fullscreenLoading = false;
        })
        .catch(function(error) {
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
    storeBills() {
      const self = this;
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
                      remark: "",
                      customer_id: self.billsForm.customer_id
                    };
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
    updateCustomer() {
      const self = this;
      axios.defaults.headers.common["token"] = this.token;
      self.fullscreenLoading = true;
      axios
        .put(
          this.url + "/api/customers/" + this.customerUpdateForm.id,
          this.customerUpdateForm
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
                    self.tableData[self.editId].name = data.name;
                    self.tableData[self.editId].tel = data.tel;
                    self.tableData[self.editId].remark = data.remark;
                    self.dialogCustomerUpdateFormVisible = false;
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
        .delete(this.url + "/api/customers/" + id)
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            self.tableData.splice(self.editId, 1);
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
    initData() {
      const self = this;
      self.fullscreenLoading = true;
      axios.defaults.headers.common["token"] = this.token;
      axios
        .get(
          this.url +
            "/api/customers?page=" +
            this.currentPage +
            "&limit=" +
            this.pageSize,
          {}
        )
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            self.tableData = data.customers;
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
          console.log(error);
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
  computed: mapState({
    // token: state => state.token,
    url: state => state.url
  }),
  store
};
</script>

<style scoped>
.link-span:hover {
  color: #409eff;
}
.customer {
  width: 80%;
  margin: 0 auto 0 auto;
}
.customer-panel {
  margin-top: 20px;
  width: 100%;
}
.add-customer-btn {
  position: relative;
  width: 100px;
  left: 50%;
  margin-left: -50px;
}
.customer-table {
  margin-top: 50px;
}
.pagination {
  margin-top: 30px;
}
</style>