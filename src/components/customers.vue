<template>
  <div class="customer">
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
      <el-pagination small layout="prev, pager, next" :total="500">
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
        <el-button type="primary">确 定</el-button>
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
        <el-button type="primary">确 定</el-button>
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
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTotal: 400,
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      billsTitle: "",
      customerUpdateTitle: "",
      tableData: [
        {
          id: 1,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 2,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 3,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 4,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 5,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 6,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 7,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 8,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 9,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        },
        {
          id: 10,
          name: "韵之花(一朵）",
          tel: "131-0418-6233",
          remark: "韵之花(一朵）"
        }
      ],
      dialogCustomerFormVisible: false,
      dialogCustomerUpdateFormVisible: false,
      dialogBillsFormVisible: false,
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
        remark: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleAddBills(index, row) {
      this.dialogBillsFormVisible = true;
      this.billsTitle = "添加" + row.name.trim() + " 订单";
      console.log(index, row);
    },
    handleEdit(index, row) {
      this.customerUpdateTitle = "更新" + row.name.trim() + " 顾客信息";
      this.dialogCustomerUpdateFormVisible = true;
      this.customerUpdateForm.id = row.id;
      this.customerUpdateForm.name = row.name;
      this.customerUpdateForm.tel = row.tel;
      this.customerUpdateForm.remark = row.remark;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除" + row.name + "客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
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
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    linkBills(customerId) {
      this.$router.push({ path: `/bills/${customerId}` });
    }
  }
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
  margin-top: 10%;
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