<template>
  <div v-loading="isLoading">
    <div class="header">
      <div class="logo">
        <img height="70px" style="margin: 20px 0" src="../assets/jwbc.png" />
      </div>
      <el-page-header
        @back="toUser"
        content="我的订单"
        style="display: flex; justify-content: center; align-items: center"
      ></el-page-header>
    </div>
    <div>
      <el-row style="margin-left: 5%">
        <el-col :span="3">
          <el-menu :default-active="orderNum" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click.native="allOrderMenu">
              <i class="iconfont-dingdan1"></i>
              <span slot="title" style="margin-left: 10px">全部订单</span>
            </el-menu-item>
            <el-menu-item index="2" @click.native="daifahuoMenu">
              <i class="iconfont-daifahuo1"></i>
              <span slot="title" style="margin-left: 10px">待发货</span>
            </el-menu-item>
            <el-menu-item index="3" @click.native="daishouhuoMenu">
              <i class="iconfont-daishouhuo1"></i>
              <span slot="title" style="margin-left: 10px">待收货</span>
            </el-menu-item>
            <el-menu-item index="4" @click.native="daipingjiaMenu">
              <i class="iconfont-xiaoxi"></i>
              <span slot="title" style="margin-left: 10px">待评价</span>
            </el-menu-item>
            <el-menu-item index="5" @click.native="tuikuanMenu">
              <i class="iconfont-shouhou1"></i>
              <span slot="title" style="margin-left: 10px">退款</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 1 && allOrderTotal != 0"
        >
          <el-card class="header-card">
            <el-row>
              <el-col :span="10" :offset="1" class="table-header-item"
                >商品信息</el-col
              >
              <el-col :span="2" class="table-header-item">单价</el-col>
              <el-col :span="2" class="table-header-item">数量</el-col>
              <el-col :span="2" class="table-header-item">实付款</el-col>
              <el-col :span="3" class="table-header-item">商品操作</el-col>
              <el-col :span="2" class="table-header-item">交易状态</el-col>
              <el-col :span="2" class="table-header-item">操作</el-col>
            </el-row>
          </el-card>
          <div v-for="(item, index) in this.allOrderList" :key="index">
            <el-card style="margin-bottom: 20px">
              <el-row style="margin-bottom: 30px">
                <el-col class="shop-name" :span="6">
                  {{ item.create_time }}</el-col
                >
                <el-col class="shop-name" :span="10"
                  ><i class="el-icon-goods"></i> {{ item.shop_name }}</el-col
                >
              </el-row>
              <div class="books">
                <el-row>
                  <el-col :span="19">
                    <el-row
                      v-for="(book, idx) in item.books"
                      :key="idx"
                      style="margin: 10px"
                    >
                      <el-col :span="2">
                        <img :src="book.book_image_b" style="height: 70px" />
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-right: 30px" class="book-name">
                          {{ book.book_name }}
                        </div>
                        <div class="book-detail">作者：{{ book.author }}</div>
                        <div class="book-detail">出版社：{{ book.press }}</div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 0">¥{{ book.price }}</div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 25px 0">
                          {{ book.number }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 10px">
                          ￥{{ book.book_total_price }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <div
                          style="margin-top: 15px"
                          v-if="
                            book.return_status == -1 && allOrderReturn == true
                          "
                        >
                          <el-tooltip
                            content="确认收货七天之内可申请退款"
                            placement="bottom"
                            effect="light"
                          >
                            <el-button
                              type="text"
                              size="mini"
                              @click="
                                gotoRefund(book.order_book_id, item.firm_time)
                              "
                              >退款/退换货</el-button
                            >
                          </el-tooltip>
                        </div>
                        <div
                          style="margin-top: 15px"
                          v-if="
                            book.return_status == -1 && allOrderReturn == false
                          "
                        >
                          <el-button type="text" disabled size="mini"
                            >退款/退换货</el-button
                          >
                        </div>
                        <div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoRemark(book.order_book_id)"
                            v-if="book.remark_status == 0"
                            >评价
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            disabled
                            v-if="book.remark_status == 1"
                            >已评价
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-row style="margin-top: 30px">
                      <el-col :span="18">
                        <div style="margin-bottom: 5px">
                          <div class="status-name" v-if="item.status == 2">
                            未付款
                          </div>
                          <div class="status-name" v-if="item.status == 3">
                            买家已付款
                          </div>
                          <div class="status-name" v-if="item.status == 4">
                            卖家已发货
                          </div>
                          <div class="status-name" v-if="item.status == 5">
                            交易成功
                          </div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoOrderDetail(item.order_id)"
                          >
                            订单详情
                          </el-button>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="margin-bottom: 5px">
                          <el-button
                            type="text"
                            size="mini"
                            v-if="item.status == 2"
                            @click="allOrderPay(item.order_id, item.total)"
                            >付款
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            v-if="item.status == 3"
                            >提醒卖家发货
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            v-if="item.status == 4"
                            >确认收货
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
          <div style="display: flex; justify-content: center">
            <el-pagination
              layout="prev, pager, next"
              :current-page="allOrderCurrent"
              :page-size="5"
              :page-count="allOrderTotal"
              @current-change="allOrderChange"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 1 && allOrderTotal == 0"
        >
          <el-row
            ><el-col :offset="9"
              ><img
                src="../assets/empty_grey.png"
                style="height: 220px; margin: 50px" /></el-col
          ></el-row>
          <el-row
            ><el-col :offset="11"
              ><p style="margin-left: 0px; color: grey">
                还没有任何订单哦~
              </p></el-col
            ></el-row
          >
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 2 && daifahuoTotal != 0"
        >
          <el-card class="header-card">
            <el-row>
              <el-col :span="10" :offset="1" class="table-header-item"
                >商品信息</el-col
              >
              <el-col :span="2" class="table-header-item">单价</el-col>
              <el-col :span="2" class="table-header-item">数量</el-col>
              <el-col :span="2" class="table-header-item">实付款</el-col>
              <el-col :span="3" class="table-header-item">商品操作</el-col>
              <el-col :span="2" class="table-header-item">交易状态</el-col>
              <el-col :span="2" class="table-header-item">操作</el-col>
            </el-row>
          </el-card>
          <div v-for="(item, index) in this.daifahuoList" :key="index">
            <el-card style="margin-bottom: 20px">
              <el-row style="margin-bottom: 30px">
                <el-col class="shop-name" :span="10">
                  {{ item.create_time }}</el-col
                >
                <el-col class="shop-name" :span="10"
                  ><i class="el-icon-goods"></i> {{ item.shop_name }}</el-col
                >
              </el-row>
              <div class="books">
                <el-row>
                  <el-col :span="19">
                    <el-row
                      v-for="(book, idx) in item.books"
                      :key="idx"
                      style="margin: 10px"
                    >
                      <el-col :span="2">
                        <img :src="book.book_image_b" style="height: 70px" />
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-right: 30px" class="book-name">
                          {{ book.book_name }}
                        </div>
                        <div class="book-detail">作者：{{ book.author }}</div>
                        <div class="book-detail">出版社：{{ book.press }}</div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 0">¥{{ book.price }}</div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 25px 0">
                          {{ book.number }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 10px">
                          ￥{{ book.book_total_price }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 1)"
                        >
                          <el-tooltip
                            content="确认收货七天之内可申请退款"
                            placement="bottom"
                            effect="light"
                          >
                            <el-button
                              type="text"
                              size="mini"
                              @click="gotoRefund(book.order_book_id)"
                              >退款/退换货</el-button
                            >
                          </el-tooltip>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-row style="margin-top: 30px">
                      <el-col :span="18">
                        <div style="margin-bottom: 5px">
                          <div class="status-name">买家已付款</div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoOrderDetail(item.order_id)"
                          >
                            订单详情
                          </el-button>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="margin-bottom: 5px">
                          <el-button type="text" size="mini"
                            >提醒卖家发货
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
          <div style="display: flex; justify-content: center">
            <el-pagination
              layout="prev, pager, next"
              :current-page="daifahuoCurrent"
              :page-size="5"
              :page-count="daifahuoTotal"
              @current-change="daifahuoChange"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 2 && daifahuoTotal == 0"
        >
          <el-row
            ><el-col :offset="9"
              ><img
                src="../assets/empty_grey.png"
                style="height: 220px; margin: 50px" /></el-col
          ></el-row>
          <el-row
            ><el-col :offset="11"
              ><p style="margin-left: 0px; color: grey">
                还没有任何订单哦~
              </p></el-col
            ></el-row
          >
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 3 && daifahuoTotal != 0"
        >
          <el-card class="header-card">
            <el-row>
              <el-col :span="10" :offset="1" class="table-header-item"
                >商品信息</el-col
              >
              <el-col :span="2" class="table-header-item">单价</el-col>
              <el-col :span="2" class="table-header-item">数量</el-col>
              <el-col :span="2" class="table-header-item">实付款</el-col>
              <el-col :span="3" class="table-header-item">商品操作</el-col>
              <el-col :span="2" class="table-header-item">交易状态</el-col>
              <el-col :span="2" class="table-header-item">操作</el-col>
            </el-row>
          </el-card>
          <div v-for="(item, index) in this.daishouhuoList" :key="index">
            <el-card style="margin-bottom: 20px">
              <el-row style="margin-bottom: 30px">
                <el-col class="shop-name" :span="10">
                  {{ item.create_time }}</el-col
                >
                <el-col class="shop-name" :span="10"
                  ><i class="el-icon-goods"></i> {{ item.shop_name }}</el-col
                >
              </el-row>
              <div class="books">
                <el-row>
                  <el-col :span="19">
                    <el-row
                      v-for="(book, idx) in item.books"
                      :key="idx"
                      style="margin: 10px"
                    >
                      <el-col :span="2">
                        <img :src="book.book_image_b" style="height: 70px" />
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-right: 30px" class="book-name">
                          {{ book.book_name }}
                        </div>
                        <div class="book-detail">作者：{{ book.author }}</div>
                        <div class="book-detail">出版社：{{ book.press }}</div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 0">¥{{ book.price }}</div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 25px 0">
                          {{ book.number }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 10px">
                          ￥{{ book.book_total_price }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 1)"
                        >
                          <el-tooltip
                            content="确认收货七天之内可申请退款"
                            placement="bottom"
                            effect="light"
                          >
                            <el-button
                              type="text"
                              size="mini"
                              @click="gotoRefund(book.order_book_id)"
                              >退款/退换货</el-button
                            >
                          </el-tooltip>
                        </div>
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 0)"
                        >
                          <el-button type="text" disabled size="mini"
                            >退款/退换货</el-button
                          >
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-row style="margin-top: 30px">
                      <el-col :span="18">
                        <div style="margin-bottom: 5px">
                          <div class="status-name">卖家已发货</div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoOrderDetail(item.order_id)"
                          >
                            订单详情
                          </el-button>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div style="margin-bottom: 5px">
                          <el-button type="text" size="mini"
                            >确认收货
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
          <div style="display: flex; justify-content: center">
            <el-pagination
              layout="prev, pager, next"
              :current-page="daishouhuoCurrent"
              :page-size="5"
              :page-count="daishouhuoTotal"
              @current-change="daishouhuoChange"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 3 && daishouhuoTotal == 0"
        >
          <el-row
            ><el-col :offset="9"
              ><img
                src="../assets/empty_grey.png"
                style="height: 220px; margin: 50px" /></el-col
          ></el-row>
          <el-row
            ><el-col :offset="11"
              ><p style="margin-left: 0px; color: grey">
                还没有任何订单哦~
              </p></el-col
            ></el-row
          >
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 4 && daipingjiaTotal != 0"
        >
          <el-card class="header-card">
            <el-row>
              <el-col :span="10" :offset="1" class="table-header-item"
                >商品信息</el-col
              >
              <el-col :span="2" class="table-header-item">单价</el-col>
              <el-col :span="2" class="table-header-item">数量</el-col>
              <el-col :span="2" class="table-header-item">实付款</el-col>
              <el-col :span="3" class="table-header-item">商品操作</el-col>
              <el-col :span="2" class="table-header-item">交易状态</el-col>
              <el-col :span="2" class="table-header-item">操作</el-col>
            </el-row>
          </el-card>
          <div v-for="(item, index) in this.daipingjiaList" :key="index">
            <el-card style="margin-bottom: 20px">
              <el-row style="margin-bottom: 30px">
                <el-col class="shop-name" :span="10">
                  {{ item.create_time }}</el-col
                >
                <el-col class="shop-name" :span="10"
                  ><i class="el-icon-goods"></i> {{ item.shop_name }}</el-col
                >
              </el-row>
              <div class="books">
                <el-row>
                  <el-col :span="19">
                    <el-row
                      v-for="(book, idx) in item.books"
                      :key="idx"
                      style="margin: 10px"
                    >
                      <el-col :span="2">
                        <img :src="book.book_image_b" style="height: 70px" />
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-right: 30px" class="book-name">
                          {{ book.book_name }}
                        </div>
                        <div class="book-detail">作者：{{ book.author }}</div>
                        <div class="book-detail">出版社：{{ book.press }}</div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 0">¥{{ book.price }}</div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 25px 0">
                          {{ book.number }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 10px">
                          ￥{{ book.book_total_price }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 1)"
                        >
                          <el-tooltip
                            content="确认收货七天之内可申请退款"
                            placement="bottom"
                            effect="light"
                          >
                            <el-button
                              type="text"
                              size="mini"
                              @click="gotoRefund(book.order_book_id)"
                              >退款/退换货</el-button
                            >
                          </el-tooltip>
                        </div>
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 0)"
                        >
                          <el-button type="text" disabled size="mini"
                            >退款/退换货</el-button
                          >
                        </div>
                        <div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoRemark(book.order_book_id)"
                            v-if="book.remark_status == 0"
                            >评价
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            disabled
                            v-if="book.remark_status == 1"
                            >已评价
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-row style="margin-top: 30px">
                      <el-col :span="18">
                        <div style="margin-bottom: 5px">
                          <div class="status-name">交易成功</div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoOrderDetail(item.order_id)"
                          >
                            订单详情
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
          <div style="display: flex; justify-content: center">
            <el-pagination
              layout="prev, pager, next"
              :current-page="daipingjiaCurrent"
              :page-size="5"
              :page-count="daipingjiaTotal"
              @current-change="daipingjiaChange"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col
          :span="20"
          style="margin-left: 10px"
          v-if="orderNum == 4 && daipingjiaTotal == 0"
        >
          <el-row
            ><el-col :offset="9"
              ><img
                src="../assets/empty_grey.png"
                style="height: 220px; margin: 50px" /></el-col
          ></el-row>
          <el-row
            ><el-col :offset="11"
              ><p style="margin-left: 0px; color: grey">
                还没有任何订单哦~
              </p></el-col
            ></el-row
          >
        </el-col>
        <el-col :span="20" style="margin-left: 10px" v-if="orderNum == 5">
          <el-card class="header-card">
            <el-row>
              <el-col :span="10" :offset="1" class="table-header-item"
                >商品信息</el-col
              >
              <el-col :span="2" class="table-header-item">单价</el-col>
              <el-col :span="2" class="table-header-item">数量</el-col>
              <el-col :span="2" class="table-header-item">实付款</el-col>
              <el-col :span="3" class="table-header-item">商品操作</el-col>
              <el-col :span="2" class="table-header-item">交易状态</el-col>
              <el-col :span="2" class="table-header-item">操作</el-col>
            </el-row>
          </el-card>
          <div v-for="(item, index) in this.tuikuanList" :key="index">
            <el-card style="margin-bottom: 20px">
              <el-row style="margin-bottom: 30px">
                <el-col class="shop-name" :span="10">
                  {{ item.create_time }}</el-col
                >
                <el-col class="shop-name" :span="10"
                  ><i class="el-icon-goods"></i> {{ item.shop_name }}</el-col
                >
              </el-row>
              <div class="books">
                <el-row>
                  <el-col :span="19">
                    <el-row
                      v-for="(book, idx) in item.books"
                      :key="idx"
                      style="margin: 10px"
                    >
                      <el-col :span="2">
                        <img :src="book.book_image_b" style="height: 70px" />
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-right: 30px" class="book-name">
                          {{ book.book_name }}
                        </div>
                        <div class="book-detail">作者：{{ book.author }}</div>
                        <div class="book-detail">出版社：{{ book.press }}</div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 0">¥{{ book.price }}</div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 25px 0">
                          {{ book.number }}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="margin: 25px 10px">
                          ￥{{ book.book_total_price }}
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 1)"
                        >
                          <el-tooltip
                            content="确认收货七天之内可申请退款"
                            placement="bottom"
                            effect="light"
                          >
                            <el-button
                              type="text"
                              size="mini"
                              @click="gotoRefund(book.order_book_id)"
                              >退款/退换货</el-button
                            >
                          </el-tooltip>
                        </div>
                        <div
                          style="margin-top: 15px"
                          v-if="(book.refund_status = 0)"
                        >
                          <el-button type="text" disabled size="mini"
                            >退款/退换货</el-button
                          >
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-row style="margin-top: 30px">
                      <el-col :span="18">
                        <div style="margin-bottom: 5px">
                          <div class="status-name" v-if="item.status == 1">
                            买家已付款
                          </div>
                          <el-button
                            type="text"
                            size="mini"
                            @click="gotoOrderDetail(item.order_id)"
                          >
                            订单详情
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      isLoading: false,
      orderNum: this.$route.params.orderId,
      allOrderCurrent: 1,
      allOrderTotal: 1,
      allOrderReturn: false,
      allOrderList: [
        {
          order_id: "",
          shop_name: "",
          create_time: "",
          status: "",
          total: "",
          books: [
            {
              remark_status: "",
              return_status: "",
              order_book_id: "",
              book_image_b: "",
              book_name: "",
              author: "",
              press: "",
              price: "",
              number: "",
              book_total_price: "",
            },
          ],
        },
      ],
      daifahuoCurrent: 1,
      daifahuoTotal: 1,
      daifahuoList: [
        {
          order_id: "",
          shop_name: "",
          create_time: "",
          status: "",
          books: [
            {
              remark_status: "",
              return_status: "",
              order_book_id: "",
              book_image_b: "",
              book_name: "",
              author: "",
              press: "",
              price: "",
              number: "",
              book_total_price: "",
            },
          ],
        },
      ],
      daishouhuoCurrent: 1,
      daishouhuoTotal: 1,
      daishouhuoList: [
        {
          order_id: "",
          shop_name: "",
          create_time: "",
          status: "",
          books: [
            {
              remark_status: "",
              return_status: "",
              order_book_id: "",
              book_image_b: "",
              book_name: "",
              author: "",
              press: "",
              price: "",
              number: "",
              book_total_price: "",
            },
          ],
        },
      ],
      daipingjiaCurrent: 1,
      daipingjiaTotal: 1,
      daipingjiaList: [
        {
          order_id: "",
          shop_name: "",
          create_time: "",
          status: "",
          books: [
            {
              remark_status: "",
              return_status: "",
              order_book_id: "",
              book_image_b: "",
              book_name: "",
              author: "",
              press: "",
              price: "",
              number: "",
              book_total_price: "",
            },
          ],
        },
      ],
      tuikuanList: [
        {
          order_id: "",
          shop_name: "",
          create_time: "",
          status: "",
          books: [
            {
              remark_status: "",
              return_status: "",
              order_book_id: "",
              book_image_b: "",
              book_name: "",
              author: "",
              press: "",
              price: "",
              number: "",
              book_total_price: "",
            },
          ],
        },
      ],
    };
  },
  computed: {},
  methods: {
    //返回个人主页
    toUser() {
      this.$router.push("/person");
    },
    gotoOrderDetail(e) {
      this.$router.push("/orderDetail/" + e);
    },
    gotoRefund(id, time) {
      axios({
        url: this.$store.state.yuming + "/order/compareTime",
        method: "GET",
        params: {
          firm_time: time,
        },
      }).then((res) => {
        const { code, data } = res.data;
        if (code == "200") {
          if (data == 0) {
            this.allOrderReturn = true;
            this.$router.push("/refund/" + id);
          } else {
            this.$message({
              message: "确认收货七天之后不可退款",
              type: "warning",
            });
            this.allOrderReturn = false;
          }
        } else {
          this.$message.error("出现错误，请重试");
        }
      });
    },
    gotoRemark(e) {
      this.$router.push("/remark/" + e);
    },
    allOrderMenu() {
      this.orderNum = "1";
    },
    daifahuoMenu() {
      this.orderNum = "2";
    },
    daishouhuoMenu() {
      this.orderNum = "3";
    },
    daipingjiaMenu() {
      this.orderNum = "4";
    },
    tuikuanMenu() {
      this.orderNum = "5";
    },
    //全部订单
    //分页
    async allOrderChange(value) {
      this.allOrderCurrent = value;
      this.isLoading = true;
      await this.getAllOrders();
      this.isLoading = false;
    },
    //分页获取订单信息
    getAllOrders() {
      axios({
        url: this.$store.state.yuming + "/getOrder",
        method: "GET",
        params: {
          page_num: this.allOrderCurrent,
          order_num: 5,
          status: 1,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.allOrderList = data;
          } else {
            this.$message.error("获取订单信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取订单数目
    getAllOrdersNum() {
      axios({
        url: this.$store.state.yuming + "/getOrderNum",
        method: "GET",
        params: {
          status: 1,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.allOrderTotal = Math.ceil(data / 5);
          } else {
            this.$message.error("获取全部订单数目失败");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
    //待发货订单
    //分页
    async daifahuoChange(value) {
      this.daifahuoCurrent = value;
      this.isLoading = true;
      await this.getDaifahuo();
      this.isLoading = false;
    },
    //分页获取订单信息
    getDaifahuo() {
      axios({
        url: this.$store.state.yuming + "/getOrder",
        method: "GET",
        params: {
          page_num: this.daifahuoCurrent,
          order_num: 5,
          status: 3,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.daifahuoList = data;
          } else {
            this.$message.error("获取待发货订单信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取订单数目
    getDaifahuoNum() {
      axios({
        url: this.$store.state.yuming + "/getOrderNum",
        method: "GET",
        params: {
          status: 3,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.daifahuoTotal = Math.ceil(data / 5);
          } else {
            this.$message.error("获取待发货订单数目失败");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
    //待收货订单
    //分页
    async daishouhuoChange(value) {
      this.daishouhuoCurrent = value;
      this.isLoading = true;
      await this.getDaishouhuo();
      this.isLoading = false;
    },
    //分页获取订单信息
    getDaishouhuo() {
      axios({
        url: this.$store.state.yuming + "/getOrder",
        method: "GET",
        params: {
          page_num: this.allOrderCurrent,
          order_num: 5,
          status: 4,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.daishouhuoList = data;
          } else {
            this.$message.error("获取待收货订单信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取订单数目
    getDaishouhuoNum() {
      axios({
        url: this.$store.state.yuming + "/getOrderNum",
        method: "GET",
        params: {
          status: 4,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.daishouhuoTotal = Math.ceil(data / 5);
          } else {
            this.$message.error("获取全部订单数目失败");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
    //待评价订单
    //分页
    async daipingjiaChange(value) {
      this.daipingjiaCurrent = value;
      this.isLoading = true;
      await this.getDaipingjia();
      this.isLoading = false;
    },
    //分页获取订单信息
    getDaipingjia() {
      axios({
        url: this.$store.state.yuming + "/getOrder",
        method: "GET",
        params: {
          page_num: this.daipingjiaCurrent,
          order_num: 5,
          status: 5,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.daipingjiaList = data;
          } else {
            this.$message.error("获取待评价订单信息失败");
          }
        })
        .catch(() => {
          Message({
            type: "error",
            message: "出现错误，请稍后再试",
          });
        });
    },
    //获取订单数目
    getDaipingjiaNum() {
      axios({
        url: this.$store.state.yuming + "/getOrderNum",
        method: "GET",
        params: {
          status: 5,
          identity: 0,
        },
      })
        .then((res) => {
          const { code, data } = res.data;
          if (code == "200") {
            this.daipingjiaTotal = Math.ceil(data / 5);
          } else {
            this.$message.error("获取待评价数目失败");
          }
        })
        .catch(() => {
          this.$message.error("出现错误，请稍后再试");
        });
    },
    allOrderPay(order_id, total) {
      //this.$router.push(`/pay/${order_id}/${total}`);
      axios({
        url: this.$store.state.yuming + "/alipay",
        method: "GET",
        params: {
          order_id: order_id,
          subject: "图书",
          total_amount: total,
          body: "",
        },
      }).then((res) => {
        document.querySelector("body").innerHTML = res.data; //查找到当前页面的body，将后台返回的form替换掉他的内容
        document.forms[0].submit(); //执行submit表单提交，让页面重定向，跳转到支付宝页面
      });
    },
  },
  async created() {
    this.isLoading = true;
    await this.getAllOrders();
    await this.getAllOrdersNum();
    await this.getDaifahuo();
    await this.getDaifahuoNum();
    await this.getDaishouhuo();
    await this.getDaishouhuoNum();
    await this.getDaipingjia();
    await this.getDaipingjiaNum();
    this.isLoading = false;
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
.shop-name {
  font-size: 16px;
  font-weight: 600;
}
.book-name {
  font-size: 13px;
}
.status-name {
  font-size: 10px;
  color: rgb(221, 98, 98);
  font-weight: 400;
}
.action-name {
  font-size: 15px;
}
.book-detail {
  font-size: 13px;
  color: grey;
}
.books {
  background: rgb(255, 255, 255);
  color: #303133;
  /*border:1px solid rgb(201, 201, 201);*/
}
.header-card {
  height: 60px;
  margin-bottom: 10px;
}
.table-header-item {
  display: flex;
  align-items: center;
  font-size: 15px;
}
</style>