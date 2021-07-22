<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <div class="title">店铺管理</div>
    </div>
    <div style="margin: 2% 10%">
      <el-page-header @back="goToManage" content="图书管理"></el-page-header>
    </div>
    <div style="margin: 2% 10%">
      <el-row style="margin: 0% 0% 5%">
        <el-card>
          <el-container>
            <el-aside width="35px"><div class="verticalBar1"></div></el-aside>
            <el-main>
              <span style="font-weight: 1000">欢迎您，亲爱的店家 </span>
              <p style="font-weight: 1000">
                您可以在本页面进行图书管理，包括: 修改图书信息 新增图书 下架图书
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
    </div>
    <div style="margin: 3% 10%">
      <el-card>
        <el-form label-width="120px">
          <el-form-item label="书名搜索：">
            <el-input
              v-model="searchText"
              placeholder="输入书名模糊搜索"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="
            tableData.filter((x) => {
              return x.bookname.includes(searchText);
            })
          "
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="图片" width="130">
            <template slot-scope="scope"
              ><img :src="scope.row.bookimg" class="imgStyle"
            /></template>
          </el-table-column>
          <el-table-column label="名称" width="120">
            <template slot-scope="scope">{{ scope.row.bookname }}</template>
          </el-table-column>
          <el-table-column label="作者" width="100">
            <template slot-scope="scope">{{ scope.row.bookauthor }}</template>
          </el-table-column>
          <el-table-column label="出版时间" width="100">
            <template slot-scope="scope">{{ scope.row.bookPubTime }}</template>
          </el-table-column>
          <el-table-column label="出版社" width="120">
            <template slot-scope="scope">{{ scope.row.press }}</template>
          </el-table-column>
          <el-table-column label="一级分类" width="100">
            <template slot-scope="scope">{{ scope.row.classone }}</template>
          </el-table-column>
          <el-table-column label="二级分类" width="100">
            <template slot-scope="scope">{{ scope.row.classtwo }}</template>
          </el-table-column>
          <el-table-column label="单价" width="100">
            <template slot-scope="scope">{{ scope.row.bookprice }}</template>
          </el-table-column>
          <el-table-column label="库存" width="100">
            <template slot-scope="scope">{{ scope.row.inventory }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope"
              ><el-button
                type="text"
                style="font-size:20px"
                @click="handleChange(scope.$index, scope.row)"
                >修改图书信息</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div style="margin: 1.5% 10% 3%">
      <el-button
        size="medium"
        type="primary"
        @click.native="dialogAddVisible = true"
        style="margin-left: 80%"
        >新增图书</el-button
      >
      <el-button size="medium" type="warning" @click.native="deleteBook()"
        >下架所选图书</el-button
      >
    </div>
    <div>
      <el-dialog
        title="修改图书信息"
        :visible.sync="dialogChangeVisible"
        width="60%"
        :before-close="handleClose"
        center
      >
        <el-form
          ref="lists1"
          :model="lists1"
          label-width="130px"
          :rules="rules"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书图片：" prop="bookImg">
                <span
                  ><el-upload
                    class="avatar-uploader"
                    ref="upload"
                    action="http://47.94.131.208:8888"
                    :show-file-list="false"
                    :on-change="changePhotoFile"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="false"
                    :name="this.lists1.bookImg"
                  >
                    <img
                      v-if="lists1.bookImg"
                      :src="lists1.bookImg"
                      class="avatar"
                    />
                    <img v-else src="../../assets/avatar.jpg" class="avatar" />
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
                  ></my-cropper
                ></span>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书出版时间：" prop="bookPubTime">
                <el-date-picker
                  v-model="lists1.bookPubTime"
                  type="date"
                  placeholder="选择出版时间"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            ><el-col :span="11">
              <el-form-item label="图书名称：" prop="bookName">
                <el-input v-model="lists1.bookName"></el-input>
              </el-form-item> </el-col
            ><el-col :span="1"><span>&emsp;</span></el-col
            ><el-col :span="11">
              <el-form-item label="图书作者：" prop="bookAuthor">
                <el-input v-model="lists1.bookAuthor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书出版社：" prop="press">
                <el-input v-model="lists1.press"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书单价：" prop="bookPrice">
                <el-input v-model="lists1.bookPrice"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            ><el-col :span="11">
              <el-form-item label="图书一级分类：" prop="classOne">
                <el-select
                  v-model="lists1.classOne"
                  @change="change1"
                  placeholder="请选择图书一级分类"
                >
                  <el-option
                    v-for="option in optionData.One"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书库存：" prop="Inventory">
                <el-input v-model.number="lists1.Inventory"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            ><el-col :span="11">
              <el-form-item label="图书二级分类：" prop="classTwo">
                <el-select
                  v-model="lists1.classTwo"
                  placeholder="请选择图书二级分类"
                >
                  <el-option
                    v-for="option in optionData.Two[index2]"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel1">取 消</el-button>
          <el-button type="primary" @click="changeBook">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="新增图书"
        :visible.sync="dialogAddVisible"
        width="60%"
        :before-close="handleClose"
        center
      >
        <el-form
          ref="lists1"
          :model="lists1"
          label-width="130px"
          :rules="rules"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书图片：" prop="bookImg">
                <span
                  ><el-upload
                    class="avatar-uploader"
                    ref="upload"
                    action="http://47.94.131.208:8888"
                    :show-file-list="false"
                    :on-change="changePhotoFile"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="false"
                    :name="this.lists1.bookImg"
                  >
                    <img
                      v-if="lists1.bookImg"
                      :src="lists1.bookImg"
                      class="avatar"
                    />
                    <img v-else src="../../assets/avatar.jpg" class="avatar" />
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
                  ></my-cropper
                ></span>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书出版时间：" prop="bookPubTime">
                <el-date-picker
                  v-model="lists1.bookPubTime"
                  type="date"
                  placeholder="选择出版时间"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            ><el-col :span="11">
              <el-form-item label="图书名称：" prop="bookName">
                <el-input
                  v-model="lists1.bookName"
                ></el-input> </el-form-item></el-col
            ><el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书作者：" prop="bookAuthor">
                <el-input v-model="lists1.bookAuthor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书出版社：" prop="press">
                <el-input v-model="lists1.press"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书单价：" prop="bookPrice">
                <el-input v-model="lists1.bookPrice"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            ><el-col :span="11">
              <el-form-item label="图书一级分类：" prop="classOne">
                <el-select
                  v-model="lists1.classOne"
                  @change="change1"
                  placeholder="请选择图书一级分类"
                >
                  <el-option
                    v-for="option in optionData.One"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书库存：" prop="Inventory">
                <el-input v-model.number="lists1.Inventory"></el-input>
              </el-form-item>
            </el-col> </el-row
          ><el-row
            ><el-col :span="11">
              <el-form-item label="图书二级分类：" prop="classTwo">
                <el-select
                  v-model="lists1.classTwo"
                  placeholder="请选择图书二级分类"
                >
                  <el-option
                    v-for="option in optionData.Two[index2]"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel2">取 消</el-button>
          <el-button type="primary" @click="addBook('lists1')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import MyCropper from "../cropper.vue";
import axios from "axios";
import { Message } from "element-ui";
export default {
  components: {
    MyCropper,
  },
  data() {
    return {
      searchText: "",
      isLoading: false,
      dialogChangeVisible: false,
      dialogAddVisible: false,
      itemKey: 0,
      index: 0,
      index2: 0,
      shop_id: "",
      optionData: {
        One: [
          { value: "网络文学", name: "网络文学" },
          { value: "教育", name: "教育" },
          { value: "小说", name: "小说" },
          { value: "文艺", name: "文艺" },
          { value: "青春/动漫", name: "青春/动漫" },
        ],
        Two: [
          [
            { value: "男频", name: "男频" },
            { value: "女频", name: "女频" },
          ],
          [
            { value: "教材", name: "教材" },
            { value: "教辅资料", name: "教辅资料" },
          ],

          [
            { value: "中国小说", name: "中国小说" },
            { value: "外国小说", name: "外国小说" },
          ],
          [
            { value: "文学", name: "文学" },
            { value: "艺术", name: "艺术" },
          ],
          [
            { value: "青春", name: "青春" },
            { value: "动漫", name: "动漫" },
          ],
        ],
      },
      tableData: [
        {
          bookimg: require("../../assets/kuku.png"),
          bookname: "书本1号",
          bookauthor: "张三",
          classone: "小说",
          classtwo: "中国小说",
          bookprice: "10.00",
          inventory: "100",
          bookPubTime: "2021-1-1",
          press: "某某出版社",
        },
        {
          bookimg: require("../../assets/kuku.png"),
          bookname: "书本2号",
          bookauthor: "李四",
          classone: "小说",
          classtwo: "外国小说",
          bookprice: "11.00",
          inventory: "101",
          bookPubTime: "2020-2-2",
          press: "某某出版社",
        },
      ],
      lists1: {
        bookImg: "",
        bookName: "",
        bookAuthor: "",
        classOne: "",
        classTwo: "",
        bookPrice: "",
        Inventory: "",
        bookPubTime: "",
        press: "",
      },
      multipleSelection: [],
      formdata: new FormData(),
      rules: {
        bookName: [
          {
            type: "string",
            required: true,
            message: "请输入书名",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        bookAuthor: [
          {
            type: "string",
            required: true,
            message: "请输入作者",
            trigger: "blur",
          },
        ],
        classOne: [
          {
            required: true,
            message: "请选择图书一级分类",
            trigger: "change",
          },
        ],
        classTwo: [
          {
            required: true,
            message: "请选择图书二级分类",
            trigger: "change",
          },
        ],
        bookPrice: [
          {
            required: true,
            pattern: /^\d+\.?\d{2,2}$/,
            message: "请输入正确的金额（具有两位小数）",
            trigger: "blur",
          },
        ],
        Inventory: [
          {
            type: "integer",
            required: true,
            message: "请输入书本库存",
            trigger: "blur",
          },
        ],
        bookPubTime: [
          {
            required: true,
            message: "请选择书本出版时间",
            trigger: "blur",
          },
        ],
        press: [
          {
            type: "string",
            required: true,
            message: "请输入出版社",
            trigger: "blur",
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {
    hasUsername() {
      return this.$store.state.username;
    },
  },
  methods: {
    change1() {
      if (this.lists1.classOne == "网络文学") {
        this.index2 = 0;
      } else if (this.lists1.classOne == "教育") {
        this.index2 = 1;
      } else if (this.lists1.classOne == "小说") {
        this.index2 = 2;
      } else if (this.lists1.classOne == "文艺") {
        this.index2 = 3;
      } else if (this.lists1.classOne == "青春/动漫") {
        this.index2 = 4;
      }
    },
    goToManage() {
      this.$router.push("/shopManage");
    },
    handleChange(index) {
      this.lists1.bookImg = this.tableData[index].bookimg;
      this.lists1.bookName = this.tableData[index].bookname;
      this.lists1.bookAuthor = this.tableData[index].bookauthor;
      this.lists1.classOne = this.tableData[index].classone;
      this.lists1.classTwo = this.tableData[index].classtwo;
      this.lists1.bookPrice = this.tableData[index].bookprice;
      this.lists1.Inventory = this.tableData[index].inventory;
      this.lists1.bookPubTime = this.tableData[index].bookPubTime;
      this.lists1.press = this.tableData[index].press;
      this.index = index;
      this.dialogChangeVisible = true;
    },
    changeBook() {
      this.tableData[this.index].bookimg = this.lists1.bookImg;
      this.tableData[this.index].bookname = this.lists1.bookName;
      this.tableData[this.index].bookauthor = this.lists1.bookAuthor;
      this.tableData[this.index].classone = this.lists1.classOne;
      this.tableData[this.index].classtwo = this.lists1.classTwo;
      this.tableData[this.index].bookprice = this.lists1.bookPrice;
      this.tableData[this.index].inventory = this.lists1.Inventory;
      this.tableData[this.index].bookPubTime = this.lists1.bookPubTime;
      this.tableData[this.index].press = this.lists1.press;
      this.dialogChangeVisible = false;
      this.lists1.bookImg = "";
      this.lists1.bookName = "";
      this.lists1.bookAuthor = "";
      this.lists1.classOne = "";
      this.lists1.classTwo = "";
      this.lists1.bookPrice = "";
      this.lists1.Inventory = "";
      this.lists1.bookPubTime = "";
      this.lists1.press = "";
    },
    addBook(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /*var temp = {
            bookImg: "",
            bookName: "",
            bookAuthor: "",
            classOne: "",
            classTwo: "",
            bookPrice: "",
            Inventory: "",
            bookPubTime: "",
            press: "",
          };
          temp.bookImg = this.lists1.bookImg;
          temp.bookName = this.lists1.bookName;
          temp.bookAuthor = this.lists1.bookAuthor;
          temp.classOne = this.lists1.classOne;
          temp.classTwo = this.lists1.classTwo;
          temp.bookPrice = this.lists1.bookPrice;
          temp.Inventory = this.lists1.Inventory;
          temp.bookPubTime = this.lists1.bookPubTime;
          temp.press = this.lists1.press;*/
          //this.tableData.unshift(this.lists1);
          this.formdata.append("book_name", this.lists1.bookName);
          this.formdata.append("author", this.lists1.bookAuthor);
          this.formdata.append("price", this.lists1.bookPrice);
          this.formdata.append("repertory", this.lists1.Inventory);
          this.formdata.append("press", this.lists1.press);
          this.formdata.append("print_time", this.lists1.bookPubTime);
          this.formdata.append("main_category_id", this.lists1.classOne);
          this.formdata.append("second_category_id", this.lists1.classTwo);
          this.formdata.append("shop_id", this.shop_id);
          this.formdata.append("edition", null);
          axios({
            url: this.$store.state.yuming + "/book/addBook",
            method: "POST",
            data: this.formdata,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "新增图书成功",
                type: "success",
              });
              this.lists1 = "";
              this.dialogAddVisible = false;
            } else {
              this.$message.error("新增图书失败，请重试");
            }
          });
        } else {
          return false;
        }
      });
    },
    cancel1() {
      this.lists1.bookImg = "";
      this.lists1.bookName = "";
      this.lists1.bookAuthor = "";
      this.lists1.classOne = "";
      this.lists1.classTwo = "";
      this.lists1.bookPrice = "";
      this.lists1.Inventory = "";
      this.lists1.bookPubTime = "";
      this.lists1.press = "";
      this.dialogChangeVisible = false;
    },
    cancel2() {
      this.lists1.bookImg = "";
      this.lists1.bookName = "";
      this.lists1.bookAuthor = "";
      this.lists1.classOne = "";
      this.lists1.classTwo = "";
      this.lists1.bookPrice = "";
      this.lists1.Inventory = "";
      this.lists1.bookPubTime = "";
      this.lists1.press = "";
      this.dialogAddVisible = false;
    },
    deleteBook() {
      this.$confirm("是否下架所选图书?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let multData = this.multipleSelection;
          let tableData1 = this.tableData;
          let multDataLen = multData.length;
          let tableDataLen = tableData1.length;
          for (let i = 0; i < multDataLen; i++) {
            for (let y = 0; y < tableDataLen; y++) {
              if (
                JSON.stringify(tableData1[y]) == JSON.stringify(multData[i])
              ) {
                this.tableData.splice(y, 1);
              }
            }
          }
          this.$message({
            type: "success",
            message: "下架所选图书成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃下架所选图书",
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.lists1.bookImg = "";
          this.lists1.bookName = "";
          this.lists1.bookAuthor = "";
          this.lists1.classOne = "";
          this.lists1.classTwo = "";
          this.lists1.bookPrice = "";
          this.lists1.Inventory = "";
          this.lists1.bookPubTime = "";
          this.lists1.press = "";
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.lists1.bookImg = window.URL.createObjectURL(file);
      this.$refs.myCropper.close();
    },
    //头像上传成功之后的方法,进行回调
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.lists1.bookImg = res.img;
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
            this.shop_id = data;
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getShopInfo();
    this.isLoading = false;
  },
};
</script>
<style acoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
}
.logo3 {
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 20px 100px;
  position: relative;
  right: 250px;
}
.imgStyle {
  width: 100px;
  height: 120px;
}
.verticalBar1 {
  width: 3px;
  height: 100%;
  background: rgb(60, 59, 105);
  display: inline-block;
  vertical-align: top;
  margin-right: 0px;
  margin-left: 30px;
  border-radius: 20%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.title {
  font-size: 35px;
  padding: 30px 10px;
  position: relative;
  left: 180px;
}
.el-select {
  width: 100%;
}
</style>