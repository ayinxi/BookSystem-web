<template>
  <div>
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="gotoRefund"
        content="填写详细信息"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <div v-if="this.serviceId == 1">
      <el-row>
        <el-col :offset="4" :span="16">
          <el-steps
            :space="300"
            :active="1"
            align-center
            simple
            finish-status="success"
          >
            <el-step title="买家申请仅退款"></el-step>
            <el-step title="卖家处理退款申请"></el-step>
            <el-step title="退款完毕"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col :offset="4" :span="16">
          <el-card>
            <el-form
              ref="refundInfo"
              :model="refundInfo"
              label-width="100px"
              :rules="firstRules"
            >
              <el-form-item label="退款商品：">
                <el-row>
                  <el-col :span="3">
                    <img
                      :src="bookList.book_img"
                      style="height: 100px; width: 100px"
                    />
                  </el-col>
                  <el-col :span="21">
                    <div style="margin-right: 30px" class="book-name">
                      {{ bookList.book_name }}
                    </div>
                    <div class="book-total" style="margin-top: 20px">
                      ￥{{ bookList.book_total }}
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="服务类型："> 仅退款 </el-form-item>
              <el-form-item label="货物状态：">
                <el-radio-group v-model="radio" prop="goods_status">
                  <el-radio :label="1">未收到货</el-radio>
                  <el-radio :label="2">已收到货</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="退款原因：" prop="option">
                <el-select
                  v-model="refundInfo.option"
                  placeholder="请选择"
                  v-if="radio == 1"
                >
                  <el-option
                    v-for="item in firstOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="refundInfo.option"
                  placeholder="请选择"
                  v-if="radio == 2"
                >
                  <el-option
                    v-for="item in secondOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="退款金额：" class="book-total">
                ￥{{ bookList.book_total }}
              </el-form-item>
              <el-form-item label="退款说明：" prop="reason">
                <el-input
                  type="textarea"
                  v-model="refundInfo.reason"
                  maxlength="200"
                  show-word-limit
                  clearable
                  style="width: 500px"
                  rows="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="上传图片：" prop="img">
                <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  action="http://47.94.131.208:8888"
                  :show-file-list="false"
                  :on-change="changePhotoFile"
                  :auto-upload="false"
                  :name="this.refundInfo.img"
                >
                  <img
                    v-if="this.refundInfo.img"
                    :src="this.refundInfo.img"
                    class="avatar"
                  />
                  <img v-else src="../assets/avatar.jpg" class="avatar" />
                  <div class="avatar-uploader-icon">
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    ></i>
                    <i style="color: #909399">可上传1张凭证</i>
                  </div>
                </el-upload>
                <my-cropper
                  ref="myCropper"
                  @getFile="getFile"
                  @upAgain="upAgain"
                ></my-cropper>
              </el-form-item>
              <el-form-item>
                <el-button> 提交 </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="this.serviceId == 2">
      <el-row>
        <el-col :offset="3" :span="18">
          <el-steps
            :space="300"
            :active="1"
            align-center
            simple
            finish-status="success"
          >
            <el-step title="买家申请退货退款"></el-step>
            <el-step title="卖家处理退货申请"></el-step>
            <el-step title="买家退货"></el-step>
            <el-step title="退款完毕"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col :offset="3" :span="18">
          <el-card>
            <el-form
              ref="refundInfo"
              :model="refundInfo"
              label-width="100px"
              style="margin-left: 150px"
              :rules="secondRules"
            >
              <el-form-item label="退款商品：">
                <el-row>
                  <el-col :span="3">
                    <img
                      :src="bookList.book_img"
                      style="height: 100px; width: 100px"
                    />
                  </el-col>
                  <el-col :span="21">
                    <div style="margin-right: 30px" class="book-name">
                      {{ bookList.book_name }}
                    </div>
                    <div class="book-total" style="margin-top: 20px">
                      ￥{{ bookList.book_total }}
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="服务类型："> 退货退款 </el-form-item>
              <el-form-item label="退款原因：" prop="option">
                <el-select v-model="refundInfo.option" placeholder="请选择">
                  <el-option
                    v-for="item in thirdOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="退款金额：" class="book-total">
                ￥{{ bookList.book_total }}
              </el-form-item>
              <el-form-item label="退款说明：" prop="reason">
                <el-input
                  type="textarea"
                  v-model="refundInfo.reason"
                  maxlength="200"
                  show-word-limit
                  clearable
                  style="width: 500px"
                  rows="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="上传图片：" prop="img">
                <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  action="http://47.94.131.208:8888"
                  :show-file-list="false"
                  :on-change="changePhotoFile"
                  :auto-upload="false"
                  :name="this.refundInfo.img"
                >
                  <img
                    v-if="this.refundInfo.img"
                    :src="this.refundInfo.img"
                    class="avatar"
                  />
                  <img v-else src="../assets/avatar.jpg" class="avatar" />
                  <div class="avatar-uploader-icon">
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    ></i>
                    <i style="color: #909399">可上传1张凭证</i>
                  </div>
                </el-upload>
                <my-cropper
                  ref="myCropper"
                  @getFile="getFile"
                  @upAgain="upAgain"
                ></my-cropper>
              </el-form-item>
              <el-form-item>
                <el-button> 提交 </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="this.serviceId == 3" v-loading="thirdLoading">
      <el-row>
        <el-col :offset="3" :span="18">
          <el-steps
            :space="300"
            :active="1"
            align-center
            simple
            finish-status="success"
          >
            <el-step title="买家申请退货退款"></el-step>
            <el-step title="卖家处理退货申请"></el-step>
            <el-step title="买家退货"></el-step>
            <el-step title="卖家再次发货"></el-step>
            <el-step title="换货完毕"></el-step>
          </el-steps>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col :offset="3" :span="18">
          <el-card>
            <el-form
              ref="refundInfo"
              :model="refundInfo"
              label-width="100px"
              style="margin-left: 150px"
              :rules="thirdRules"
            >
              <el-form-item label="换货商品：">
                <el-row>
                  <el-col :span="3">
                    <img
                      :src="bookList.book_img"
                      style="height: 100px; width: 100px"
                    />
                  </el-col>
                  <el-col :span="21">
                    <div style="margin-right: 30px" class="book-name">
                      {{ bookList.book_name }}
                    </div>
                    <div class="book-total" style="margin-top: 20px">
                      ￥{{ bookList.book_total }}
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="服务类型："> 换货 </el-form-item>
              <el-form-item label="换货原因：" prop="option">
                <el-select v-model="refundInfo.option" placeholder="请选择">
                  <el-option
                    v-for="item in fouthOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="换货地址：" prop="addressId">
                <el-table :data="myAddressList">
                  <el-table-column width="35">
                    <template slot-scope="scope">
                      <el-radio :label="scope.row.id" v-model="refundInfo.addressId"
                        ></el-radio
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="收货人" width="100">
                  </el-table-column>
                  <el-table-column prop="phone" label="电话号码" width="200">
                  </el-table-column>
                  <el-table-column prop="address" label="收货地址">
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="退款说明：" prop="reason">
                <el-input
                  type="textarea"
                  v-model="refundInfo.reason"
                  maxlength="200"
                  show-word-limit
                  clearable
                  style="width: 500px"
                  rows="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="上传图片：" prop="img">
                <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  action="http://47.94.131.208:8888"
                  :show-file-list="false"
                  :on-change="changePhotoFile"
                  :auto-upload="false"
                  :name="this.refundInfo.img"
                >
                  <img
                    v-if="this.refundInfo.img"
                    :src="this.refundInfo.img"
                    class="avatar"
                  />
                  <img v-else src="../assets/avatar.jpg" class="avatar" />
                  <div class="avatar-uploader-icon">
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 5px"
                    ></i>
                    <i style="color: #909399">可上传1张凭证</i>
                  </div>
                </el-upload>
                <my-cropper
                  ref="myCropper"
                  @getFile="getFile"
                  @upAgain="upAgain"
                ></my-cropper>
              </el-form-item>
              <el-form-item>
                <el-button> 提交 </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MyCropper from "../components/cropper.vue";
import axios from "axios";
export default {
  components: {
    MyCropper,
  },
  data() {
    return {
      filelist: [],
      radio: 1,
      radioId:1,
      bookId: this.$route.params.bookId,
      serviceId: this.$route.params.serviceId,
      thirdLoading: false,
      firstOptions: [
        {
          value: "选项1",
          label: "不喜欢/不想要",
        },
        {
          value: "选项2",
          label: "空包裹",
        },
        {
          value: "选项3",
          label: "未按约定时间发货",
        },
        {
          value: "选项4",
          label: "快递/物流一直未送到",
        },
        {
          value: "选项5",
          label: "快递/物流无跟踪记录",
        },
        {
          value: "选项6",
          label: "货物破损已拒签",
        },
      ],
      secondOptions: [
        {
          value: "选项1",
          label: "退运费",
        },
        {
          value: "选项2",
          label: "实际商品与描述不符",
        },
        {
          value: "选项3",
          label: "做工粗糙/有瑕疵",
        },
        {
          value: "选项4",
          label: "收到商品时有破损/污渍/变形",
        },
        {
          value: "选项5",
          label: "未按约定时间发货",
        },
        {
          value: "选项6",
          label: "卖家发错货",
        },
      ],
      thirdOptions: [
        {
          value: "选项1",
          label: "七天无理由退换货",
        },
        {
          value: "选项2",
          label: "退运费",
        },
        {
          value: "选项3",
          label: "实际商品与描述不符",
        },
        {
          value: "选项4",
          label: "做工粗糙/有瑕疵",
        },
        {
          value: "选项5",
          label: "收到商品时有破损/污渍/变形",
        },
        {
          value: "选项6",
          label: "少件",
        },
        {
          value: "选项7",
          label: "未按约定时间发货",
        },
        {
          value: "选项8",
          label: "卖家发错货",
        },
      ],
      fouthOptions: [
        {
          value: "选项1",
          label: "七天无理由退换货",
        },
        {
          value: "选项2",
          label: "实际商品与描述不符",
        },
        {
          value: "选项3",
          label: "做工粗糙/有瑕疵",
        },
        {
          value: "选项4",
          label: "收到商品时有破损/污渍/变形",
        },
        {
          value: "选项5",
          label: "少件",
        },
        {
          value: "选项6",
          label: "卖家发错货",
        },
      ],
      firstRules: {
        goods_status: [
          { required: true, message: "请选择货物状态", trigger: "blur" },
        ],
        option: [
          { required: true, message: "请选择退款原因", trigger: "blur" },
        ],
      },
      secondRules: {
        option: [
          { required: true, message: "请选择退款原因", trigger: "blur" },
        ],
      },
      thirdRules: {
        option: [
          { required: true, message: "请选择退款原因", trigger: "blur" },
        ],
        addressId: [
          { required: true, message: "请选择换货地址", trigger: "blur" },
        ],
      },
      bookList: {
        orderId: 2,
        merchant_id: 2,
        book_merchant: "新华书店网上商城自营图书",
        create_time: "2021-07-14 18:31:30",
        status: 2,
        book_id: 21,
        book_img: require("../assets/youbenshi.jpg"),
        book_name:
          "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
        book_writer: "冯唐",
        book_publish: "东南大学出版社",
        book_unitPrice: 50,
        book_num: 1,
        book_total: 50,
      },
      refundInfo: {
        goods_status: "",
        reason: "",
        option: "",
        img: "",
        addressId: 1,
      },
      myAddressList: [
        {
          id: "",
          name: "",
          phone: "",
          address: "",
          status: "",
        },
      ],
    };
  },
  methods: {
    gotoRefund() {
      this.$router.push("/refund/" + this.bookId);
    },
    //获取用户的收货地址
    getUserAddress() {
      axios({
        url: this.$store.state.yuming + "/user/address/getAll",
        method: "GET",
      }).then((res) => {
        if (res.data.code == 200) {
          this.myAddressList = res.data.data;
        } else {
          this.$message.error("获取收货地址，请重试");
        }
      });
    },
    //上传图片时会被调用
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
      var formData = new FormData();
      formData.append("img", file);
      axios({
        url: this.$store.state.yuming + "/updateAvatar",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$refs.myCropper.close();
        } else {
          this.$message.error("上传出错");
        }
      });
      // this.$refs.upload.submit();
    },
    // 提取文件后缀名
    getSuffix(str) {
      const fileExtension = str.substring(str.lastIndexOf(".") + 1);
      return fileExtension;
    },
    //上传图片时会被调用
    changePhotoFile(file) {
      let type = this.getSuffix(file.name);
      const isLt6M = file.size / 1024 / 1024 < 6;
      if (
        type == "JPG" ||
        type == "JPEG" ||
        type == "PNG" ||
        type == "jpg" ||
        type == "png" ||
        type == "jpge"
      ) {
        if (!isLt6M) {
          this.$message.error("上传图片大小不能超过 6MB!");
        } else {
          this.handleCrop(file);
        }
      } else {
        this.$message.error("上传图片只能是 JPG、JPEG或PNG 格式!");
      }
    },
  },
  async created() {
    if (this.serviceId == 3) {
      this.thirdLoading = true;
      await this.getUserAddress();
      this.thirdLoading = false;
    }
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
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.book-name {
  font-size: 13px;
}
.book-total {
  color: rgb(221, 98, 98);
}
.book-detail {
  font-size: 13px;
  color: grey;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 15px;
  margin-top: 0px;
}
.chooseCard {
  margin: 10px 20px;
  height: 130px;
}
.title {
  font-weight: 600;
  margin-bottom: 10px;
}
.description {
  color: grey;
}
.avatar {
  width: 150px;
  height: 150px;
}
</style>