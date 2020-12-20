<template>
  <div style="background: #fff;padding-bottom:60px;">
    
    <supplier-header :loginSucc='loginSucc'></supplier-header>
    <div class="blockBanner">
      <el-carousel trigger="click">
        <el-carousel-item v-for="item in bannerList" :key="item">
          <img :src="item">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="wrap">
      <div class="r-con">
        <div class="home-login" v-if="!userInfo.SUPPLIER_NAME">
          <h4 style="text-align: left;">供应商登录</h4>
          <el-form
            :model="loginForm"
            size="small"
            status-icon
            ref="ruleForm2"
            label-width="50px"
            class="supplierLoginForm"
          >
            <el-form-item label="账号" prop="age">
              <el-input v-model="loginForm.name" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
              <el-input
                type="password"
                v-model="loginForm.pass"
                auto-complete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button class="supplierLogin" @click="supplierLogin">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tobid" v-if="userInfo.SUPPLIER_NAME">
          <el-button size="small" @click="bmToBid" style="width:100%" type="primary">去投标</el-button>
        </div>
        <div class="complaint">
          <h4 align="left">采购投诉反馈</h4>
          <p align="left">
            廉洁举报电话：010-84407072-8042
            <br />廉洁举报邮箱：sunny@firstcare.com.cn
            <br />廉洁举报信件邮寄地址：北京香河园路1号万国城
            10号楼3层
            <br />邮编：100028
          </p>
        </div>
      </div>
      <div class="l-con">
        <div class="inf-list">
          <h4>
            <router-link :to="{ path: '/bidFunMessage' }">查看更多</router-link>
            <span>招标公告</span>
          </h4>
          <ul class="gg">
            <li v-for="(item, index) in tenderFileList" :key="index">
              <!-- <span v-if="dayFn(myDate-item.SUBMIT_TENDER_DOCUMENT_END) == '已结束'" class="btn-over">投标截止</span>
              <a class="btn-bm" v-if="dayFn(myDate-item.SUBMIT_TENDER_DOCUMENT_END) != '已结束'" @click="bmToBid">投标</a> -->
              <em class="time" v-if="dayFn(item.SUBMIT_TENDER_DOCUMENT_END-myDate) != '已结束'">倒计时：{{dayFn(item.SUBMIT_TENDER_DOCUMENT_END-myDate)}}天</em>
              <em class="time" v-if="dayFn(item.SUBMIT_TENDER_DOCUMENT_END-myDate) == '已结束'">已结束</em>
              <a class="ggMain" @click="lookDetail(item)">
                <i>●</i>{{item.TENDER_NAME}}
              </a>
            </li>
            <!-- <li>
              <a class="btn-bm" @click="bmToBid">投标</a>
              <em class="time">倒计时：12天</em>
              <a class="ggMain" @click="lookDetail">
                <i>●</i>当代置业集团2016-2017年度工程造价复审集采招标公告2017年度工程造价复审集采招标公告
              </a>
            </li> -->
          </ul>
        </div>
        <div class="inf-list">
          <h4>
            <router-link :to="{ path: '/bidWinMessage' }">查看更多</router-link>
            <span>中标公告</span>
          </h4>
          <ul>
            <li v-for="(item, index) in tenderWinList" :key="index">
              <a :title="item.TENDER_NAME">
                <i>●</i>{{item.TENDER_NAME}}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear" style="width:100%;height:1px;clear:both;font-size:0px;"></div>
    </div>
    <div class="footer">版权所有Copyright@2016第一资产招采平台</div>
    <gg-detail :detailData="detailData"></gg-detail>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      loginForm: {
        pass: "",
        name: ""
      },
      userInfo: {},
      loginSucc: false,
      detailData: {
        isShow: false,
        code: ""
      },
      tenderFileList: [],
      tenderFileListData: {
        pageNum: 1,
        pageSize: 8,
        tenderFileCode: ""
      },
      tenderWinList: [],
      tenderWinListData: {
        pageNum: 1,
        pageSize: 8
      },
      bannerList: [
        'static/images/banner1.png',
        'static/images/banner2.png',
      ],
      myDate: '',
    };
  },
  mounted() {
    document.title = '第一资产招采平台';
    if(sessionStorage.getItem('supplierLoginInfo')){
          this.userInfo = JSON.parse(sessionStorage.getItem('supplierLoginInfo'));
      } else {
          this.userInfo = {};
      }
    this.tenderFileListFn();
    this.tenderWinListFn();
    var date = new Date().getTime()
    this.myDate = date;
  },
  methods: {
    dayFn(time){
      time = time + 57600000;
      if(time>0){
        var day = time/1000/60/60/24;
        day = Math.floor(day);
        return day;
      } else {
        return '已结束'
      }
      
    },
    supplierLogin() {
      this.$api.modular
        .getSupLogin(this.loginForm)
        .then(res => {
          if(res.status == 200){
            if(res.data.returnCode == 0){
              this.$message.success('登录成功！');
              this.userInfo = res.data.data[0];
              this.loginSucc = true;
              sessionStorage.setItem('supplierLoginInfo', JSON.stringify(this.userInfo));
              this.$router.push({
                name: "startBid"
              });
            } else {
              this.$message.error('登录失败！');
            }
          }
        })
    },
    bmToBid() {
      this.$router.push({
        name: "startBid",
      });
    },
    lookDetail(row) {
      if (!this.userInfo.SUPPLIER_NAME) {
        this.$message.error("请先登录！");
        return false;
      }
      this.detailData.isShow = true;
      this.detailData.code = row.TENDER_FILE_CODE;
    },
    tenderFileListFn() {
      this.$api.modular.tenderFileList(this.tenderFileListData).then(res => {
        if(res.status == 200){
          if(res.data.returnCode == 0){
            if(res.data.data.length>8){
              this.tenderFileList = res.data.data.slice(0,8);
            } else {
              this.tenderFileList = res.data.data;
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    },
    tenderWinListFn() {
      this.$api.modular.tenderWinList(this.tenderWinListData).then(res => {
        if(res.status == 200){
          if(res.data.returnCode == 0){
            this.tenderWinList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
h1,h2,h3,h4,h5,h6,ul,li,p,span{
  margin: 0;
}
li{
  list-style: none;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.blockBanner {
  width: 100%;
  height: 360px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #ccc;
}
.blockBanner .el-carousel__container{
  height:  360px;
}
.blockBanner img{
  float: left;
  width: 100%;
  height: 360px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
}
.wrap {
  width: 1170px;
  margin: 0 auto;
}

.r-con {
  float: right;
  width: 310px;
}
.home-login {
  overflow: hidden;
  font-size: 12px;
}
.home-login h4 {
  font-size: 14px;
  border-bottom: 1px solid #cf001b;
  line-height: 36px;
  font-weight: normal;
  padding-left: 5px;
  margin-bottom: 8px;
}
.home-login h4 .btn-reg {
  height: 36px;
  display: block;
  padding-right: 18px;
  float: right;
  color: #cf001b;
  font-size: 12px;
}
.home-login p {
  border-bottom: 1px solid #ededed;
  height: 50px;
  line-height: 50px;
  font-size: 13px;
}
.home-login .input-user {
  height: 50px;
  border: none;
  font-size: 12px;
  padding-left: 50px;
  width: 80%;
}
.home-login .input-password {
  height: 50px;
  border: none;
  font-size: 12px;
  padding-left: 50px;
  width: 80%;
}
.home-login .look a {
  padding: 15px 0 30px;
  display: block;
  font-size: 14px;
  color: #cf001b;
}
.home-login .btn-login {
  height: 38px;
  line-height: 38px;
  background: #cf001b;
  border-radius: 4px;
  display: block;
  border: none;
  color: #fff;
  font-size: 15px;
  text-align: center;
  width: 100%;
  cursor: pointer;
}

.l-con {
  margin-right: 364px;font-size: 12px;
}
.l-con .inf-list {
  margin: 8px 0 0;
  overflow: hidden;
}
.l-con .inf-list h4 {
  font-size: 14px;
  border-bottom: 1px dotted #ccc;
  line-height: 34px;
  font-weight: normal;
  float: left;
  width: 100%;
}
.l-con .inf-list h4 a {
  float: right;
  color: #cf001b;
  font-weight: normal;
  font-size: 12px;
}
.l-con .inf-list h4 span {
  float: left;
}
.l-con .inf-list ul {
  padding: 10px 0;
  width: 100%;
  float: left;
  margin: 0;
  max-height: 256px;
  overflow: auto;
}
.l-con .inf-list ul.gg li {
  width: 100%;
  margin-right: 0;
  float: left;
  line-height: 32px;
  height: 32px;
  color: #575757;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.l-con .inf-list ul.gg li a.ggMain {
  width: 520px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.l-con .inf-list ul.gg li a.ggMain:hover {
  cursor: pointer;
}
.l-con .inf-list ul li {
  width: 48%;
  float: left;
  margin-right: 2%;
  line-height: 32px;
  height: 32px;
  color: #575757;
}
.l-con .inf-list ul li a {
  float: left;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  text-align: left;
  width: 100%;
}
.l-con .inf-list ul li i {
  color: #cf001b;
  font-size: 10px;
  padding-right: 6px;
}
.l-con .inf-list ul li .time {
  float: right;
  width: 140px;
  text-align: right;
  padding-right: 6px;
  font-size: 12px;
}
.l-con .inf-list ul li .btn-bm {
  border-radius: 25px;
  background: #cf001b;
  height: 24px;
  line-height: 24px;
  width: 67px;
  float: right;
  text-align: center;
  color: #fff;
  font-size: 12px;
}
.l-con .inf-list ul li .btn-over {
  border-radius: 25px;
  background: #b0b0b0;
  height: 24px;
  line-height: 24px;
  width: 67px;
  float: right;
  text-align: center;
  color: #fff;
  font-size: 12px;
}
.home-login .login-success {
  width: 100%;
  height: 178px;
  text-align: center;
  margin-top: -7px;
}
.home-login .login-success .company {
  text-align: center;
  height: 60px;
  line-height: 22px;
  padding-top: 46px;
  display: block;
  font-size: 13px;
}
.complaint {
  border: 1px solid #ededed;
  margin-top: 16px;font-size: 12px;
}
.complaint h4 {
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  background: #f0f0f0;
  font-size: 14px;
  font-weight: normal;
}
.complaint p {
  padding: 20px;
  line-height: 30px;
}
.supplierLoginForm {
  margin-top: 20px;
}

.supplierLoginForm .el-input__inner, .supplierLoginForm .el-form-item__label{
  font-size: 12px;
}
.supplierLogin {
  width: 100%;
  background: #cf001b;
  color: #fff;
  border: none;
}
.supplierLogin:hover,
.supplierLogin:focus {
  background: #cf001b;
  color: #fff;
  border: none;
}
.btn-bm:hover {
  cursor: pointer;
}
.el-carousel__indicator.is-active button{
  background: #cf001b;
  opacity: 1;
}
.el-carousel__button{
  width: 60px;
  height: 4px;
}
.el-carousel__indicators--horizontal{
  bottom: 14px;
}
.el-carousel__item img{
  display: block;
  width: 100%;
  margin: 0 auto;
}
.el-carousel__arrow{
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 88;
  width: 100%;
  background: #3e3e3e;
  text-align: center;
  height: 42px;
  line-height: 42px;
  color: #fff;
  min-width: 1170px;
  margin-top: 20px;
}

body{
  background: #fff;
}
</style>
