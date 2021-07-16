<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../assets/jwbc.png" />
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
      <div>
        <el-card class="box-card1">
          <el-row>
            <el-col span="8" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>待审核</span></el-row>
            </el-col>
            <el-col span="8" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>已审核</span></el-row>
            </el-col>
            <el-col span="8" style="text-align:center">
              <el-row><h2>12345</h2></el-row><el-row><span>商家数</span></el-row>
            </el-col>
          </el-row>
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
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺封面"><img :src="scope.row.shopImg"></el-form-item>
              <el-form-item label="店铺名称"><span>{{scope.row.shopName}}</span></el-form-item>
              <el-form-item label="申请理由"><span>{{scope.row.applyReason}}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="applicant" label="申请人"></el-table-column>
        <el-table-column prop="checkResult" label="审核结果"></el-table-column>
        <el-table-column prop="checkOpinion" label="审核意见"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="现有商家" name="second">
      <el-table :data="shopList" style="width: 100%">
        <el-table-column prop="keeper" label="店铺"></el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope"><img :src="scope.row.shopImg"></template>
        </el-table-column>
        <el-table-column label="店铺名称">
          <template slot-scope="scope">
            <el-link :href="'http://localhost:8083/'+scope.row.shopAddr">{{scope.row.shopName}}</el-link>
          </template>
        </el-table-column>
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
          shopImg: require("../assets/kuku.png"),//店铺封面
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
        },
        {
          applicant: "aaa",
          shopImg: require("../assets/kuku.png"),
          shopName: "ccc",
          applyReason: "ddd",
        },
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺封面
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
        },
        {
          applicant: "aaa",
          shopImg: require("../assets/kuku.png"),
          shopName: "ccc",
          applyReason: "ddd",
        },
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺封面
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
        },
        {
          applicant: "aaa",
          shopImg: require("../assets/kuku.png"),
          shopName: "ccc",
          applyReason: "ddd",
        },
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺封面
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
        },
        {
          applicant: "aaa",
          shopImg: require("../assets/kuku.png"),
          shopName: "ccc",
          applyReason: "ddd",
        },
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺封面
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
      checkedList: [
        {
          applicant: "aaa",//申请人
          shopImg: require("../assets/kuku.png"),//店铺封面
          shopName: "ccc",//店铺名称
          applyReason: "ddd",//申请理由
          checkResult: "通过",//审核结果
          checkOpinion: "",//审核意见
        },
      ],
      shopList: [
        {
          keeper: "aaa",//店主
          shopImg: require("../assets/kuku.png"),//店铺封面
          shopName: "ccc",//店铺名称
          shopAddr: "login",//店铺地址
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
  width: 900px;
  margin: 20px;
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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>