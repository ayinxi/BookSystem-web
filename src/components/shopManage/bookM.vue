<template>
  <div>
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../../assets/jwbc.png" />
      </div>
      <el-button size="medium" @click.native="goToManage"
        >返回商家管理页面</el-button
      >
    </div>
    <div style="margin: 2% 18%">
      <el-row style="margin: 0% 12% 5%">
        <el-card>
          <el-container>
            <el-aside width="35px"><div class="verticalBar1"></div></el-aside>
            <el-main>
              <span style="font-weight: 1000">欢迎您，亲爱的店家 </span>
              <p style="font-weight: 1000">
                您可以在本页面进行图书管理，包括: 调整图书信息 新增图书 下架图书
              </p>
            </el-main>
          </el-container>
        </el-card>
      </el-row>
    </div>
    <div style="margin: 3% 10%">
      <el-card>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="图书图片" width="180">
            <template slot-scope="scope"
              ><img :src="scope.row.bookimg" class="imgStyle"
            /></template>
          </el-table-column>
          <el-table-column label="图书名称" width="120">
            <template slot-scope="scope">{{ scope.row.bookname }}</template>
          </el-table-column>
          <el-table-column label="图书作者" width="120">
            <template slot-scope="scope">{{ scope.row.bookauthor }}</template>
          </el-table-column>
          <el-table-column label="图书出版时间" width="120">
            <template slot-scope="scope">{{ scope.row.bookPubTime }}</template>
          </el-table-column>
          <el-table-column label="图书一级分类" width="120">
            <template slot-scope="scope">{{ scope.row.classone }}</template>
          </el-table-column>
          <el-table-column label="图书二级分类" width="120">
            <template slot-scope="scope">{{ scope.row.classtwo }}</template>
          </el-table-column>
          <el-table-column label="图书单价" width="120">
            <template slot-scope="scope">{{ scope.row.bookprice }}</template>
          </el-table-column>
          <el-table-column label="图书库存" width="120">
            <template slot-scope="scope">{{ scope.row.inventory }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope"
              ><el-button
                size="mini"
                type="text"
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
      <el-button size="medium" type="danger" @click.native="deleteBook()"
        >下架所选图书</el-button
      >
    </div>
    <div>
      <el-dialog
        title="修改图书信息"
        :visible.sync="dialogChangeVisible"
        width="80%"
        :before-close="handleClose"
        center
      >
        <el-form ref="lists1" :model="lists1" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书图片：" prop="bookImg">
                <span
                  ><el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="lists1.bookImg"
                      :src="lists1.bookImg"
                      class="avatar"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i> </el-upload
                ></span>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书名称：" prop="bookName">
                <el-input v-model="lists1.bookName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书作者：" prop="bookAuthor">
                <el-input v-model="lists1.bookAuthor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书出版时间：" prop="bookPubTime">
                <el-input v-model="lists1.bookPubTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
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
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书单价：" prop="bookPrice">
                <el-input v-model="lists1.bookPrice"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书库存：" prop="Inventory">
                <el-input v-model="lists1.Inventory"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogChangeVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeBook">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="新增图书"
        :visible.sync="dialogAddVisible"
        width="80%"
        :before-close="handleClose"
        center
      >
        <el-form ref="lists" :model="lists" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书图片：" prop="bookImg">
                <span
                  ><el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="lists.bookImg"
                      :src="lists.bookImg"
                      class="avatar"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i> </el-upload
                ></span>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书名称：" prop="bookName">
                <el-input v-model="lists.bookName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书作者：" prop="bookAuthor">
                <el-input v-model="lists.bookAuthor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书出版时间：" prop="bookPubTime">
                <el-input v-model="lists.bookPubTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书一级分类：" prop="classOne">
                <el-select
                  v-model="lists.classOne"
                  @change="change2"
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
              <el-form-item label="图书二级分类：" prop="classTwo">
                <el-select
                  v-model="lists.classTwo"
                  placeholder="请选择图书二级分类"
                >
                  <el-option
                    v-for="option in optionData.Two[index3]"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="图书单价：" prop="bookPrice">
                <el-input v-model="lists.bookPrice"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"><span>&emsp;</span></el-col>
            <el-col :span="11">
              <el-form-item label="图书库存：" prop="Inventory">
                <el-input v-model="lists.Inventory"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBook">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogChangeVisible: false,
      dialogAddVisible: false,
      itemKey: 0,
      index: 0,
      index2: 0,
      index3: 0,
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
          bookprice: 10,
          inventory: 100,
          bookPubTime: 2021,
        },
        {
          bookimg: require("../../assets/kuku.png"),
          bookname: "书本2号",
          bookauthor: "李四",
          classone: "小说",
          classtwo: "外国小说",
          bookprice: 11,
          inventory: 101,
          bookPubTime: 2020,
        },
      ],
      lists1: {
        bookImg: "",
        bookName: "",
        bookAuthor: "",
        classOne: "",
        classTwo: "",
        bookPrice: 0,
        Inventory: 0,
        bookPubTime: 0,
      },
      lists: {
        bookImg: "",
        bookName: "",
        bookAuthor: "",
        classOne: "",
        classTwo: "",
        bookPrice: 0,
        Inventory: 0,
        bookPubTime: 0,
      },
      multipleSelection: [],
    };
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
    change2() {
      if (this.lists.classOne == "网络文学") {
        this.index3 = 0;
      } else if (this.lists.classOne == "教育") {
        this.index3 = 1;
      } else if (this.lists.classOne == "小说") {
        this.index3 = 2;
      } else if (this.lists.classOne == "文艺") {
        this.index3 = 3;
      } else if (this.lists.classOne == "青春/动漫") {
        this.index3 = 4;
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
      this.dialogChangeVisible = false;
    },
    addBook() {
      var temp = {
        index: this.tableData.length,
        bookimg: "",
        bookname: "",
        bookauthor: "",
        classone: "",
        classywo: "",
        bookprice: 0,
        inventory: 0,
        bookPubTime: 0,
      };
      temp.bookimg = this.lists.bookImg;
      temp.bookname = this.lists.bookName;
      temp.bookauthor = this.lists.bookAuthor;
      temp.classone = this.lists.classOne;
      temp.classtwo = this.lists.classTwo;
      temp.bookprice = this.lists.bookPrice;
      temp.inventory = this.lists.Inventory;
      temp.bookPubTime = this.lists.bookPubTime;
      this.tableData.unshift(temp);
      this.lists.bookImg = "";
      this.lists.bookName = "";
      this.lists.bookAuthor = "";
      this.lists.classOne = "";
      this.lists.classTwo = "";
      this.lists.bookPrice = 0;
      this.lists.Inventory = 0;
      this.lists.bookPubTime = 0;
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
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图书图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图书图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
  right: 306px;
}
.imgStyle {
  width: 100px;
  height: 150px;
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
.pie-wrap {
  width: 100%;
  height: 126px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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