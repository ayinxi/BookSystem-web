<template>
  <div>
    <div class="header">
      <div class="logo">
        <img width="250px" src="../assets/logo.png" />
      </div>
      <el-button size="medium" @click.native="goToManage"
        >返回商家管理页面</el-button
      >
    </div>
    <div style="margin: 0% 10%">
      <el-row>
        <el-col :span="21" align="right">
          <el-button size="medium" @click.native="addBook">新增图书</el-button>
        </el-col>
        <el-col :span="3" align="right">
          <el-button size="medium" type="danger" @click.native="deleteBook()"
            >删除所选图书</el-button
          >
        </el-col>
      </el-row>
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
              type="primary"
              @click="handleChange(scope.$index, scope.row)"
              >调整</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
            <span><img :src="lists1.bookImg" class="imgStyle" /></span>
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
            <span><img :src="lists.bookImg" class="imgStyle" /></span>
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
          <el-button type="primary" @click="dialogAddVisible = false"
            >确 定</el-button
          >
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
          bookname: "书本1号",
          bookauthor: "张三",
          classone: "小说",
          classtwo: "男频",
          bookprice: 10,
          inventory: 100,
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
  methods: {
    goToManage() {
      this.$router.push("/manage");
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
      this.dialogAddVisible = true;
    },
    deleteBook() {},
  },
};
</script>
<style acoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
.logo {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.imgStyle {
  width: 100px;
  height: 150px;
}
</style>