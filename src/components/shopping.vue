<template>
  <div>
    <!--header-->
      <div class="title">
        <el-page-header v-if="page==0" content="购物车"></el-page-header>
        <el-page-header v-if="page==1" @back="page=0" content="填写订单"></el-page-header>
        <el-page-header v-if="page==2" @back="page=1" content="完成订单"></el-page-header>
      </div>
      <div class="stepline">
        <el-steps :active="page" finish-status="success" direction="vertical">
          <el-step title="我的购物车"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="完成订单"></el-step>
        </el-steps>
      </div>
    </div>
    <!--content-->
    <div style="margin:0 5%">
      <!--我的购物车-->
      <el-row v-if="page==0">
        <el-col>
          <el-container>
            <el-main>
              <el-table
                ref="multipleTable"
                row-key="id"
                :data="bookList"
                style="width:100%"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                default-expand-all
                :header-cell-class-name='handleHead'
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="商家">
                  <template slot-scope="scope">
                    <el-button size="medium" type="text">{{scope.row.book_merchant}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="400" label='商品'>
                  <template slot-scope="scope">
                    <div style="display:inline-block;">
                      <img src="../assets/kuku.png" alt="" v-if="scope.row.book_num"> <!--v-if="scope.row.book_img"-->
                      <el-button size="medium" type="text">{{scope.row.book_name}}</el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="单价（元）" prop="book_unitPrice"></el-table-column>
                <el-table-column label="数量" prop="book_num" width="200">
                  <template slot-scope="scope">
                    <el-input-number
                    v-if="scope.row.book_num"
                    v-model="scope.row.book_num" 
                    :min="1" 
                    :max="scope.row.book_inventory" 
                    label="数量" 
                    size="small" 
                    :precision="0" 
                    :step="1"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="金额（元）">
                  <template slot-scope="scope">
                    <div v-if="scope.row.book_num">{{scope.row.book_unitPrice*scope.row.book_num}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template>
                    <el-popover
                    placement="top"
                    width="160"
                    v-model="visible">
                    <p>您确定要删除商品吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="danger" @click="visible=false">取消</el-button>
                      <el-button size="mini" type="danger" @click="visible=false">确定</el-button>
                    </div>
                    <el-button slot="reference" size="mini" type="text">删除</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <el-row>
                <el-col span="7"><el-button size="min" icon="el-icon-delete" type="text">批量删除</el-button></el-col>
                <el-col span="7">已选择 {{totalNumber}} 件商品</el-col>
                <el-col span="7">总价：¥{{totalPrice}}</el-col>
                <el-col span="3"><el-button size="medium" type="danger" @click="page=1">结算</el-button>
                </el-col>
              </el-row>
            </el-footer>
          </el-container>
        </el-col>
      </el-row>
      <!--填写订单-->
      <div v-if="page==1">
        <div style="margin-bottom:20px">
        <el-row>
          <h3>收货人信息</h3>
        </el-row>
        <el-row>
          <el-radio-group v-model="radio">
            <el-radio-button :label="item.value" :key="item.value" v-for="item in consigneeInfoList">{{item.label}}
              <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                  <span>{{item.c_name}}</span>
                  <el-button style="float: right; padding: 3px 3px" type="text">删除</el-button>
                  <el-button style="float: right; padding: 3px 3px" type="text" @click="editInfoVisible=true">编辑</el-button>
                  <el-button style="float: right; padding: 3px 3px" type="text" v-if="defaultAddr!=item.value" @click="defaultAddr=item.value">设为默认地址</el-button>
                  <el-button style="float: right; padding: 3px 3px" type="text" v-if="defaultAddr==item.value" disabled>默认地址</el-button>
                </div>
                  <div class="text item">
                    {{item.c_phoneNumber}}
                  </div>
                  <div class="text item">
                    {{item.c_address}}
                  </div>
              </el-card>
            </el-radio-button>
           </el-radio-group>
        </el-row>
        <el-row><el-button size="min" icon="el-icon-setting" type="text" @click="addInfoVisible=true">添加收货人信息</el-button></el-row>
        <!--编辑收货人信息-->
        <el-dialog title="编辑收货人信息" :visible.sync="editInfoVisible">
                    <el-form :model="consigneeInfo">
                      <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="consigneeInfo.c_name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="电话号码" :label-width="formLabelWidth">
                        <el-input v-model="consigneeInfo.c_phoneNumber" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="详细地址" :label-width="formLabelWidth">
                        <el-input v-model="consigneeInfo.c_address" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="editInfoVisible = false">取消</el-button>
                      <el-button type="danger" @click="editInfoVisible = false">确认收货人信息</el-button>
                    </div>
        </el-dialog>
        <!--添加收货人信息-->
        <el-dialog title="添加收货人信息" :visible.sync="addInfoVisible">
          <el-form :model="consigneeInfo">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="consigneeInfo.c_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="consigneeInfo.c_phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="consigneeInfo.c_address" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addInfoVisible = false">取消</el-button>
            <el-button type="danger" @click="addInfoVisible = false">确认新增收货人信息</el-button>
          </div>
        </el-dialog>
        </div>
        <el-divider></el-divider>
        <div style="margin: 20px 0">
        <el-row>
          <h3>送货清单</h3>
        </el-row>
        <el-row>
          <el-table 
          :data="selectList"
          style="width: 100%">
          <el-table-column label="书籍图片">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover">
                <img :src="scope.row.book_img" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.book_img" style="width: 30px;height: 30px">
              </el-popover>
            </template>
          </el-table-column>
            <el-table-column label="书籍名称">
              <template slot-scope="scope">
                <el-button size="medium" type="text">{{scope.row.book_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="商家">
              <template slot-scope="scope">
                <el-button size="medium" type="text">{{scope.row.book_merchant}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="单价（元）" prop="book_unitPrice"></el-table-column>
            <el-table-column label="数量" prop="book_num" width="200"></el-table-column>
            <el-table-column label="金额（元）">
              <template slot-scope="scope">
                <div>{{scope.row.book_unitPrice*scope.row.book_num}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin: 20px 0">
          <el-col span="11">已选择 {{totalNumber}} 件商品</el-col>
          <el-col span="10">实付：¥{{totalPrice}}</el-col>
          <el-col span="3"><el-button size="medium" type="danger" @click="page=2">提交订单</el-button></el-col>
        </el-row>
        </div>
      </div>
      <!--完成订单-->
      <div v-if="page==2">
        <el-row class="orderFinish">
          <img src="../assets/kuku.png">
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
import { Button, Row, Col, Form, FormItem } from "element-ui";
export default {
  components: {
    "el-button": Button,
    "el-col": Col,
    "el-row": Row,
    "el-form": Form,
    "el-form-item": FormItem,
  },
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
          id: 1,
          book_merchant: "A",
          children:[
            {
              id: 11,
              book_img: "../assets/kuku.png",
              book_name: "C++从入门到放弃",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
            },
            {
              id: 12,
              book_img: "../assets/kuku.png",
              book_name: "C++从入门到放弃",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
            },
          ]
        },
        {
          id: 2,
          book_merchant: "B",
          children:[
            {
              id: 21,
              book_img: "../assets/kuku.png",
              book_name: "C++从入门到放弃",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
            },
            {
              id: 22,
              book_img: "../assets/kuku.png",
              book_name: "C++从入门到放弃",
              book_unitPrice: 50,
              book_num: 2,
              book_inventory: 19,
            },
          ]
        },
      ],
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
      for (var i = 0; i < this.multipleSelection.length; i++) {
        number_total += this.multipleSelection[i].book_num;
      }
      return number_total;
    },
    // 总价
    totalPrice() {
      var price_total = 0;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        price_total += this.multipleSelection[i].book_unitPrice * this.multipleSelection[i].book_num;
      }
      return price_total;
    },
export default {
  components: {
  },
  data() {
    return {
      multipleSelection: [],
      bookList: [
        {
          book_img: "0",
          book_name: "C++从入门到放弃",
          book_unitPrice: 50,
          book_num: 2,
        }, {
          book_img: "0",
          book_name: "C++从入门到放弃",
          book_unitPrice: 50,
          book_num: 2,
        }, {
          book_img: "1",
          book_name: "java从跨平台到跨行业",
          book_unitPrice: 100,
          book_num: 3,
        }, {
          book_img: "1",
          book_name: "java从跨平台到跨行业",
          book_unitPrice: 100,
          book_num: 3,
        }
      ],
      book: {
        book_img: "",//图书图片
        book_name: "",//图书名称
        book_unitPrice: "",//图书单价
        book_num: "",//图书数量
      }
    };
  },
  computed: {
    book_totalPrice(){
      return this.bookList.book_num * this.bookList.book_unitPrice;
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {this.$refs.multipleTable.toggleRowSelection(row);});
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
};
</script>

<style>
.header {
  display: flex;
  justify-content: flex-start;
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
.title {
  color: #303133;
  text-align: center;
  font-size: 30px;
}
.stepline {
  display: flex;
  justify-content:flex-end;
  flex-grow: 1;
}
.orderFinish{
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
    clear: both
  }
  .box-card {
    width: 200px;
  }
</style>