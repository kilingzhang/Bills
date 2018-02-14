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
