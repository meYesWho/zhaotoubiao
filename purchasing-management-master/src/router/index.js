import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '../page/demo'
import demo2 from '../page/demo2'
import ProcurementGroupHome from '../page/ProcurementGroup/ProcurementGroupHome' // 采购组首页
import addgroup from '../page/ProcurementGroup/addgroup' // 添加采购组
import ExecutionSheetHome from '../page/executionSheet/ExecutionSheetHome'  // 执行单定制首页
import defendSheet from '../page/executionSheet/defendSheet' // 执行单维护页

import defendSheetLook from '../page/executionSheetLook/defendSheet' // 执行单查看页
import candidateData from '../page/executionSheetLook/candidateData' // 候选人数据查看
import tenderDataLook from '../page/executionSheetLook/tenderDataLook' // 候选人数据查看 
import bidWinApproveLook from '../page/executionSheetLook/bidWinApproveLook' // 候选人数据查看 

import documentApprovalHome from '../page/documentApproval/documentApprovalHome' // 招标文件审定首页
import candidateHome from '../page/documentApproval/candidateHome' // 招标候选人审定首页
import guaranteeAmount from '../page/documentApproval/guaranteeAmount' // 保证金缴纳确认
import bidIssuing from '../page/documentApproval/bidIssuing' // 发标
import Answering from '../page/documentApproval/Answering' // 招标文件答疑
import returnBid from '../page/documentApproval/returnBid' // 回标
import technicalBid from '../page/documentApproval/technicalBid' // 开技术标
import technicalBid2 from '../page/documentApproval/technicalBid2' // 评技术标
import businessBid from '../page/documentApproval/businessBid' // 开商务标
import businessBid2 from '../page/documentApproval/businessBid2' // 评商务标
import bidReport from '../page/documentApproval/bidReport' // 综合评标报告
import winBidApproval from '../page/documentApproval/winBidApproval' // 中标审定
import bidProgressQuery from '../page/documentApproval/bidProgressQuery' // 招标进展查询
import process from '../page/process/process' // 编制招标文件首页
import zwWinBidApprove from '../page/process/zwWinBidApprove'


import supplierLogin from '../page/executionSheetLook/supplierLogin' // 供应商登录页
import startBid from '../page/supplier/startBid/startBid' // 投标
import startBid2 from '../page/supplier/startBid/startBid2' // 投标
import supplierIndex from '../page/supplier/index'
import bidWinMessage from '../page/supplier/bidWinMessage'
import bidFunMessage from '../page/supplier/bidFunMessage'


Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  // mode: 'history',
  base: '/td/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: 'ProcurementGroupHome',
      children: [
        {
          path: '/demo2',
          name: 'demo2',
          component: demo2
        },
        {
          path: '/ProcurementGroupHome',
          name: 'ProcurementGroupHome',
          component: ProcurementGroupHome
        },
        {
          path: '/addgroup',
          name: 'addgroup',
          component: addgroup
        },
        {
          path: '/ExecutionSheetHome',
          name: 'ExecutionSheetHome',
          component: ExecutionSheetHome,
        },
        {
          path: '/defendSheet',
          name: 'defendSheet',
          component: defendSheet
        },
        {
          path: '/documentApprovalHome',
          name: 'documentApprovalHome',
          component: documentApprovalHome
        },
        {
          path: '/candidateHome',
          name: 'candidateHome',
          component: candidateHome
        },
        {
          path: '/guaranteeAmount',
          name: 'guaranteeAmount',
          component: guaranteeAmount
        },
        {
          path: '/bidIssuing',
          name: 'bidIssuing',
          component: bidIssuing
        },
        {
          path: '/Answering',
          name: 'Answering',
          component: Answering
        },
        {
          path: '/returnBid',
          name: 'returnBid',
          component: returnBid
        },
        {
          path: '/technicalBid',
          name: 'technicalBid',
          component: technicalBid
        },
        {
          path: '/technicalBid2',
          name: 'technicalBid2',
          component: technicalBid2
        },
        {
          path: '/businessBid',
          name: 'businessBid',
          component: businessBid
        },
        {
          path: '/businessBid2',
          name: 'businessBid2',
          component: businessBid2
        },
        {
          path: '/bidReport',
          name: 'bidReport',
          component: bidReport
        },
        {
          path: '/winBidApproval',
          name: 'winBidApproval',
          component: winBidApproval
        },
        {
          path: '/bidProgressQuery',
          name: 'bidProgressQuery',
          component: bidProgressQuery
        },
        {
          path: '/process',
          name: 'process',
          component: process
        },
      ]
    },
    {
      path: '/supplierLogin',
      name: 'supplierLogin',
      component: supplierLogin
    },
    {
      path: '/defendSheetLook',
      name: 'defendSheetLook',
      component: defendSheetLook
    },
    {
      path: '/candidateData',
      name: 'candidateData',
      component: candidateData
    },
    {
      path: '/tenderDataLook',
      name: 'tenderDataLook',
      component: tenderDataLook
    },
    {
      path: '/bidWinApproveLook',
      name: 'bidWinApproveLook',
      component: bidWinApproveLook
    },
    {
      path: '/startBid',
      name: 'startBid',
      component: startBid
    },
    {
      path: '/startBid2',
      name: 'startBid2',
      component: startBid2
    },
    {
      path: '/bidWinMessage',
      name: 'bidWinMessage',
      component: bidWinMessage
    },
    {
      path: '/bidFunMessage',
      name: 'bidFunMessage',
      component: bidFunMessage
    },
    {
      path: '/supplierIndex',
      name: 'supplierIndex',
      component: supplierIndex
    },
    {
      path: '/zwWinBidApprove',
      name: 'zwWinBidApprove',
      component: zwWinBidApprove
    }
  ]
})
