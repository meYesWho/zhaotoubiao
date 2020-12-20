// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Vuex from 'vuex'
import base from './api/base';
import router from './router' // 导入路由文件
import store from './store/store' // 导入vuex文件
import api from './api' // 导入api接口
import Print from 'vue-print-nb'
import Cookies from 'vue-cookies';
import "babel-polyfill";

import pageHeader from './components/header'
import sideBar from './components/sidebar'
import pagination from './components/pagination'
import RelatedItems from './components/RelatedItems'
import subjectJson from './components/subjectJson'
import searchForm from './components/searchForm'
import bidInfoTitle from './components/bidInfoTitle'
import thanksInfo from './components/thanksInfo'
import memberList from './components/memberList'
import memberListCopy from './components/memberListCopy'
import tenderItemList from './components/tenderItemList'
import increaseSupplier from './components/increaseSupplier'
import addSheet from './components/addSheet'
import LevelCodeName from './components/LevelCodeName'
import processOne from './page/process/processOne'
import processTwo from './page/process/processTwo'
import processThree from './page/process/processThree'
import processFore from './page/process/processFore'
import processFive from './page/process/processFive'
import processSix from './page/process/processSix'
import processSeven from './page/process/processSeven'
import processEight from './page/process/processEight'
import processNine from './page/process/processNine'
import processTen from './page/process/processTen'
import processEleven from './page/process/processEleven'
import processTwelve from './page/process/processTwelve'
import zwWinBidMain from './page/process/zwWinBidMain'
import ggDetail from '@/components/ggDetail';
import supplierHeader from '@/components/supplierHeader';

// import approval from './components/approval'
import commonFn from './utils/common'
Vue.use(Vuex)
Vue.use(Element)
Vue.use(Print);
Vue.use(Cookies);
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.commonFn = commonFn;
Vue.prototype.$print = Print;
Vue.prototype.$Cookies = Cookies;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    pageHeader,
    sideBar,
    pagination,
    RelatedItems,
    subjectJson,
    memberList,
    memberListCopy,
    tenderItemList,
    bidInfoTitle,
    increaseSupplier,
    addSheet,
    searchForm,
    LevelCodeName,
    processOne,
    processTwo,
    processThree,
    processFore,
    processFive,
    processSix,
    processSeven,
    processEight,
    processNine,
    processTen,
    processEleven,
    processTwelve,
    zwWinBidMain,
    thanksInfo,
    ggDetail,
    supplierHeader
  },
  template: '<App/>',
  methods: {

  },
  created() {
    // 取 sso_sessionid
    var urlV = window.location.href;
    var switchV = urlV.indexOf('sso');
    var sso_sessionid = sessionStorage.getItem('sso_sessionid')
    var pathS = urlV.indexOf('supplierLogin');
    var pathX = urlV.indexOf('startBid');
    var isOutIn = urlV.indexOf('isOutIn');
    var defendSheetLook = urlV.indexOf('defendSheetLook');
    var candidateData = urlV.indexOf('candidateData');
    var bidWinApproveLook = urlV.indexOf('bidWinApproveLook');
    var tenderDataLook = urlV.indexOf('tenderDataLook');
    var supplierIndex = urlV.indexOf('supplierIndex');
    var bidWinMessage = urlV.indexOf('bidWinMessage');
    var bidFunMessage = urlV.indexOf('bidFunMessage');
    var bidProgressQuery = urlV.indexOf('type=bidProgressQuery');
    var ExecutionSheetHome = urlV.indexOf('type=ExecutionSheetHome');
    
    var handle = urlV.indexOf('type=handle');
    if (pathS != -1 || pathX != -1 ||
      defendSheetLook != -1 || candidateData != -1 ||
      bidWinApproveLook != -1 || tenderDataLook != -1 ||
      supplierIndex != -1 ||
      bidWinMessage != -1 ||
      bidFunMessage != -1
    ) {
      return false;
    }
    if (isOutIn != -1) {
      sessionStorage.setItem('isOutInSession', '1');
      var index = urlV.slice(urlV.indexOf('active=') + 7, urlV.indexOf('active=') + 8);
      var tenderFileCode = urlV.slice(urlV.indexOf('tenderFileCode=') + 15, urlV.indexOf('&isOutIn='));
      var isOutInVal = urlV.slice(urlV.indexOf('isOutIn=') + 8, urlV.indexOf('isOutIn=') + 9);
      sessionStorage.setItem('indexDb', index);
      sessionStorage.setItem('tenderFileCodeDb', tenderFileCode);
      sessionStorage.setItem('isOutInValDb', isOutInVal);
    }
    if (bidProgressQuery != -1) {
      sessionStorage.setItem('bidProgressQuery', '1');
    }
    if (ExecutionSheetHome != -1) {
      sessionStorage.setItem('ExecutionSheetHome', '1');
    }
    if (handle != -1) {
      sessionStorage.setItem('handleStatus', '1');
    }
    if (switchV == -1) {
      if (!sso_sessionid) {
        window.location.href = base.tologinUrl;
      } else {
        // window.location.href = base.tologinUrl;
        var userName = sso_sessionid.substring(0, sso_sessionid.indexOf('_'));
        this.$store.commit('assignmentSSO', sso_sessionid);
        this.$store.commit('userName', userName);
        this.login(sso_sessionid);
      }
    } else {
      if (!sso_sessionid) {
        var sso_sessionid2 = urlV.substring(urlV.indexOf('sso_sessionid=') + 14, urlV.indexOf('#/'));
        sessionStorage.setItem('sso_sessionid', sso_sessionid2);
      } else {
        var sso_sessionid2 = sso_sessionid;
      }
      var userName = sso_sessionid2.substring(0, sso_sessionid2.indexOf('_'));
      this.$store.commit('assignmentSSO', sso_sessionid2);
      this.$store.commit('userName', userName);
      this.login(sso_sessionid2);
    }
  },
  mounted() {
    // router.beforeEach((to, from, next) => {
    //   if (to.meta.title) {
    //     document.title = to.meta.title
    //   }
    //   next()
    // })
  },
  methods: {
    login(sso_sessionid) {
      this.$api.modular.login(sso_sessionid, '').then(res => {
        if (res.status == 200) {
          if (res.data.returnCode == 0) {
            if (res.data.data) {
              var permissionList = [];
              for (var p = 0; p < res.data.data.permissionList.length; p++) {
                if (res.data.data.permissionList[p]) {
                  if (res.data.data.permissionList[p].indexOf('aph2_tender') != -1) {
                    permissionList.push(res.data.data.permissionList[p]);
                  }
                }
              }
              res.data.data.permissionList = permissionList;
              this.$store.commit('userInfo', JSON.stringify(res.data.data));
            } else {
              this.$message.error('登录信息有误！');
              return false;
            }
            var bidProgressQueryV = sessionStorage.getItem('bidProgressQuery');
            var ExecutionSheetHomeV = sessionStorage.getItem('ExecutionSheetHome');
            var handleV = sessionStorage.getItem('handleStatus');
            var isOutInSession = sessionStorage.getItem('isOutInSession');
            if (isOutInSession == 1) {
              var index = sessionStorage.getItem('indexDb');
              var tenderFileCode = sessionStorage.getItem('tenderFileCodeDb');
              var isOutInVal = sessionStorage.getItem('isOutInValDb');
              if (isOutInVal == 1) {
                var params = {
                  page: 1,
                  size: 100,
                  tenderName: '',
                  tenderNumber: '',
                  tenderType: '',
                  commCode: '',
                }
                var arr = [];
                if (index == 7) {
                  this.$api.modular.getTenderEvaluation(sso_sessionid, params).then(res => {
                    if (res.status == 200 && res.data.returnCode == 0) {
                      for (var i = 0; i < res.data.data.length; i++) {
                        if (tenderFileCode == res.data.data[i].tenderFileCode) {
                          arr.push(res.data.data[i])
                        }
                      }
                      sessionStorage.removeItem('isOutInSession');
                      sessionStorage.removeItem('indexDb');
                      sessionStorage.removeItem('tenderFileCodeDb');
                      sessionStorage.removeItem('isOutInValDb');
                      var params = {
                        tenderFileCode: arr[0].tenderFileCode
                      };
                      this.$api.modular.getScheduleMax(sso_sessionid, params).then(res => {
                        if (res.status == 200) {
                          if (res.data.returnCode == 0) {
                            if (res.data.data.length > 0) {
                              var num = res.data.data[0].TENDER_ROW_NUM;
                              var status = res.data.data[0].TENDER_SCHEDULE_STATUS;
                              if (num > 5) {
                                num = num - 1;
                              }
                              this.commonFn.routerProcess(arr, Number(index), this, 1, '', true, num, status);
                            } else {
                              this.$message.error(res.data.message);
                              return false;
                            }
                          } else {
                            this.$message.error(res.data.message);
                            return false;
                          }
                        } else {
                          this.$message.error(res.message);
                          return false;
                        }
                      });
                    }
                  })
                } else if(index == 9){
                  this.$api.modular.getTenderEvaluationBusiness(sso_sessionid, params).then(res => {
                    if (res.status == 200 && res.data.returnCode == 0) {
                      for (var i = 0; i < res.data.data.length; i++) {
                        if (tenderFileCode == res.data.data[i].tenderFileCode) {
                          arr.push(res.data.data[i])
                        }
                      }
                      sessionStorage.removeItem('isOutInSession');
                      sessionStorage.removeItem('indexDb');
                      sessionStorage.removeItem('tenderFileCodeDb');
                      sessionStorage.removeItem('isOutInValDb');
                      var params = {
                        tenderFileCode: arr[0].tenderFileCode
                      };
                      this.$api.modular.getScheduleMax(sso_sessionid, params).then(res => {
                        if (res.status == 200) {
                          if (res.data.returnCode == 0) {
                            if (res.data.data.length > 0) {
                              var num = res.data.data[0].TENDER_ROW_NUM;
                              var status = res.data.data[0].TENDER_SCHEDULE_STATUS;
                              if (num > 5) {
                                num = num - 1;
                              }
                              this.commonFn.routerProcess(arr, Number(index), this, 1, '', true, num, status);
                            } else {
                              this.$message.error(res.data.message);
                              return false;
                            }
                          } else {
                            this.$message.error(res.data.message);
                            return false;
                          }
                        } else {
                          this.$message.error(res.message);
                          return false;
                        }
                      });

                    }
                  })
                }

              }
            }
            if (bidProgressQueryV == 1) {
              sessionStorage.removeItem('bidProgressQuery');
              this.$router.push({
                path: '/bidProgressQuery'
              })
            }
            if (ExecutionSheetHomeV == 1) {
              sessionStorage.removeItem('ExecutionSheetHome');
              this.$router.push({
                path: '/ExecutionSheetHome'
              })
            }
            if (handleV == 1) {
              sessionStorage.removeItem('handleStatus');
              var qx1 = 0;
              var qx2 = 0;
              var qx3 = 0;
              var qx4 = 0;
              var qx5 = 0;
              var qx6 = 0;
              var qx7 = 0;
              var qx8 = 0;
              var qx9 = 0;
              var qx10 = 0;
              var qx11 = 0;
              var qx12 = 0;
              for (var i = 0; i < res.data.data.permissionList.length; i++) {
                if (res.data.data.permissionList[i] == 'aph2_tender_ZBWJSD-QX-M10') {
                  qx1 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_ZBHXRSD-QX-M10') {
                  qx2 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_BZJJNQR-QX-M10') {
                  qx3 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_FCZBWJ-QX-M10') {
                  qx4 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_ZBWJDY-QX-M10') {
                  qx5 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_ZTBHB-QX-M10') {
                  qx6 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_KJSB-QX-M10') {
                  qx7 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_PJSB-QX-M10') {
                  qx8 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_KSWB-QX-M10') {
                  qx9 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_PSWB-QX-M10') {
                  qx10 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_ZHPGBG-QX-M10') {
                  qx11 = 1;
                }
                if (res.data.data.permissionList[i] == 'aph2_tender_ZBSD-QX-M10') {
                  qx12 = 1;
                }
              }
              if (qx1 == 1) {
                this.$router.push({
                  path: '/documentApprovalHome'
                })
              } else if (qx2 == 1) {
                this.$router.push({
                  path: '/candidateHome'
                })
              } else if (qx3 == 1) {
                this.$router.push({
                  path: '/guaranteeAmount'
                })
              } else if (qx4 == 1) {
                this.$router.push({
                  path: '/bidIssuing'
                })
              } else if (qx5 == 1) {
                this.$router.push({
                  path: '/Answering'
                })
              } else if (qx6 == 1) {
                this.$router.push({
                  path: '/returnBid'
                })
              } else if (qx7 == 1) {
                this.$router.push({
                  path: '/technicalBid'
                })
              } else if (qx8 == 1) {
                this.$router.push({
                  path: '/technicalBid2'
                })
              } else if (qx9 == 1) {
                this.$router.push({
                  path: '/businessBid'
                })
              } else if (qx10 == 1) {
                this.$router.push({
                  path: '/businessBid2'
                })
              } else if (qx11 == 1) {
                this.$router.push({
                  path: '/bidReport'
                })
              } else if (qx12 == 1) {
                this.$router.push({
                  path: '/winBidApproval'
                })
              }
            }
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        window.location.href = base.logoutUrl;
      })
    },
  }
})
