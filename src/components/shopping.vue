<template>
  <div>
    <!--
    <div class="bbb"></div>
    -->
    <!--header-->
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin:20px 0" src="../assets/jwbc.png" />
      </div>
      <div class="title">
        <el-page-header v-if="page == 0" content="购物车"></el-page-header>
        <el-page-header
          v-if="page == 1"
          @back="page = 0"
          content="填写订单"
        ></el-page-header>
        <el-page-header
          v-if="page == 2"
          @back="page = 1"
          content="完成订单"
        ></el-page-header>
      </div>
      <div class="stepline">
        <el-steps :active="page" finish-status="success" direction="vertical">
          <el-step title="我的购物车"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="完成订单"></el-step>
        </el-steps>
      </div>
    </div>
    <!--<div class="divider"></div>-->
    <!--content-->
    <div style="margin:0 10%">
      <div v-if="page == 0">
    <header class="table-header">
      <el-row>
        <el-col :span="1" class="table-header-item">
          <el-checkbox v-model="checkAll" class="myRedCheckBox" @click="check_all"></el-checkbox>
        </el-col>
        <el-col :span="1" class="table-header-item">全选</el-col>
        <el-col :span="8" class="table-header-item">商品信息</el-col>
        <el-col :span="4" class="table-header-item">价格(元)</el-col>
        <el-col :span="4" class="table-header-item">数量</el-col>
        <el-col :span="4" class="table-header-item">小计(元)</el-col>
        <el-col :span="2" class="table-header-item">操作</el-col>
      </el-row>
    </header>
    <container class="table-container">
      <div v-for="(item,index) in bookList" :key="index">
        <el-row style="margin:10px">
          <el-col :span="1">
            <el-checkbox v-model="item.this_all" class="myRedCheckBox"></el-checkbox>
          </el-col>
          <el-col :span="23" class="shop-name">{{item.book_merchant}}</el-col>
        </el-row>
        <div class="books">
          <el-row v-for="(books,idx) in item.children" :key="idx" style="margin:10px">
            <!--<el-divider v-if="idx!=0"></el-divider>-->
            <el-col :span="1">
              <el-checkbox style="margin:25px 0" v-model="books.check_one" class="myRedCheckBox"></el-checkbox>
            </el-col>
            <el-col :span="2">
              <img :src="books.book_img" style="height:70px" />
            </el-col>
            <el-col :span="9">
              <div style="margin-right:30px" class="book-name">{{books.book_name}}</div>
              <div class="book-detail">作者：{{books.book_writer}}</div>
              <div class="book-detail">出版社：{{books.book_publish}}</div>
            </el-col>
            <el-col :span="3">
              <div style="margin:25px 0" class="table-unitprice">¥{{books.book_unitPrice}}</div>
            </el-col>
            <el-col :span="5">
              <div style="margin:20px 0">
                <el-input-number
                      v-model="books.book_num"
                      :min="1"
                      :max="books.book_inventory"
                      label="数量"
                      size="small"
                      :precision="0"
                      :step="1"
                    ></el-input-number>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="margin:25px 0" class="table-price">¥{{books.book_unitPrice*books.book_num}}</div>
            </el-col>
            <el-col :span="1">
              <div style="margin:15px 0"><el-button type="text" class="table-button">删除</el-button></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </container>
    <footer class="table-footer">
      <el-row>
        <el-col :span="1" style="margin-left:10px" class="table-footer-item">
          <el-checkbox v-model="checkAll" class="myRedCheckBox" @click="check_all"></el-checkbox>
        </el-col>
        <el-col :span="1" class="table-footer-item">全选</el-col>
        <el-col :span="10" class="table-footer-item" style="margin:12px">
           <el-button size="medium" type="text" class="table-button">批量删除</el-button>
        </el-col>
        <el-col :span="4" class="table-footer-item">已选<span style="color:rgb(221, 68, 65)"> {{totalNumber}} </span>件商品</el-col>
        <el-col :span="4" class="table-footer-item" style="margin-top:12px">合计：<span class="table-totalprice">¥{{totalPrice}}</span></el-col>
        <el-col :span="3" class="table-footer-item" style="margin-top:9px">
          <el-button size="max" type="danger" @click="page = 1">结算</el-button>
        </el-col>
      </el-row>
    </footer>
      </div>



      <!--填写订单-->
      <div v-if="page == 1">
        <div style="margin-bottom: 20px">
          <el-row>
            <h3>收货人信息</h3>
          </el-row>
          <el-row>
            <el-radio-group v-model="radio">
              <el-radio-button
                :label="item.value"
                :key="item.value"
                v-for="item in consigneeInfoList"
                >{{ item.label }}
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <span>{{ item.c_name }}</span>
                    <el-button
                      style="float: right; padding: 3px 3px"
                      type="text"
                      >删除</el-button
                    >
                    <el-button
                      style="float: right; padding: 3px 3px"
                      type="text"
                      @click="editInfoVisible = true"
                      >编辑</el-button
                    >
                    <el-button
                      style="float: right; padding: 3px 3px"
                      type="text"
                      v-if="defaultAddr != item.value"
                      @click="defaultAddr = item.value"
                      >设为默认地址</el-button
                    >
                    <el-button
                      style="float: right; padding: 3px 3px"
                      type="text"
                      v-if="defaultAddr == item.value"
                      disabled
                      >默认地址</el-button
                    >
                  </div>
                  <div class="text item">
                    {{ item.c_phoneNumber }}
                  </div>
                  <div class="text item">
                    {{ item.c_address }}
                  </div>
                </el-card>
              </el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row
            ><el-button
              size="min"
              icon="el-icon-setting"
              type="text"
              @click="addInfoVisible = true"
              >添加收货人信息</el-button
            ></el-row
          >
          <!--编辑收货人信息-->
          <el-dialog title="编辑收货人信息" :visible.sync="editInfoVisible">
            <el-form :model="consigneeInfo">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input
                  v-model="consigneeInfo.c_name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input
                  v-model="consigneeInfo.c_phoneNumber"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input
                  v-model="consigneeInfo.c_address"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editInfoVisible = false">取消</el-button>
              <el-button type="danger" @click="editInfoVisible = false"
                >确认收货人信息</el-button
              >
            </div>
          </el-dialog>
          <!--添加收货人信息-->
          <el-dialog title="添加收货人信息" :visible.sync="addInfoVisible">
            <el-form :model="consigneeInfo">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input
                  v-model="consigneeInfo.c_name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input
                  v-model="consigneeInfo.c_phoneNumber"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input
                  v-model="consigneeInfo.c_address"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addInfoVisible = false">取消</el-button>
              <el-button type="danger" @click="addInfoVisible = false"
                >确认新增收货人信息</el-button
              >
            </div>
          </el-dialog>
        </div>
        <el-divider></el-divider>
        <div style="margin: 20px 0">
          <el-row>
            <h3>送货清单</h3>
          </el-row>
          <el-row>
            <el-table :data="selectList" style="width: 100%">
              <el-table-column label="书籍图片">
                <template slot-scope="scope">
                  <el-popover placement="top-start" trigger="hover">
                    <img
                      :src="scope.row.book_img"
                      style="width: 150px; height: 150px"
                    />
                    <img
                      slot="reference"
                      :src="scope.row.book_img"
                      style="width: 30px; height: 30px"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="书籍名称">
                <template slot-scope="scope">
                  <el-button size="medium" type="text">{{
                    scope.row.book_name
                  }}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="商家">
                <template slot-scope="scope">
                  <el-button size="medium" type="text">{{
                    scope.row.book_merchant
                  }}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="单价（元）"
                prop="book_unitPrice"
              ></el-table-column>
              <el-table-column
                label="数量"
                prop="book_num"
                width="200"
              ></el-table-column>
              <el-table-column label="金额（元）">
                <template slot-scope="scope">
                  <div>{{ scope.row.book_unitPrice * scope.row.book_num }}</div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row style="margin: 20px 0">
            <el-col :span="11">已选择 {{ totalNumber }} 件商品</el-col>
            <el-col :span="10">实付：¥{{ totalPrice }}</el-col>
            <el-col :span="3"
              ><el-button size="medium" type="danger" @click="page = 2"
                >提交订单</el-button
              ></el-col
            >
          </el-row>
        </div>
      </div>




      <!--完成订单-->
      <div v-if="page == 2">
        <el-row class="orderFinish">
          <img src="../assets/kuku.png" />
        </el-row>
        <el-row class="orderFinish">
          <p>恭喜您完成订单！</p>
        </el-row>
        <el-row class="orderFinish">
          <el-button size="medium" type="danger">查看订单</el-button>
          <el-button size="medium" type="danger">回到主页</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  components: {},
  data() {
    return {
      page: 0,
      visible: false,
      editInfoVisible: false,
      addInfoVisible: false,
      radio: 0,
      multipleSelection: [],
      bookList: [
        {
          merchant_id: 1,
          book_merchant: "横溢图书专营店",
          this_all: false,
          children:[
            {
              book_id: 11,
              book_img: require("../assets/youbenshi.jpg"),
              book_name: "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
              book_writer: "冯唐",
              book_publish: "东南大学出版社",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
              bookAddr: "login",
              check_one: false,
            },
            {
              book_id: 12,
              book_img: require("../assets/youbenshi.jpg"),
              book_name: "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
              book_writer: "冯唐",
              book_publish: "东南大学出版社",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
              bookAddr: "login",
              check_one: false,
            },
          ]
        },
        {
          merchant_id: 2,
          book_merchant: "新华书店网上商城自营图书",
          this_all: false,
          children:[
            {
              book_id: 21,
              book_img: require("../assets/youbenshi.jpg"),
              book_name: "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
              book_writer: "冯唐",
              book_publish: "东南大学出版社",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
              check_one: false,
            },
            {
              book_id: 22,
              book_img: require("../assets/youbenshi.jpg"),
              book_name: "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
              book_writer: "冯唐",
              book_publish: "东南大学出版社",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
              check_one: false,
            },
          ]
        },
      ],
      checkAll: false,
      cpmylist: [],
      goodsArr: [],
      defaultAddr: 0,
      consigneeInfoList:[
        {
          value: 0,
          c_name: "甲",
          c_phoneNumber: "123456789",
          c_address: "摩尔庄园",
        },
        {
          value: 1,
          c_name: "乙",
          c_phoneNumber: "123456789",
          c_address: "奥比岛",
        },
        {
          value: 2,
          c_name: "丙",
          c_phoneNumber: "123456789",
          c_address: "奥比岛",
        },
      ],
      consigneeInfo:{
          value: "",
          c_name: "",
          c_phoneNumber: "",
          c_address: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    // 总数
    totalNumber() {
      var number_total = 0;
      for (var i = 0; i < this.bookList.length; i++) {
        for (var j = 0; j < this.bookList[i].children.length; j++) {
          if (this.bookList[i].children[j].check_one == true) {
            number_total += this.bookList[i].children[j].book_num;
          }
        }
      }
      return number_total;
    },
    // 总价
    totalPrice() {
      var price_total = 0;
      for (var i = 0; i < this.bookList.length; i++) {
        for (var j = 0; j < this.bookList[i].children.length; j++) {
          if (this.bookList[i].children[j].check_one == true) {
            price_total += this.bookList[i].children[j].book_unitPrice * this.bookList[i].children[j].book_num;
          }
        }
      }
      return price_total;
    },
  },
  methods: {
    //选择所有的购物车商品
    check_all() {
        this.bookList[0].this_all=true;
    }
  },
}

</script>
<style>
.bbb {
  background: url("../assets/2.jpg") no-repeat;
  background-position: center;
  height: 20%;
  width: 100%;
  background-size: cover;
  position: absolute;
  z-index: -1;
}

.divider{
  background-color: rgb(221, 68, 65);
  height: 0.5%;
  width: 100%;
  background-size: cover;
  position: absolute;
}

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
.title {
  color: #303133;
  text-align: center;
  font-size: 30px;
}
.stepline {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.orderFinish {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 200px;
}

.table-header{
  text-align: center;
  margin: 20px 0;
  background: rgb(245,245,245);
  color:#303133;
  height: 40px;
  border:1px solid rgb(221,221,221);
}

.table-container{
  margin: 20px 0;
}

.table-footer{
  margin: 30px 0;
  background: rgb(245,245,245);
  color:#303133;
  height: 60px;
  border:1px solid rgb(221,221,221);
}

.table-header-item
{
  margin: 11px 0;
  font-size: 11px;
}

.table-footer-item
{
  margin: 20px 0;
  font-size: 11px;
}

.table-shop
{
  font-size: 13px;
}

.shop-name{
  font-size: 13px;
}
.book-name{
  font-size: 13px;
}
.book-detail{
  font-size: 13px;
  color:grey;
}

.books{
  background: rgb(255, 255, 255);
  color:#303133;
  border:1px solid rgb(201, 201, 201);
}

/* 设置带边框的checkbox，选中后边框的颜色 */
.myRedCheckBox.is-bordered.is-checked {
  border-color: rgb(221, 68, 65);
}

/* 设置选中后的文字颜色 */
.myRedCheckBox .el-checkbox__input.is-checked+.el-checkbox__label {
  color: rgb(221, 68, 65);
}

/* 设置选中后对勾框的边框和背景颜色 */
.myRedCheckBox .el-checkbox__input.is-checked .el-checkbox__inner, .myRedCheckBox .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: rgb(221, 68, 65);
  background-color:rgb(221, 68, 65);
}

/* 设置checkbox获得焦点后，对勾框的边框颜色 */
.myRedCheckBox .el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: rgb(221, 68, 65);
}

/* 设置鼠标经过对勾框，对勾框边框的颜色 */
.myRedCheckBox .el-checkbox__inner:hover{
  border-color: rgb(221, 68, 65);
}

.table-unitprice{
  font-size: 13px;
}
.table-price{
  font-size: 13px;
  color: rgb(221, 68, 65);
}
.table-totalprice{
  font-size: 20px;
  color: rgb(221, 68, 65);
}

.table-button{
  font-size: 13px;
  color: black;
}
</style>