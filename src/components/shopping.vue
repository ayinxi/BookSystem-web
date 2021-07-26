<template>
  <div v-loading="isLoading">
    <!--
    <div class="bbb"></div>
    -->
    <!--header-->
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin:20px 0" src="../assets/jwbc.png" />
      </div>
      <div class="title" style="margin-right:250px">
        <el-page-header v-if="page == 0" @back="gotoHome" content="购物车"></el-page-header>
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
      <div style="width:550px">
        <el-steps :active="page" finish-status="success">
          <el-step title="我的购物车"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="完成订单"></el-step>
        </el-steps>
      </div>
    </div>
    <!--<div class="divider"></div>-->
    <!--content-->
    <div>{{temp_page}}</div>
    <div style="margin:0 10%" v-if="bookList == ''">
      <el-row><el-col :offset="9"><img src="../assets/empty_grey.png" style="height:220px;margin:50px"></el-col></el-row>
      <el-row><el-col :offset="11"><p style="margin-left:0px;color:grey">购物车里空空如也</p></el-col></el-row>
      <el-row><el-col :offset="10"><span style="margin-left:35px;color:grey">您可以   </span><el-button @click="gotoHome">回首页逛逛</el-button></el-col></el-row>
    </div>
    <div style="margin:0 10%">
      <div v-if="page == 0 && bookList != ''" v-loading="shoppingLoading">
    <header>
      <el-card class="header-card">
      <el-row>
        <el-col :span="1" class="table-header-item">
          <el-checkbox v-model="checkAll" class="myRedCheckBox" @change="check_all"></el-checkbox>
        </el-col>
        <el-col :span="1" class="table-header-item">全选</el-col>
        <el-col :span="10" class="table-header-item">商品信息</el-col>
        <el-col :span="4" class="table-header-item">价格</el-col>
        <el-col :span="4" class="table-header-item">数量</el-col>
        <el-col :span="3" class="table-header-item">小计</el-col>
        <el-col :span="1" class="table-header-item">操作</el-col>
      </el-row>
      </el-card>
    </header>
    <div class="table-container">
      <div v-for="(item,index) in bookList" :key="index">
        <el-card style="margin: 20px 0">
        <el-row style="margin:10px">
          <el-col :span="1">
            <el-checkbox v-model="item.this_all" class="myRedCheckBox" @change="check_shop(item)"></el-checkbox>
          </el-col>
          <el-col :span="23" class="shop-name"><i class="el-icon-goods"></i> {{item.shop_name}}</el-col>
        </el-row>
        <div class="books">
          <el-row v-for="(books,idx) in item.books" :key="idx" style="margin:10px">
            <!--<el-divider v-if="idx!=0"></el-divider>-->
            <el-col :span="1">
              <el-checkbox style="margin:25px 0" v-model="books.check_one" class="myRedCheckBox"></el-checkbox>
            </el-col>
            <el-col :span="2">
              <img :src="books.image_b" style="height:70px" />
            </el-col>
            <el-col :span="9">
              <div style="margin-right:30px" class="book-name">{{books.book_name}}</div>
              <div class="book-detail">作者：{{books.author}}</div>
              <div class="book-detail">出版社：{{books.press}}</div>
            </el-col>
            <el-col :span="3">
              <div style="margin:25px 0" class="table-unitprice">¥{{books.price.toFixed(1)}}</div>
            </el-col>
            <el-col :span="5">
              <div style="margin:20px 0">
                <el-input-number
                      v-model="books.sum"
                      :min="1"
                      :max="books.repertory"
                      label="数量"
                      size="small"
                      :precision="0"
                      :step="1"
                      @change="(currentValue) => updateCartItem(currentValue, books.book_id)"
                    ></el-input-number>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="margin:25px 0" class="table-price">¥{{(books.price*books.sum).toFixed(1)}}</div>
            </el-col>
            <el-col :span="1">
                <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="rgb(221, 68, 65)"
                @confirm="delBook(books.cartItem_id)"
                title="您确认要删除该商品吗？">
                  <el-button slot="reference" type="text" class="table-button" style="margin:15px 0">删除</el-button>
                </el-popconfirm>
              <!--<div style="margin:15px 0"><el-button type="text" class="table-button">删除</el-button></div>-->
            </el-col>
          </el-row>
        </div>
        </el-card>
      </div>
    </div>
    <footer>
      <el-card>
      <el-row>
        <el-col :span="1" style="margin-left:10px" class="table-footer-item">
          <el-checkbox v-model="checkAll" class="myRedCheckBox" @change="check_all"></el-checkbox>
        </el-col>
        <el-col :span="1" class="table-footer-item">全选</el-col>
        <el-col :span="10" class="table-footer-item" style="margin:12px">
           <el-button size="medium" type="text" class="table-button" @click="multiDelBook">批量删除</el-button>
        </el-col>
        <el-col :span="6" class="table-footer-item">已选<span style="color:rgb(221, 68, 65)"> {{totalNumber}} </span>件商品</el-col>
        <el-col :span="3" class="table-footer-item" style="margin-top:14px">合计：<span class="table-totalprice">¥{{totalPrice.toFixed(1)}}</span></el-col>
        <el-col :span="2" class="table-footer-item" style="margin-top:9px">
          <el-button size="max" type="danger" :round="true" @click="settlement">结算</el-button>
        </el-col>
      </el-row>
      </el-card>
    </footer>
    </div>



      <!--填写订单-->
      <div v-if="page == 1">
        <div style="margin-bottom: 20px">
          <el-row>
            <h3>收货人信息</h3>
          </el-row>
          <el-row v-loading="addressLoading">
            <el-radio-group v-model="radio" size="mini">
              <el-radio-button
                :label="item.id"
                :key="item.id"
                v-for="item in myAddressList"
                >{{ item.label }}
                <el-card style="
                width: 300px;
                height: 250px;">
                    <el-form ref="item" :v-model="item" label-width="80px">
                      <el-form-item label="姓名" prop="name">
                        <div style="display: flex; justify-content: flex-start">
                          {{ item.name }}
                        </div>
                      </el-form-item>
                      <el-form-item label="电话号码" prop="phone">
                        <div style="display: flex; justify-content: flex-start">
                          {{ item.phone }}
                        </div>
                      </el-form-item>
                      <el-form-item label="详细地址" prop="address">
                        <div
                          style="
                            display: flex;
                            justify-content: flex-start;
                            flex-wrap: wrap;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                          "
                          :title="item.address"
                        >
                          {{ item.address }}
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <el-row
                          style="display: flex; justify-content: flex-start"
                        >
                          <el-col>
                            <el-button
                              type="text"
                              style="margin: 0 5px"
                              v-if="item.status == 0"
                              @click="setDefaultAddress(item)"
                              >设为默认地址
                            </el-button>
                            <el-button
                              type="text"
                              style="margin: 0 5px"
                              v-else
                              disabled
                              >默认地址
                            </el-button>
                          </el-col>
                          <el-col>
                            <el-button
                              type="text"
                              style="margin: 0 5px"
                              @click="editAddress(item)"
                              >编辑
                            </el-button>
                            <el-button
                              type="text"
                              style="margin: 0 5px"
                              @click="editDelAddress(item)"
                              >删除
                            </el-button></el-col
                          >
                        </el-row>
                      </el-form-item>
                    </el-form>
                  </el-card>
              </el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row
            ><el-button
              size="min"
              icon="el-icon-setting"
              type="text"
              @click="clearNewAddress"
              >添加收货人信息</el-button
            ></el-row
          >
          <!--删除收货人信息-->
              <el-dialog
                title="提示"
                :visible.sync="delAddressVisible"
                width="30%"
              >
                <span>确认删除收货地址</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="delAddressVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="confirmDelAddress"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
          <!--编辑收货人信息-->
          <el-dialog title="编辑收货人信息" :visible.sync="editInfoVisible">
                <el-form
                  :model="editMyAddress"
                  label-width="120px"
                  :rules="newAddressRules"
                >
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      type="text"
                      style="width: 200px"
                      v-model="editMyAddress.name"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="电话号码" prop="phone">
                    <el-input
                      type="text"
                      style="width: 200px"
                      v-model="editMyAddress.phone"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="address">
                    <el-input
                      type="textarea"
                      maxlength="50"
                      show-word-limit
                      clearable
                      style="width: 500px"
                      rows="5"
                      v-model="editMyAddress.address"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editInfoVisible = false">取消</el-button>
                  <el-button type="primary" @click="confirmChangeAddress"
                    >确认编辑</el-button
                  >
                </div>
              </el-dialog>
          <!--添加收货人信息-->
          <el-dialog title="添加收货人信息" :visible.sync="addInfoVisible">
                <el-form
                  ref="newAddress"
                  :model="newAddress"
                  label-width="120px"
                  :rules="newAddressRules"
                >
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      type="text"
                      v-model="newAddress.name"
                      style="width: 200px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="电话号码" prop="phone">
                    <el-input
                      type="text"
                      v-model="newAddress.phone"
                      style="width: 200px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="address">
                    <el-input
                      type="textarea"
                      maxlength="50"
                      show-word-limit
                      clearable
                      style="width: 500px"
                      rows="5"
                      v-model="newAddress.address"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addInfoVisible = false">取消</el-button>
                  <el-button type="primary" @click="addNewAddress"
                    >确认新增</el-button
                  >
                </div>
              </el-dialog>
        </div>
        <el-divider></el-divider>
        <div style="margin: 20px 0">
          <el-row>
            <h3>送货清单</h3>
          </el-row>
          <header>
      <el-card class="header-card">
      <el-row>
        <el-col :span="14" class="table-header-item">商品信息</el-col>
        <el-col :span="4" class="table-header-item">价格</el-col>
        <el-col :span="4" class="table-header-item">数量</el-col>
        <el-col :span="2" class="table-header-item">小计</el-col>
      </el-row>
      </el-card>
    </header>
    <div class="table-container">
      <div v-for="(item,index) in bookList" :key="index">
        <el-card style="margin: 20px 0" v-if="vifShopName(item)">
        <el-row style="margin:10px">
          <el-col class="shop-name"><i class="el-icon-goods"></i> {{item.shop_name}}</el-col>
        </el-row>
        <div class="books" v-for="(books,idx) in item.books" :key="idx">
          <el-row style="margin:10px" v-if="books.check_one">
            <!--<el-divider v-if="idx!=0"></el-divider>-->
            <el-col :span="2">
              <img :src="books.image_b" style="height:70px" />
            </el-col>
            <el-col :span="9">
              <div style="margin-right:30px" class="book-name">{{books.book_name}}</div>
              <div class="book-detail">作者：{{books.author}}</div>
              <div class="book-detail">出版社：{{books.press}}</div>
            </el-col>
            <el-col :span="4" :offset="3">
              <div style="margin:25px 0" class="table-unitprice">¥{{books.price}}</div>
            </el-col>
            <el-col :span="2">
              <div style="margin:20px 0">{{books.sum}}</div>
            </el-col>
            <el-col :span="2" :offset="2">
              <div style="margin:25px 0" class="table-price">¥{{books.price*books.sum}}</div>
            </el-col>
          </el-row>
        </div>
        </el-card>
      </div>
    </div>
    <footer>
      <el-card>
      <el-row><!--v-if="temp_page == ''"从购物车生成订单-->
        <el-col :span="18" :offset="1" class="table-footer-item">共<span style="color:rgb(221, 68, 65)"> {{totalNumber}} </span>件商品</el-col>
        <el-col :span="3" class="table-footer-item" style="margin-top:14px">实付：<span class="table-totalprice">¥{{totalPrice}}</span></el-col>
        <el-col :span="2" class="table-footer-item" style="margin-top:9px">
          <el-button size="max" type="danger" :round="true" @click="addCartItem">提交订单</el-button>
        </el-col>
      </el-row>
      <!--<el-row v-else> 从图书详情页直接购买
        <el-col :span="18" :offset="1" class="table-footer-item">共<span style="color:rgb(221, 68, 65)"> {{book.sum}} </span>件商品</el-col>
        <el-col :span="3" class="table-footer-item" style="margin-top:14px">实付：<span class="table-totalprice">¥{{book.price*book.sum}}</span></el-col>
        <el-col :span="2" class="table-footer-item" style="margin-top:9px">
          <el-button size="max" type="danger" :round="true" @click="addCartItem">提交订单</el-button>
        </el-col>
      </el-row>-->
      </el-card>
    </footer>
      </div>
        </div>
      </div>




      <!--完成订单-->
      <div v-if="page == 2" style="completeOrder">
        <el-row><el-col :span="8" :offset="8">
        <el-card>
        <el-row class="orderFinish">
          <img src="../assets/avatar.jpg" height="200px"/>
        </el-row>
        <el-row class="orderFinish">
          <p>恭喜您完成订单！</p>
        </el-row>
        <el-row class="orderFinish">
          <p>商家正在尽快安排发货...</p>
        </el-row>
        <el-row class="orderFinish">
          <el-button size="medium" :round="true" @click="gotoOrder">查看订单</el-button>
          <el-button size="medium" :round="true" @click="gotoHome" >回到主页</el-button>
        </el-row>
        </el-card>
        </el-col></el-row>
      </div>

    </div>
  <!--</div>-->
</template>





<script>
import axios from "axios";
import { Message } from "element-ui";
import qs from 'qs';
export default {
  components: {},
  data() {
    return {
      //当前页面
      page: 0,
      //loading
      isLoading: false,
      addressLoading: false,
      shoppingLoading: false,
      //选择的地址id
      radio: "",
      //从图书详情页直接购买
      temp_page: this.$route.params.page,
      book: {
        //店铺
        shop_id: "1",
        shop_name: "横溢图书专营店",
        //图书
        book_id: this.$route.params.bookid,
        cartItem_id: "123",
        image_b: require("../assets/youbenshi.jpg"),
        book_name: "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
        author: "冯唐",
        press: "东南大学出版社",
        price: 50,
        sum: this.$route.params.num,
        repertory: 19,
      },
      //购物车图书
      bookList: [
        /*
        {
          shop_id: "1",
          shop_name: "横溢图书专营店",
          this_all: false,
          books:[
            {
              book_id: "11",
              cartItem_id: "123",
              image_b: require("../assets/youbenshi.jpg"),
              book_name: "【新华书店正版图书】有本事 冯唐2021新作无所畏写给想靠真本事立身成事年轻人 写给人生转折点的前行之作文学散文随笔",
              author: "冯唐",
              press: "东南大学出版社",
              price: 50,
              sum: 2,
              repertory: 19,
              check_one: false,
            },
          ]
        },
        */
      ],
      checkAll: false,
      cpmylist: [],
      //收货地址
      editInfoVisible: false,
      addInfoVisible: false,
      delAddressVisible: false,
      delAddressId: "",
      newAddress: {
        id: "",
        name: "",
        phone: "",
        address: "",
        status: "",
      },
      editMyAddress: {
        id: "",
        name: "",
        phone: "",
        address: "",
        status: "",
      },
      myAddressList: [
        /*{
          id: "1",
          name: "甲",
          phone: "12345678910",
          address: "摩尔庄园",
          status: 0,
        },*/
      ],
      newAddressRules: {
        phone: [
          { required: true, message: "电话号码不得为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入电话号码"));
              } else if (!/^1\d{10}$/.test(value)) {
                callback(new Error("请输入正确的11位手机号码"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "姓名不得为空", trigger: "blur" },
          { max: 10, message: "姓名不得超过十个字", trigger: "blur" },
        ],
        address: [
          { required: true, message: "地址不得为空", trigger: "blur" },
          { max: 50, message: "地址不得超过五十个字", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    // 总数
    totalNumber() {
      var number_total = 0;
      for (var i = 0; i < this.bookList.length; i++) {
        for (var j = 0; j < this.bookList[i].books.length; j++) {
          if (this.bookList[i].books[j].check_one == true) {
            number_total += this.bookList[i].books[j].sum;
          }
        }
      }
      return number_total;
    },
    // 总价
    totalPrice() {
      var price_total = 0;
      for (var i = 0; i < this.bookList.length; i++) {
        for (var j = 0; j < this.bookList[i].books.length; j++) {
          if (this.bookList[i].books[j].check_one == true) {
            price_total += this.bookList[i].books[j].price * this.bookList[i].books[j].sum;
          }
        }
      }
      return price_total;
    },
  },
  methods: {
    //回到主页
    gotoHome() {
      this.$router.push("/");
    },
    //跳转全部订单页面
    gotoOrder() {
      this.$router.push("/userOrder/0");
    },
    //选择所有的购物车商品
    check_all() {
      this.bookList.forEach(shop => {
        shop.this_all = this.checkAll;
        shop.books.forEach(book => {
          book.check_one = this.checkAll;
        });
      });
    },
    //选择某商家所有商品
    check_shop(shop) {
      shop.books.forEach(book => {
        book.check_one = shop.this_all;
      });
    },
    //结算
    settlement() {
      this.bookList.forEach(shop => {
        shop.books.forEach(book => {
          if(book.check_one == true) {
            this.cpmylist.push(book.book_id);
          }
        });
      });
      if(this.cpmylist.length==0){
      alert("请选择商品哦！")
      }else{
        this.page = 1;
      }
    },
    //结算页面是否显示店铺名
    vifShopName(shop) {
      var len = 0;
      shop.books.forEach(book => {
        if(book.check_one == true) {
          len=len+1;
        }
      })
      if(len!=0) return true;
      else return false;
    },
    //获取用户的收货地址
    getUserAddress() {
      axios({
        url: this.$store.state.yuming + "/user/address/getAll",
        method: "GET",
        params: {
          id: this.newAddress.id,
          address: this.newAddress.address,
          phone: this.newAddress.phone,
          name: this.newAddress.name,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.myAddressList = res.data.data;
        } else {
          this.$message.error("获取收货地址失败，请重试");
        }
      });
    },
    //清空newAddress
    clearNewAddress() {
      this.newAddress.name = "";
      this.newAddress.address = "";
      this.newAddress.phone = "";
      this.addInfoVisible = true;
    },
    //新增收货地址
    addNewAddress() {
      this.addInfoVisible = false;
      axios({
        url: this.$store.state.yuming + "/user/address/add",
        method: "POST",
        params: {
          address: this.newAddress.address,
          phone: this.newAddress.phone,
          name: this.newAddress.name,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.addressLoading = true;
          this.getUserAddress();
          this.addressLoading = false;
          this.$message({
            message: "新增成功",
            type: "success",
          });
        } else {
          this.$message.error("新增失败，请重试");
        }
      });
    },
    //编辑收货地址
    editAddress(e) {
      this.editInfoVisible = true;
      this.editMyAddress.id = e.id;
      this.editMyAddress.name = e.name;
      this.editMyAddress.phone = e.phone;
      this.editMyAddress.address = e.address;
    },
    //确认编辑收货地址
    confirmChangeAddress() {
      this.editInfoVisible = false;
      axios({
        url: this.$store.state.yuming + "/user/address/update",
        method: "POST",
        params: {
          addressId: this.editMyAddress.id,
          address: this.editMyAddress.address,
          name: this.editMyAddress.name,
          phone: this.editMyAddress.phone,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.addressLoading = true;
          this.getUserAddress();
          this.addressLoading = false;
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        } else {
          this.$message.error("编辑失败，请重试");
        }
      });
    },
    //预备删除地址
    editDelAddress(e) {
      this.delAddressId = e.id;
      this.delAddressVisible = true;
    },
    //确认删除地址
    confirmDelAddress() {
      this.delAddressVisible = false;
      axios({
        url: this.$store.state.yuming + "/user/address/delete",
        method: "DELETE",
        params: {
          addressId: this.delAddressId,
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            this.addressLoading = true;
            this.getUserAddress();
            this.addressLoading = false;
            if(this.delAddressId == this.radio) {
              this.radio = '';
            }
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败,请重试");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //设置默认地址
    setDefaultAddress(e) {
      axios({
        url: this.$store.state.yuming + "/user/address/setDefault",
        method: "POST",
        params: {
          addressId: e.id,
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            this.addressLoading = true;
            this.getUserAddress();
            this.addressLoading = false;
          } else {
            this.$message.error("设置默认地址失败,请重试");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取用户的购物车信息
    getAll() {
      axios({
        url: this.$store.state.yuming+"/cartitem/getAll",
        method: "GET",
        params: {},
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.bookList = data;
          } else {
            this.$message.error("获取购物车信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //更新购物车中图书信息（仅可修改数量
    updateCartItem(currentValue, id) {
      axios({
        url: this.$store.state.yuming + "/cartitem/updateCartItem",
        method: "POST",
        params: {
          book_id: id,
          sum: currentValue,
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            /*this.shoppingLoading = true;
            this.getAll();
            this.shoppingLoading = false;*/
          } else {
            this.$message.error("更新图书数量失败,请重试");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //单次删除购物车
    delBook(id) {
      axios({
        url: this.$store.state.yuming + "/cartitem/delete",
        method: "DELETE",
        params: {
          cartItem_id: id,
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            this.shoppingLoading = true;
            this.getAll();
            this.shoppingLoading = false;
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败,请重试");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //批量删除购物车
    multiDelBook() {
      var multiDelBookId = [];
      this.bookList.forEach(shop => {
        shop.books.forEach(book => {
          if(book.check_one == true) {
            multiDelBookId.push(book.cartItem_id);
          }
        });
      });
      axios({
        url: this.$store.state.yuming + "/cartitem/multiDelete",
        method: "DELETE",
        params: {
          CartItem_Ids: multiDelBookId,
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            this.shoppingLoading = true;
            this.getAll();
            this.shoppingLoading = false;
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败,请重试");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //从购物车生成订单
    addCartItem() {
      var multiDelBookId = [];
      //处理图书
      this.bookList.forEach(shop => {
        shop.books.forEach(book => {
          if(book.check_one == true) {
            multiDelBookId.push(book.cartItem_id);
          }
        });
      });
      //处理地址
      if(this.radio == '') {
        if(this.myAddressList == '') {//没有选择地址也没有地址的情况
          this.$message.error("请添加收货人信息");
        }
        else if(this.myAddressList[0].status == 0) {//没有选择地址也没有默认地址的情况
          this.$message.error("请选择收货人信息");
        }
        else {//没有选择地址但有默认地址的情况
          this.radio = this.myAddressList[0].id;
        }
      }
      if(this.radio != '') {
      axios({
        url: this.$store.state.yuming + "/order/addCatiItem",
        method: "POST",
        params: {
          CartItem_Ids: multiDelBookId,
          address_id: this.radio,
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        },
      })
        .then((res) => {
          const { code } = res.data;
          if (code == "200") {
            this.shoppingLoading = true;
            this.getAll();
            this.shoppingLoading = false;
            this.$message({
              message: "提交订单成功",
              type: "success",
            });
          } else {
            this.$message.error("提交订单失败,请重试");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
        this.page = 2;
      }
    },
  },
  async created() {
    this.isLoading = true;
    if(this.$route.params.bookid != '') this.page = 1;
    await this.getAll();
    await this.getUserAddress();
    this.isLoading = false;
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
  width: 200px;
}

.orderFinish {
  display: flex;
  justify-content: center;
  margin: 20px 0;
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
  font-size: 13px;
}

.table-footer-item
{
  margin: 20px 0;
  font-size: 13px;
}

.table-shop
{
  font-size: 13px;
}
.shop-name{
  font-size: 14px;
  font-weight: 600;
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
  /*border:1px solid rgb(201, 201, 201);*/
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
  font-size: 15px;
}
.table-price{
  font-size: 15px;
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

.header-card{
  height: 57px;
}

.el-button--goon.is-active,
.el-button--goon:active {
  background: #20B2AA;
  border-color: #20B2AA;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #48D1CC;
  border-color: #48D1CC;
  color: #fff;
}

.el-button--goon {
  color: #FFF;
  background-color: #20B2AA;
  border-color: #20B2AA;
}
</style>