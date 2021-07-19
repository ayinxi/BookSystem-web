<template>
  <div class="home">
    <div class="content">
      <div class="header">
        <img height="70px" style="margin:20px 0" src="../../assets/jwbc.png" />
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
              <el-row><h2>{{nonCheckShopNum}}</h2></el-row><el-row><span>待审核</span></el-row>
            </el-col>
            <el-col span="8" style="text-align:center">
              <el-row><h2>{{checkShopNum}}</h2></el-row><el-row><span>已审核</span></el-row>
            </el-col>
            <el-col span="8" style="text-align:center">
              <el-row><h2>{{passShopNum}}</h2></el-row><el-row><span>商家数</span></el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="box2">
        <el-card class="box-card1">
           <el-tabs v-model="activeName">
    <el-tab-pane label="待审核申请" name="first">
      <el-table :data="checkList" style="width: 100%"
      :default-sort = "{prop: 'create_time', order: 'descending'}">
        <el-table-column prop="create_time" label="申请时间" sortable></el-table-column>
        <el-table-column prop="user_id" label="申请人"></el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope">
            <el-popover
            placement="right"
            title=""
            trigger="hover">
              <img class="img-max" :src="scope.row.avatar_b"/>
              <img class="img-min" slot="reference" :src="scope.row.avatar_s" :alt="scope.row.avatar_s" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
        <el-table-column prop="shopper_name" label="店主名称"></el-table-column>
        <el-table-column prop="apply_reason" label="申请理由"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover placement="left" width="400" trigger="click">
              <el-row>
                <el-col span="16"><el-input v-model="check_opinion" placeholder="请输入审核意见"></el-input></el-col>
                <el-col span="4"><el-button type="danger" @click="checkShop(scope.row.username)">通过</el-button></el-col>
                <el-col span="4"><el-button type="danger" @click="checkShop(scope.row.username)">拒绝</el-button></el-col>
              </el-row>
              <el-button size="mini" type="text" slot="reference">处理</el-button>
            </el-popover>
            <el-button size="mini" type="text" @click="cancelShopApply()">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="审核历史" name="third">
      <el-table :data="checkedList" style="width: 100%"
      :default-sort = "{prop: 'create_time', order: 'descending'}">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺封面">
                <el-popover
                placement="right"
                title=""
                trigger="hover">
                  <img class="img-max" :src="scope.row.avatar_b"/>
                  <img class="img-min" slot="reference" :src="scope.row.avatar_s" :alt="scope.row.avatar_s" style="max-height: 50px;max-width: 130px">
                </el-popover>
              </el-form-item>
              <el-form-item label="店铺名称"><span>{{scope.row.shop_name}}</span></el-form-item>
              <el-form-item label="店主名称"><span>{{scope.row.shopper_name}}</span></el-form-item>
              <el-form-item label="申请理由"><span>{{scope.row.apply_reason}}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="审核时间" sortable></el-table-column>
        <el-table-column prop="user_id" label="申请人"></el-table-column>
        <el-table-column prop="pass_status" label="审核结果">
          <template slot-scope="scope">
            <span v-if="scope.row.pass_status==-1">无效</span>
            <span v-if="scope.row.pass_status==1">通过</span>
            <span v-if="scope.row.pass_status==2">拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="check_opinion" label="审核意见"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="现有商家" name="second">
      <el-table
      :data="shopList.filter(data => !search || data.shop_name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :default-sort = "{prop: 'update_time', order: 'descending'}">
        <el-table-column prop="update_time" label="更新时间" sortable></el-table-column>
        <el-table-column prop="create_time" label="开店时间" sortable></el-table-column>
        <el-table-column prop="user_id" label="店主账户"></el-table-column>
        <el-table-column prop="shopper_name" label="店主昵称"></el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope">
            <el-popover
            placement="right"
            title=""
            trigger="hover">
              <img class="img-max" :src="scope.row.avatar_b"/>
              <img class="img-min" slot="reference" :src="scope.row.avatar_s" :alt="scope.row.avatar_s" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称">
          <template slot-scope="scope">
            <el-link :href="'http://localhost:8081/'+scope.row.shopAddr">{{scope.row.shop_name}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入店名搜索"/>
          </template>
          <template>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">注销</el-button>
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
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      isLoading: false,
      activeName: 'first',
      checkList: [
        {
          id: "",
          create_time: "2021-07-14 18:31:30",//申请时间
          user_id: "aaa",//申请人
          avatar_s: require("../../assets/kuku.png"),//店铺封面
          avatar_b: require("../../assets/kuku.png"),//店铺封面大图
          shop_name: "ccc",//店铺名称
          shopper_name: "aaa",//店主名称
          apply_reason: "ddd",//申请理由
        },
      ],
      checkedList: [
        {
          id: "",
          create_time: "2021-07-14 18:31:30",//审核时间
          user_id: "aaa",//申请人
          avatar_s: require("../../assets/kuku.png"),//店铺封面
          avatar_b: require("../../assets/kuku.png"),//店铺封面大图
          shop_name: "ccc",//店铺名称
          shopper_name: "aaa",//店主名称
          apply_reason: "ddd",//申请理由
          pass_status: "审核通过(已注销)",//店铺状态
          check_opinion: "",//审核意见
        },
      ],
      shopList: [
        {
          id: "",
          update_time: "2021-07-14 18:31:30",//过审开店时间
          create_time: "2021-07-14 18:31:30",//信息更新时间
          user_id: "aaa",//店主账号
          shopper_name: "bbb",//店主昵称
          avatar_s: require("../../assets/kuku.png"),//店铺封面
          avatar_b: require("../../assets/kuku.png"),//店铺封面大图
          shop_name: "ccc",//店铺名称
          shopAddr: "login",//店铺地址
        },
      ],
      search: "",
      nonCheckShopNum: 0,
      checkShopNum: 0,
      passShopNum: 0,
      check_opinion: "",
    };
  },
  computed: {},
  methods:{
    //回到管理员主页
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
    //获取未审核的店铺数量
    getNonCheckShopNum() {
      axios({
        url: this.$store.state.yuming+"/admin/getNonCheckShopNum",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.nonCheckShopNum = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取已审核的申请数量
    getCheckShopNum() {
      axios({
        url: this.$store.state.yuming+"/admin/getCheckShopNum",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.checkShopNum = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取现有店铺数量
    getPassShopNum() {
      axios({
        url: this.$store.state.yuming+"/admin/getPassShopNum",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.passShopNum = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取未审核店铺
    getNonCheckShop() {
      axios({
        url: this.$store.state.yuming+"/admin/getNonCheckShop",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.checkList = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取审核店铺
    getCheckShop() {
      axios({
        url: this.$store.state.yuming+"/admin/getCheckShop",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.checkedList = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取现有店铺
    getPassShop() {
      axios({
        url: this.$store.state.yuming+"/admin/getPassShop",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.shopList = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //审核店铺
    checkShop(itemUsername) {
      axios({
        url: this.$store.state.yuming+"/admin/checkShop",
        method: "POST",
        params: {
          username: itemUsername,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.shopList = data;
          } else {
            this.$message.error("获取信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //撤销申请
    //编辑店铺信息
    //注销店铺
    },
    async created() {
      this.isLoading = true;
      await this.getNonCheckShopNum();
      await this.getCheckShopNum();
      await this.getPassShopNum();
      await this.getNonCheckShop();
      await this.getCheckShop();
      await this.getPassShop();
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

.img-min{
  width: 50px;
  height: 50px;
}
.img-max{
  width: 200px;
  height: 200px;
}

</style>