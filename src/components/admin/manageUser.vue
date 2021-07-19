<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../../assets/jwbc.png" />
        <div class="title">管理平台</div>
      </div>
      <div style="margin: 10px 0"><el-page-header @back="gotoAdmin" content="用户管理"></el-page-header></div>
       <div>
        <el-card class="box-card1">
          <el-container>
            <el-aside width="35px"><div class="verticalBar2"></div></el-aside>
            <el-main>
          <div style="font-size: 15px padding: 18px 0">
            在此处，您可以查看、查找、编辑、注销用户信息。
          </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="box2">
        <el-card class="box-card1">
          <el-table
          :data="userList.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          :default-sort = "{prop: 'signinTime', order: 'descending'}">
            <el-table-column type="expand">
               <template slot-scope="scope">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="用户昵称"><span>{{scope.row.userNickname}}</span></el-form-item>
                    <el-form-item label="用户头像"><img :src="scope.row.userImg"></el-form-item>
                    <el-form-item label="店铺名称">
                      <el-link :href="'http://localhost:8081/'+scope.row.shopAddr">{{scope.row.shopName}}</el-link>
                    </el-form-item>
                  </el-form>
               </template>
            </el-table-column>
            <el-table-column prop="signinTime" label="注册时间" sortable></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="userEmail" label="邮箱"></el-table-column>
            <el-table-column prop="state" label="用户状态"></el-table-column>
            <el-table-column label="操作" align="right">
              <template slot="header">
                <el-input v-model="search" size="mini" placeholder="输入用户名搜索"/>
              </template>
              <template>
                <el-button size="mini" type="text">编辑</el-button>
                <el-button size="mini" type="text">注销</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {},
  data() {
    return {
      userList:[//用户列表
        {
          signinTime: "2021-07-15 18:31:30",//注册时间
          userName: "A",//用户名
          userEmail: "xxxxxx@qq.com",//邮箱
          state: "商家",//账号状态

          userNickname: "甲",//昵称
          userImg: require("../../assets/kuku.png"),//头像
          shopName: "xxxx",//店铺名
          shopAddr: "login",//店铺地址
        },
        {
          signinTime: "2021-07-14 18:31:30",//注册时间
          userName: "BC",//用户名
          userEmail: "xxxxxx@qq.com",//邮箱
          state: "普通用户",//账号状态

          userNickname: "甲",//昵称
          userImg: require("../../assets/kuku.png"),//头像
          shopName: "xxxx",//店铺名
          shopAddr: "login",//店铺地址
        },
        {
          signinTime: "2021-07-14 18:31:29",//注册时间
          userName: "AC",//用户名
          userEmail: "xxxxxx@qq.com",//邮箱
          state: "普通用户",//账号状态

          userNickname: "甲",//昵称
          userImg: require("../../assets/kuku.png"),//头像
          shopName: "xxxx",//店铺名
          shopAddr: "login",//店铺地址
        },
      ],
      search: '',
    };
  },
  computed: {},
  methods:{
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
  },
  async created() {
    this.isLoading = true;
    await this.getUserInfo();
    this.isLoading = false;
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