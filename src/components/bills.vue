<template>
  <div class="bills">

    <div class="bills-panel" v-if="customerId == 0 | customerId == ''">
      <div class="bills-date-block">
        <el-date-picker v-model="selectDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </div>

    <div class="customer-bills" v-if="customerId != 0 | customerId != ''">
      <el-alert class="elalert" :title="customerName" type="info" :closable=false description="">
      </el-alert>
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

    <el-dialog :title="billsTitle" :visible.sync="dialogBillsFormVisible">
      <el-form :model="billsForm" label-position="top">
        <el-form-item label="账目编辑" :label-width="formLabelWidth">
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
  name: "bills",
  data: function() {
    return {
      customerId: this.$route.params.customerId,
      customerName: "韵之花(一朵）",
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
      billsData: [
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        },
        {
          id: "12987122",
          name: "王小虎",
          amount: "234",
          remark: "备注",
          created_at: "2018-02-16 03:05:50"
        }
      ],
      billsForm: {
        id: "",
        name: "",
        amount: "",
        remark: ""
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogBillsFormVisible = true;
      this.billsForm.id = row.id;
      this.billsForm.name = row.name;
      this.billsForm.amount = row.amount;
      this.billsForm.remark = row.remark;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除" + row.name + "账目, 是否继续?", "提示", {
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
    }
  },
  created: function() {},
  watch: {
    $route(newVal, oldVal) {
      if (newVal.params.customerId != oldVal.params.customerId) {
        this.customerId = this.$route.params.customerId;
      }
    }
  }
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