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
        <el-table-column prop="user_id" label="申请人id"></el-table-column>
        <el-table-column prop="username" label="申请人name"></el-table-column>
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
            <el-popover placement="left" width="400px" trigger="click">
              <el-row>
                <el-col span="16"><el-input v-model="scope.row.check_opinion" placeholder="请输入审核意见"></el-input></el-col>
                <el-col span="4"><el-button type="danger" size="mini" @click="checkShop(scope.row.user_id, 1, scope.row.check_opinion)">通过</el-button></el-col>
                <el-col span="4"><el-button type="danger" size="mini" @click="checkShop(scope.row.user_id, 2, scope.row.check_opinion)">拒绝</el-button></el-col>
              </el-row>
              <el-button size="mini" type="text" slot="reference">处理</el-button>
            </el-popover>
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
              <el-form-item label="真实姓名"><span>{{scope.row.shopper_name}}</span></el-form-item>
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
        <el-table-column prop="shopper_name" label="真实姓名"></el-table-column>
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
        <el-table-column prop="shop_name" label="店铺名称">
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入店名搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="EditVisible = true">编辑</el-button>
            <el-dialog title="店铺信息" :visible.sync="EditVisible">
              <el-form :model="scope.row">
                <el-form-item label="店铺封面" prop="avatar_s">
                  <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="店铺名称" :label-width="formLabelWidth">
                  <el-input v-model="scope.row.shop_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店主真实姓名" :label-width="formLabelWidth">
                  <el-input v-model="scope.row.shopper_name" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="EditVisible = false">取 消</el-button>
                <el-button type="primary" @click="EditVisible = false">确 定</el-button>
              </div>
            </el-dialog>
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
import { TimeSelect } from 'element-ui';
export default {
  components: {},
  data() {
    return {
      isLoading: false,
      activeName: 'first',
      checkList: [
        {
          create_time: "2021-07-14 18:31:30",//申请时间
          user_id: "aaa",//申请人id
          username: "aaa",//申请人name
          avatar_s: require("../../assets/kuku.png"),//店铺封面
          avatar_b: require("../../assets/kuku.png"),//店铺封面大图
          shop_name: "ccc",//店铺名称
          shopper_name: "aaa",//真实姓名
          apply_reason: "ddd",//申请理由
          check_opinion: "",//审核意见
        },
      ],
      checkedList: [
        {
          create_time: "2021-07-14 18:31:30",//审核时间
          user_id: "aaa",//申请人id
          username: "aaa",//申请人name
          avatar_s: require("../../assets/kuku.png"),//店铺封面
          avatar_b: require("../../assets/kuku.png"),//店铺封面大图
          shop_name: "ccc",//店铺名称
          shopper_name: "aaa",//真实姓名
          apply_reason: "ddd",//申请理由
          pass_status: "审核通过(已注销)",//店铺状态
          check_opinion: "",//审核意见
        },
      ],
      shopList: [
        {
          update_time: "2021-07-14 18:31:30",//过审开店时间
          create_time: "2021-07-14 18:31:30",//信息更新时间
          user_id: "aaa",//店主id
          username: "aaa",//店主name
          shopper_name: "bbb",//真实姓名
          avatar_s: require("../../assets/kuku.png"),//店铺封面
          avatar_b: require("../../assets/kuku.png"),//店铺封面大图
          shop_name: "ccc",//店铺名称
        },
      ],
      search: "",
      nonCheckShopNum: 0,
      checkShopNum: 0,
      passShopNum: 0,
      EditVisible: false,
      formLabelWidth: '120px',
      username: "",
      imageUrl: "",
    };
  },
  computed: {},
  methods:{
    //回到管理员主页
    gotoAdmin() {
      this.$router.push("/adminManage");
    },
    //在编辑中更改店铺封面
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
    //user_id查找用户
    getByID(item) {
      axios({
        url: this.$store.state.yuming+"/user/getByID",
        method: "GET",
        params: {
          user_id: item.user_id,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            item.username = data.username;
          } else {
            this.$message.error("获取username失败");
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
            this.$message.error("获取未审核店铺失败");
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
    checkShop(id, status, opinion) {
      axios({
        url: this.$store.state.yuming+"/admin/checkShop",
        method: "POST",
        params: {
          user_id: id,
          pass_status: status,
          check_opinion: opinion,
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            this.$message({
              type: "success",
              message: "处理成功",
        });
          } else {
            this.$message.error("处理失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>