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
                      style="
                        height: 150px;
                        width: 150px;
                        border-radius: 50%;
                        margin: 5%;
                      "
                      src="../assets/kuku.png"
                    />
                  </div>
                </el-row>
                <el-row style="margin: 10px" class="all">
                  <el-col :offset="5" style="font-size: 15px; color: #909399"
                    >昵称：</el-col
                  >
                </el-row>
                <el-row style="margin: 10px" class="all">
                  <el-col :offset="5" style="font-size: 15px; color: #909399"
                    >注册邮箱：</el-col
                  >
                </el-row>
                <el-row style="margin: 30px 10px" class="all">
                  <el-button
                    type="text"
                    style="font-size: 15px"
                    @click="getUserInfo"
                    >我的收货地址</el-button
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
                      @click="gotoDaishouhuo"
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
                      @click="gotoDaishouhuo"
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
                      @click="gotoDaishouhuo"
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
                      @click="gotoDaishouhuo"
                    >
                      退款</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账户设置" name="second">
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <el-form ref="userInfo" :model="userInfo" label-width="80px">
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-form-item label="用户头像" prop="avatar_b">
                    <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      action="http://47.94.131.208:8888"
                      :show-file-list="false"
                      :on-change="changePhotoFile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :auto-upload="false"
                      :name="this.userInfo.avatar_b"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <img v-else src="../assets/avatar.jpg" class="avatar" />
                      <div class="avatar-uploader-icon">
                        <i
                          class="el-icon-warning-outline"
                          style="margin-right: 5px"
                        ></i>
                        <i style="color: #909399">点击头像进行修改</i>
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
                  <el-form-item label="用户昵称" prop="name">
                    <el-input v-model="userInfo.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="绑定邮箱" prop="username">
                    <span>{{ userInfo.username }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    ></i>
                    <i style="color: #909399"
                      >邮箱一旦绑定不得更改，如有需要请联系管理员</i
                    >
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="primary" @click="confirmChange"
                      >确认修改</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.userInfo.identity"
          label="申请成为商家"
          name="third"
        >
          <div
            style="display: flex; justify-content: center; align-items: center"
            v-if="this.userInfo.apply_pass == 0"
          >
            <el-form ref="userInfo" :model="userInfo" label-width="80px">
              <el-row>
                <el-col>
                  <el-form-item>
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
                  <el-form-item label="店铺封面" prop="shopavatar">
                    <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      action="http://47.94.131.208:8888"
                      :show-file-list="false"
                      :on-change="changePhotoFile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :auto-upload="false"
                      :name="this.shopInfo.shopavatar"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <img v-else src="../assets/avatar.jpg" class="avatar" />
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
                  <el-form-item label="店铺名称" prop="shopname">
                    <el-input v-model="shopInfo.shopname"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="申请理由" prop="shopReason">
                    <el-input v-model="shopInfo.shopReason"></el-input>
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
        <el-tab-pane v-else label="我的店铺" name="third"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MyCropper from "./cropper.vue";
import axios from "axios";
import { Message } from 'element-ui';
export default {
  components: {
    MyCropper,
  },
  prop: {
    username: String,
  },
  data() {
    return {
      isLoading: false,
      activeName: "first",
      imageUrl: "",
      userInfo: {
        avatar_b: "",
        username: "",
        name: "",
        password: "",
        imageUrl: "",
        identity: "0",
        apply_reason: "",
        apply_pass: "0",
      },
      shopInfo: {
        shopavatar: "",
        shopname: "",
        shopReason: "",
      },
      //
      dialogVisible: false,
    };
  },
  computed: {
    hasIdentity() {
      return this.$store.state.identity;
    },
  },
  methods: {
    //返回首页
    gotoIndex() {
      this.$router.push("/");
    },
    gotoDaishouhuo() {
      this.$router.push("/");
    },
    //确认修改个人信息
    confirmChange() {},
    //确认申请成为商家
    confirmApply() {},
    uploadAvatar(formData) {},
    //裁剪
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
      const formData = new FormData();
      formData.append("avatar_b", file);
      uploadAvatar(formData).then((res) => {
        if (res.code === 0) {
          this.userInfo.avatar_b = res.filename;
          this.userInfo.imageUrl = res.url;
          this.imageUrl = res.url;
          //上传成功后，关闭弹框组件
          // this.handleCrop(file);
          this.$refs.myCropper.close();
        } else {
          this.$message.error("上传出错");
        }
      });
      // this.$refs.upload.submit();
    },
    //头像上传成功之后的方法,进行回调
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.userInfo.avatar_b = res.filename;
        this.userInfo.imageUrl = res.url;
        this.imageUrl = res.url;
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
    //获取用户信息
    getUserInfo() {
      axios({
        url: "http://127.0.0.1:8088/user/getByUsername",
        method: "GET",
        params: {
          username: this.$store.state.username,
        },
      })
        .then((res) => {
          console.log(res);
          const { code} = res.data;
          //code=='0'表示登录成功，进行本地存储和store存储 并进行跳转。
          //else 弹出错误提示
          if (code == "200") {
            this.userInfo = res.data;
          } else {
            this.$message({
              message: "获取用户信息失败",
              type: "danger",
            });
          }
        })
        .catch((err) => {
          Message({
            type: "error",
            message: err || "出现错误，请稍后再试",
          });
        });
    },
  },
  async create() {
    //isLoading=true;
    //this.getUserInfo();
    //isLoading=false;
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
  width: 500px;
  height: 400px;
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
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 20%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
</style>