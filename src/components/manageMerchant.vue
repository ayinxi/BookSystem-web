<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img width="250px" src="../assets/logo.png" />
        <div class="title">管理平台</div>
      </div>
      <div style="margin: 10px 0"><el-page-header @back="gotoAdmin" content="商家管理"></el-page-header></div>
       <div>
        <el-card class="box-card1">
          <el-container>
            <el-aside width="35px"><div class="verticalBar2"></div></el-aside>
            <el-main>
          <div style="font-size: 15px padding: 18px 0">
            在此处，您可以处理用户成为商家的申请。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-card class="box-card1">
           <el-tabs v-model="activeName">
    <el-tab-pane label="待审核申请" name="first">
      <el-table :data="checkList" style="width: 100%">
        <el-table-column prop="applicant" label="申请人"></el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope"><img :src="scope.row.shopImg"></template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="applyReason" label="申请理由"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
           <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
           <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="审核历史" name="third">
      <el-table :data="checkedList" style="width: 100%">
        <el-table-column prop="applicant" label="申请人"></el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope"><img :src="scope.row.shopImg"></template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="applyReason" label="申请理由"></el-table-column>
        <el-table-column prop="checkResult" label="审核结果"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="现有商家" name="second">
      <el-table :data="shopList" style="width: 100%">
        <el-table-column prop="keeper" label="申请人"></el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope"><img :src="scope.row.shopImg"></template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: 'first',
      checkList: [
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺头像
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
        },
        {
          applicant: "aaa",
          shopImg: require("../assets/kuku.png"),
          shopName: "ccc",
          applyReason: "ddd",
        },
      ],
      shopList: [
        {
          keeper: "aaa",//店主
          shopImg: require("../assets/kuku.png"),//店铺头像
          shopName: "ccc",//店铺名称
        },
      ],
      checkedList: [
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺头像
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
          checkResult: "通过",//审核结果
        },
      ],
    };
  },
  computed: {},
  methods:{
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
   
  },
};
</script>

<style>
.home {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  
  display: flex;
  justify-content: center;
}

.content{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.header{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.title{
  font-size: 35px;
  padding: 30px 10px;
}

.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box2{
  display: flex;
  justify-content: center;
}

.box-card1 {
  width: 700px;
  margin: 20px;
}

.box-card2 {
  width: 340px;
  margin: 10px;
}

.box3{
  display: flex;
  justify-content: space-between;
}

.verticalBar2 {
  width: 4px;
  height: 50px;
  background: #3d678a;
  display: inline-block;
  margin-top: 8px;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}

</style>