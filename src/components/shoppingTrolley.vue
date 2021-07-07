<template>
  <div>
    <div class="header">
      <div class="logo">
        <img width="250px" src="../assets/logo.png" />
      </div>
      <el-steps :active="0" finish-status="success" simple>
        <el-step title="我的购物车"></el-step>
        <el-step title="填写订单"></el-step>
        <el-step title="完成订单"></el-step>
      </el-steps>
    </div>

    <div class=“shoppingTrolley_container” style="margin:0 5%">
      <el-row class="shopingTrolley_content" :gutter="20">
        <el-col>
          <el-container>
          
            <el-main>

              <el-table
                ref="multipleTable"
                :data="bookList"
                style="width:100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="书籍信息" prop="book_name"></el-table-column>
                <el-table-column label="单价（元）" prop="book_unitPrice"></el-table-column>
                <el-table-column label="数量" prop="book_num">
                  <template>
                    <el-input-number v-model="bookList.book_num" @change="handleChange" :min="1" :max="10" label="数量"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="金额（元）" prop="book_unitPrice*book_num"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-main>
          </el-container>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Form, FormItem } from "element-ui";
import Home from '../views/Home.vue';
export default {
  components: {
    "el-button": Button,
    "el-col": Col,
    "el-row": Row,
    "el-form": Form,
    "el-form-item": FormItem,
    Home,
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
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style>
</style>