<template>
  <div>
    <div class="header">
      <div class="logo3">
        <img width="250px" src="../assets/jwbc.png" />
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
    <div style="margin: 3% 18% 0%">
      <el-row style="margin: 0% 12% 5%">
        <el-card>
          <el-col :span="8" style="text-align: center">
            <p>图书总数</p>
            <p style="font-size: 40px">{{ this.tableData.length }}</p>
          </el-col>
          <el-col :span="16" style="text-align: center">
            <p>各图书类别所占比例</p>
            <div>
              <div id="chartPie" class="pie-wrap"></div>
            </div>
          </el-col>
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
          <el-table-column label="图书图片" width="200">
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
                >调整</el-button
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
        title="图书信息调整"
        :visible.sync="dialogChangeVisible"
        width="30%"
        :before-close="handleClose"
        center
      >
        <el-form ref="lists1" :model="lists1" label-width="110px">
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
          <el-form-item label="图书名称：" prop="bookName">
            <el-input v-model="lists1.bookName"></el-input>
          </el-form-item>
          <el-form-item label="图书作者：" prop="bookAuthor">
            <el-input v-model="lists1.bookAuthor"></el-input>
          </el-form-item>
          <el-form-item label="图书一级分类：" prop="classOne">
            <el-input v-model="lists1.classOne"></el-input>
          </el-form-item>
          <el-form-item label="图书二级分类：" prop="classTwo">
            <el-input v-model="lists1.classTwo"></el-input>
          </el-form-item>
          <el-form-item label="图书单价：" prop="bookPrice">
            <el-input v-model="lists1.bookPrice"> </el-input>
          </el-form-item>
          <el-form-item label="图书库存：" prop="Inventory">
            <el-input v-model="lists1.Inventory"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogChangeVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogChangeVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="新增图书"
        :visible.sync="dialogAddVisible"
        width="30%"
        :before-close="handleClose"
        center
      >
        <el-form ref="lists" :model="lists" label-width="110px">
          <el-form-item label="图书图片：" prop="bookImg">
            <span
              ><el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="lists.bookImg" :src="lists.bookImg" class="avatar" />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i> </el-upload
            ></span>
          </el-form-item>
          <el-form-item label="图书名称：" prop="bookName">
            <el-input v-model="lists.bookName"></el-input>
          </el-form-item>
          <el-form-item label="图书作者：" prop="bookAuthor">
            <el-input v-model="lists.bookAuthor"></el-input>
          </el-form-item>
          <el-form-item label="图书一级分类：" prop="classOne">
            <el-input v-model="lists.classOne"></el-input>
          </el-form-item>
          <el-form-item label="图书二级分类：" prop="classTwo">
            <el-input v-model="lists.classTwo"></el-input>
          </el-form-item>
          <el-form-item label="图书单价：" prop="bookPrice">
            <el-input v-model="lists.bookPrice"> </el-input>
          </el-form-item>
          <el-form-item label="图书库存：" prop="Inventory">
            <el-input v-model="lists.Inventory"></el-input>
          </el-form-item>
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
import echarts from "echarts";
export default {
  data() {
    return {
      dialogChangeVisible: false,
      dialogAddVisible: false,
      tableData: [
        {
          bookimg: require("../assets/kuku.png"),
          bookname: "书本1号",
          bookauthor: "张三",
          classone: "小说",
          classtwo: "男频",
          bookprice: 10,
          inventory: 100,
        },
        {
          bookimg: require("../assets/kuku.png"),
          bookname: "书本2号",
          bookauthor: "李四",
          classone: "小说",
          classtwo: "女频",
          bookprice: 11,
          inventory: 101,
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
      },
      lists: {
        bookImg: "",
        bookName: "",
        bookAuthor: "",
        classOne: "",
        classTwo: "",
        bookPrice: 0,
        Inventory: 0,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
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
      this.dialogChangeVisible = true;
    },
    addBook() {
      var temp = {
        index: this.tableData.length,
        bookImg: "",
        bookName: "",
        bookAuthor: "",
        classOne: "",
        classTwo: "",
        bookPrice: 0,
        Inventory: 0,
      };
      temp.bookImg = this.lists.bookImg;
      temp.bookName = this.lists.bookName;
      temp.bookAuthor = this.lists.bookAuthor;
      temp.classOne = this.lists.classOne;
      temp.classTwo = this.lists.classTwo;
      temp.bookPrice = this.lists.bookPrice;
      temp.Inventory = this.lists.Inventory;
      this.tableData.push(temp);
      this.dialogAddVisible = false;
    },
    deleteBook() {},
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
    drawPieChart() {
      this.chartPie = echarts.init(
        document.getElementById("chartPie"),
        "macarons"
      );
      this.chartPie.setOption({
        //显示在上面的文字
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
          formatter: "{b}: <br/>{c}({d}%)",
        },
        legend: {
          data: ["网络文学", "教育", "小说", "文艺", "青春/动漫"],
          right: 500,
          orient: "vertical",
          // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
          //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          //   left: "center",
          //   top: "bottom",
          //   orient: "horizontal"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            //圆圈的粗细
            radius: ["50%", "80%"],
            //圆圈的位置
            center: ["50%", "50%"],
            data: [
              {
                value: 234,
                name: "网络文学",
              },
              {
                value: 135,
                name: "教育",
              },
              {
                value: 548,
                name: "小说",
              },
              {
                value: 562,
                name: "文艺",
              },
              {
                value: 165,
                name: "青春/动漫",
              },
            ],
            //动画持续时间：2秒
            animationDuration: 2000,
            //控制是否显示指向文字的,默认为true
            label: {
              show: false,
              position: "center",
              //以下代码可以代表指向小文字的
              //   show: true,
              //   formatter: "{b} : {c} ({d}%)",
              //   textStyle: {
              //     color: "#333",
              //     fontSize: 14,
              //   },
            },
            itemStyle: {
              //这里是更添加阴影
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              //这里是更改颜色
              normal: {
                color: function (params) {
                  var colorList = [
                    "#5470c6",
                    "#91cc75",
                    "#fac858",
                    "#ee6666",
                    "#73c0de",
                    "#3ba272",
                    "#fc8452",
                    "#9a60b4",
                    "#ea7ccc",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
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