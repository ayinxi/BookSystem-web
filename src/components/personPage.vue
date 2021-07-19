<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoIndex"
        content="个人主页"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="首页" name="first">
          <div class="personCard">
            <div class="up">
              <el-card class="personDetail">
                <el-row>
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-wrap: wrap;
                      margin: 20px;
                    "
                  >
                    <img
                      v-if="this.userInfo.avatar_b"
                      style="
                        height: 150px;
                        width: 150px;
                        border-radius: 50%;
                        margin: 5%;
                      "
                      :src="this.userInfo.avatar_b"
                    />
                    <img
                      v-else
                      style="
                        height: 150px;
                        width: 150px;
                        border-radius: 50%;
                        margin: 5%;
                      "
                      src="../assets/avatar.jpg"
                    />
                  </div>
                </el-row>
                <el-row style="margin: 10px" class="all">
                  <div
                    style="
                      font-size: 20px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    {{ this.userInfo.name }}
                  </div>
                </el-row>
                <el-row style="margin: 10px" class="all">
                  <div
                    style="
                      font-size: 15px;
                      color: #909399;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    {{ this.userInfo.username }}
                  </div>
                </el-row>
                <el-row
                  style="margin: 20px 10px; margin-bottom: 0px"
                  class="all"
                >
                  <el-button
                    type="text"
                    style="font-size: 15px"
                    @click="gotoAddress"
                    >我的收货地址</el-button
                  >
                </el-row>
                <el-row style="margin: 0px 10px" class="all">
                  <el-button
                    type="text"
                    style="font-size: 15px"
                    @click="gotoChange"
                    >修改资料</el-button
                  >
                </el-row>
              </el-card>
              <div
                style="
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  flex-wrap: wrap;
                "
              >
                <el-row
                  style="
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-between;
                  "
                >
                  <el-col :span="4">
                    <i
                      class="iconfont-dingdan"
                      style="font-size: 50px; margin: 50px"
                    />
                    <el-button
                      type="text"
                      style="font-size: 15px; margin: 20px 50px"
                      @click="gotoAllOrder"
                      >全部订单</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <i
                      class="iconfont-daifahuo"
                      style="font-size: 50px; margin: 50px"
                    />
                    <el-button
                      type="text"
                      style="font-size: 15px; margin: 20px 50px"
                      @click="gotoDaifahuo"
                      >待发货</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <i
                      class="iconfont-daishouhuo"
                      style="font-size: 50px; margin: 50px"
                    />
                    <el-button
                      type="text"
                      style="font-size: 15px; margin: 20px 50px"
                      @click="gotoDaishouhuo"
                      >待收货</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <i
                      class="iconfont-fankui"
                      style="font-size: 50px; margin: 50px"
                    />
                    <el-button
                      type="text"
                      style="font-size: 15px; margin: 20px 50px"
                      @click="gotoDaipingjia"
                      >待评价</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <i
                      class="iconfont-shouhou"
                      style="font-size: 50px; margin: 50px"
                    />
                    <el-button
                      type="text"
                      style="font-size: 15px; margin: 20px 50px"
                      @click="gotoTuikuan"
                    >
                      退款</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.userInfo.identity == 0"
          label="申请成为商家"
          name="second"
        >
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <el-form
              ref="applyShopInfo"
              :model="applyShopInfo"
              label-width="80px"
              :rules="rules"
            >
              <el-row>
                <el-col>
                  <el-form-item label-position="left">
                    <div>
                      <h3 style="color: #909399">
                        注意：在此，您可以申请成为商家。请仔细考虑店铺封面，认真填写店铺名称和申请理由。否则，您将有可能遭到拒绝。
                      </h3>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-form-item label="店铺封面" prop="img">
                    <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      action="http://47.94.131.208:8888"
                      :show-file-list="false"
                      :on-change="changePhotoFile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :auto-upload="false"
                      :name="this.applyShopInfo.img"
                    >
                      <img
                        v-if="this.applyShopInfo.img"
                        :src="this.applyShopInfo.img"
                        class="avatar"
                      />
                      <img v-else :src="this.imgUrl" class="avatar" />
                      <div class="avatar-uploader-icon">
                        <i
                          class="el-icon-warning-outline"
                          style="margin-right: 5px"
                        ></i>
                        <i style="color: #909399">点击图片进行修改</i>
                      </div>
                    </el-upload>
                    <my-cropper
                      ref="myCropper"
                      @getFile="getFile"
                      @upAgain="upAgain"
                    ></my-cropper>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="店铺名称" prop="shop_name">
                    <el-input
                      type="text"
                      v-model="applyShopInfo.shop_name"
                      maxlength="10"
                      show-word-limit
                      style="width: 250px"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="店主名" prop="shopper_name">
                    <el-input
                      type="text"
                      v-model="applyShopInfo.shopper_name"
                      maxlength="10"
                      show-word-limit
                      style="width: 250px"
                    ></el-input>
                    <div class="avatar-uploader-icon">
                      <i
                        class="el-icon-warning-outline"
                        style="margin-right: 5px"
                      ></i>
                      <i style="color: #909399">请填写申请人的真实姓名</i>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="申请理由" prop="apply_reason">
                    <el-input
                      type="textarea"
                      v-model="applyShopInfo.apply_reason"
                      maxlength="100"
                      show-word-limit
                      clearable
                      style="width: 500px"
                      rows="5"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="primary" @click="confirmApply"
                      >确认申请</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.userInfo.identity == 0"
          label="申请历史"
          name="third"
        >
          <el-table
            :data="applyHistory"
            style="width: 100%"
            :default-sort="{ prop: 'create_time', order: 'descending' }"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-row>
                    <el-form-item label="申请理由">
                      <span>{{ props.row.apply_reason }}</span>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item
                      label="审核结果"
                      v-if="props.row.apply_status == 2"
                    >
                      <el-tag v-if="props.row.pass_status == 1" type="success"
                        >已通过</el-tag
                      >
                      <el-tag v-if="props.row.pass_status == 2" type="danger"
                        >已拒绝</el-tag
                      >
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item
                      label="审核意见"
                      v-if="props.row.apply_status == 2"
                    >
                      <span>{{ props.row.check_opinion }}</span>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item
                      label="存在状态"
                      v-if="!props.row.exist_status == -1"
                    >
                      <el-tag v-if="props.row.exist_status == 1" type="success"
                        >未注销</el-tag
                      >
                      <el-tag v-if="props.row.exist_status == 2" type="warning"
                        >已注销</el-tag
                      >
                    </el-form-item>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="申请时间"
              sortable
            ></el-table-column>
            <el-table-column label="店铺头像">
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img class="img-max" :src="scope.row.avatar_b" />
                  <img
                    class="img-min"
                    slot="reference"
                    :src="scope.row.avatar_s"
                    :alt="scope.row.avatar_s"
                    style="max-height: 50px; max-width: 130px"
                  />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="shop_name"
              label="店铺名称"
            ></el-table-column>
            <el-table-column
              prop="shopper_name"
              label="店主名称"
            ></el-table-column>
            <el-table-column prop="apply_status" label="审核状态">
              <template v-slot="x">
                <el-tag v-if="x.row.apply_status == 1" type="warning"
                  >未审核</el-tag
                >
                <el-tag v-if="x.row.apply_status == 2" type="success"
                  >已审核</el-tag
                >
                <el-tag v-if="x.row.apply_status == 3" type="info"
                  >已取消</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="x">
                <el-button
                  size="medium"
                  v-if="x.row.apply_status == 1"
                  type="text"
                  >撤销</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-else label="我的店铺" name="fourth">
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <el-form
              ref="shopInfo"
              :model="shopInfo"
              label-width="80px"
              label-position="left"
            >
              <el-row style="margin-top: 30px">
                <el-col>
                  <el-form-item label="店铺封面" prop="img" >
                    <img
                      v-if="this.shopInfo.avatar_b"
                      :src="this.shopInfo.avatar_b"
                      class="avatar"
                    />
                    <img v-else src="../assets/avatar.jpg" class="avatar" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="店铺名称" prop="shop_name">
                    <span>{{ shopInfo.shop_name }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="店主名" prop="shopper_name">
                    <span>{{ shopInfo.shopper_name }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="评分" prop="apply_reason">
                    <el-rate
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                      style="margin-top: 10px"
                    >
                    </el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="text" @click="gotoShopManager"
                      >点击管理我的商铺</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MyCropper from "./cropper.vue";
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {
    MyCropper,
  },
  data() {
    return {
      imgUrl: require("../assets/avatar.jpg"),
      orderId: "",
      isLoading: false,
      activeName: "first",
      userInfo: {
        avatar_s: "",
        username: "",
        name: "",
        password: "",
        identity: 0,
      },
      applyShopInfo: {
        img: "",
        shopper_name: "",
        shop_name: "",
        apply_reason: "",
      },
      shopInfo: {
        apply_status: -1,
        shoopper_name: "",
        shop_name: "",
        avatar_b: "",
        rate: 3.7,
      },
      applyHistory: [
        {
          avatar_b: "",
          shop_name: "",
          shoopper_name: "",
          apply_reason: "",
          apply_status: "",
          pass_status: "",
          exist_status: "",
          check_opinion: "",
        },
      ],
      //评分
      value: 0,
      dialogVisible: false,
      rules: {
        shopper_name: [
          { required: true, message: "店主名不得为空", trigger: "blur" },
        ],
        shop_name: [
          { required: true, message: "店铺名不得为空", trigger: "blur" },
        ],
        apply_reason: [
          { required: true, message: "申请理由不得为空", trigger: "blur" },
          { max: 100, message: "申请理由不得超过100个字", trigger: "blur" },
        ],
      },
      formdata: new FormData(),
    };
  },
  computed: {
    hasUsername() {
      return this.$store.state.username;
    },
  },
  methods: {
    //返回首页
    gotoIndex() {
      this.$router.push("/");
    },
    //跳转资料修改页面
    gotoChange() {
      this.$router.push("/change");
    },
    gotoShopManager() {
      this.$router.push("/shopManage");
    },
    //跳转收货地址页面
    gotoAddress() {},
    //跳转全部页面
    gotoAllOrder() {
      this.orderId = 0;
      this.$router.push("/userOrder/" + this.orderId);
    },
    //跳转待发货
    gotoDaifahuo() {
      this.orderId = 1;
      this.$router.push("/userOrder/" + this.orderId);
    },
    //跳转待收货页面
    gotoDaishouhuo() {
      this.orderId = 2;
      this.$router.push("/userOrder/" + this.orderId);
    },
    //跳转全部页面
    gotoDaipingjia() {
      this.orderId = 3;
      this.$router.push("/userOrder/" + this.orderId);
    },
    //跳转退款页面
    gotoTuikuan() {
      this.orderId = 4;
      this.$router.push("/userOrder/" + this.orderId);
    },
    //确认申请成为商家
    confirmApply() {
      this.formdata.append("shopper_name", this.applyShopInfo.shopper_name);
      this.formdata.append("shop_name", this.applyShopInfo.shop_name);
      this.formdata.append("apply_reason", this.applyShopInfo.apply_reason);
      axios({
        url: this.$store.state.yuming + "/registerShop",
        method: "POST",
        data: this.formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: "申请成功",
            type: "success",
          });
          this.applyShopInfo = "";
        } else {
          this.$message.error("申请失败，请重试");
        }
      });
    },
    //获取申请店铺历史信息
    getApplyHistory() {
      axios({
        url: this.$store.state.yuming + "/user/getAllShop",
        method: "GET",
        params: {
          username: this.hasUsername,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.applyHistory = data;
          } else {
            this.$message.error("获取店铺申请历史信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取用户信息
    getUserInfo() {
      axios({
        url: this.$store.state.yuming + "/user/getByUsername",
        method: "GET",
        params: {
          username: this.hasUsername,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.userInfo = data;
          } else {
            this.$message.error("获取用户信息失败");
            this.$router.push("/");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取店铺信息
    getShopInfo() {
      axios({
        url: this.$store.state.yuming + "/shop/getPassed",
        method: "GET",
        params: {
          username: this.hasUsername,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.shopInfo = data;
            this.value = this.shopInfo.rate;
          } else if (code == "17") {
            this.$message("已有店铺申请正在审核");
          } else {
            if (code != "3") {
              this.$message.error("获取店铺状态失败,请刷新");
            }
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //上传图片触发
    handleCrop(file) {
      this.$nextTick(() => {
        this.$refs.myCropper.open(file.raw || file);
      });
    },
    // 点击弹框重新时触发
    upAgain() {
      this.$refs["upload"].$refs["upload-inner"].handleClick();
    },
    getFile(file) {
      this.formdata.append("img", file);
      // 获取上传图片的本地URL，用于上传前的本地预览
      this.imgUrl = window.URL.createObjectURL(file);
      this.$refs.myCropper.close();
    },
    //头像上传成功之后的方法,进行回调
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.userInfo.avatar_b = res.img;
        // this.handleCrop(file);
      } else {
        this.$message.error("上传出错");
      }
    },
    //上传图片时会被调用
    changePhotoFile(file) {
      this.handleCrop(file);
    },
    //头像上传之前的方法
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" || "image/jpg" || "image/gif" || "image/png";
      const isLt6M = file.size / 1024 / 1024 < 6;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、JPEG、GIF或PNG 格式!");
      }
      if (!isLt6M) {
        this.$message.error("上传头像图片大小不能超过 6MB!");
      }
      return isJPG && isLt6M;
    },
  },
  async created() {
    this.isLoading = true;
    await this.getUserInfo();
    if (this.$store.state.role == 1) {
      await this.getShopInfo();
    }
    await this.getApplyHistory();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
}
.tab {
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.title {
  color: #303133;
  text-align: center;
  font-size: 30px;
}
.personCard {
  margin: 20px 5%;
}
.vertical {
  display: inline-block;
  width: 1px;
  height: 18em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
.up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.personDetail {
  width: 600px;
  height: 450px;
}
.all {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.bbb {
  background: url("../assets/3.jpg") no-repeat;
  background-position: center;
  height: 20%;
  width: 100%;
  background-size: cover;
  position: absolute;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.img-min {
  width: 50px;
  height: 50px;
}
.img-max {
  width: 200px;
  height: 200px;
}
</style>