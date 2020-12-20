/**
  * article模块接口列表
  */
import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
    // 新闻列表
    articleList() {
        return axios.get(`/topics`);
    },
    // 登录信息
    login(sso_sessionid, params) {
        return axios.post(`/tenderRequest/getUserInfo?sso_sessionid=${sso_sessionid}`, params);
    },

    // 删除文件
    delFileFn(sso_sessionid, params){
        return axios.post(`/fileInfo/delFileByServiceCode?sso_sessionid=${sso_sessionid}&serviceCode=${params.serviceCode}`);
    },
    //查询项目信息、业务单元
    // 查询项目信息
    getCostCenterTreeJson(sso_sessionid, params) {
        return axios.post(`/tenderRequest/getCostCenterTreeJson?sso_sessionid=${sso_sessionid}&username=${params.userName}&costCenterCode=${params.costCenterCode}`, params);
    },
    // 科目
    getSubjectTreeJson(sso_sessionid, params) {
        return axios.post(`/tenderRequest/getSubjectList?sso_sessionid=${sso_sessionid}&projectCode=${params.projectCode}`, params);
    },
    // 审定查看招标信息页面
    getTenderByApprove(sso_sessionid, params) {
        return axios.post(`/tender/getTenderByApprove?sso_sessionid=${sso_sessionid}&projectCode=${params.projectCode}`, params);
    },
    // 执行单信息
    getTenderByApproveLook(params) {
        return axios.post(`/outerRequest/getTenderByApprove?projectCode=${params.projectCode}&headCode=${params.headCode}`, params);
    },
    // 候选人信息
    getCandidateHeadList(params) {
        return axios.post(`/outerRequest/getCandidateHeadList?headCode=${params.headCode}`, params);
    },
    // 审定查看招标信息页面
    getTenderFileListApprove(params) {
        return axios.post(`/outerRequest/getTenderFileList?headCode=${params.headCode}`, params);
    },
    // 保证金退款信息
    getWinByTenderBailBack(params) {
        return axios.post(`/outerRequest/getWinByTenderBailBack?tenderBailCode=${params.tenderBailCode}`, params);
    },


    // 采购小组相关接口

    // 查询采购小组列表信息
    getListByObj(sso_sessionid, params) {
        return axios.post(`/group/getListByObj?sso_sessionid=${sso_sessionid}&projectCode=${params.projectCode}&page=${params.page}&size=${params.size}`, params);
    },
    // 删除采购小组列表信息
    deleteGroup(sso_sessionid, params) {
        return axios.post(`/group/groupDelete?sso_sessionid=${sso_sessionid}&groupCode=${params}`);
    },
    // 查询项目信息
    getCostCenterInfo(sso_sessionid, params) {
        return axios.post(`/tenderRequest/getCostCenterInfo?sso_sessionid=${sso_sessionid}`, params);
    },
    // 查询职员信息
    getStaffListByName(sso_sessionid, params, sourceToken) {
        return axios.post(`/tenderRequest/getStaffListByName?sso_sessionid=${sso_sessionid}&token=${params.token}&page=${Number(params.page)}&max=${params.max}&staName=${params.staName}&structureName=${params.structureName}&departmentName=${params.departmentName}&username=${params.username}`, params);
    },
    // 添加修改采购小组
    groupSave(sso_sessionid, params) {
        return axios.post(`/group/save?sso_sessionid=${sso_sessionid}&segment=${params.segment}&projectCode=${params.projectCode}&leaders=${params.leaders}&deputyHeads=${params.deputyHeads}&members=${params.members}&groupHeadCode=${params.groupHeadCode}`);
    },

    // 执行人信息
    getGroupNameByCode(sso_sessionid, params) {
        return axios.post(`/group/getGroupNameByCode?sso_sessionid=${sso_sessionid}&projectCode=${params.projectCode}&page=${params.page}&size=${params.max}&groupPersonName=${params.groupPersonName}`, params);
    },


    // 执行单相关接口

    // 查询未提交采购计划表申请列表信息
    getPlanListByPage(sso_sessionid, params) {
        return axios.post(`/plan/getPlanListByPage?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}`, params);
    },
    // 获取采购计划和招标项信息-根据project获取招标项信息
    getTenderByProjectCode(sso_sessionid, params) {
        return axios.post(`/tender/getTenderByProjectCode?sso_sessionid=${sso_sessionid}&projectCode=${params.projectCode}&approveHeadCode=${params.approveHeadCode}`, params);
    },
    // 作废
    updateByStatus(sso_sessionid, params) {
        return axios.post(`/plan/updateByStatus?sso_sessionid=${sso_sessionid}&planCode=${params}`, params);
    },
    updateOrDelPlanByCode(sso_sessionid, params) {
        return axios.post(`/plan/updateOrDelPlanByCode?sso_sessionid=${sso_sessionid}&planCode=${params}`, params);
    },
    // 制定成本预算和集中/专项采购执行单
    planAdd(sso_sessionid, params) {
        return axios.post(`/plan/add?sso_sessionid=${sso_sessionid}`, params);
    },
    // 合约形式
    getContractTypeList(sso_sessionid, params) {
        return axios.post(`/dataDictionary/getContractTypeList?sso_sessionid=${sso_sessionid}`, params);
    },
    // 招标方式
    getTenderTypeList(sso_sessionid, params) {
        return axios.post(`/dataDictionary/getTenderTypeList?sso_sessionid=${sso_sessionid}`, params);
    },
    // 根据条件查询招标项信息
    getTenderList(sso_sessionid, params) {
        return axios.post(`/tender/getTenderList?sso_sessionid=${sso_sessionid}`, params);
    },
    // 分项查询
    getLevelCodeAndName(sso_sessionid, params) {
        return axios.post(`/levelInfo/getLevelCodeAndName?sso_sessionid=${sso_sessionid}`, params);
    },
    // 添加修改招标项
    tenderSave(sso_sessionid, params) {
        return axios.post(`/tender/save?sso_sessionid=${sso_sessionid}`, params);
    },
    // 删除招标项
    delByHenderCode(sso_sessionid, params) {
        return axios.post(`/tender/delByHenderCode?sso_sessionid=${sso_sessionid}&tenderCode=${params}`, params);
    },
    // 招标项初审、终审
    getApprove(sso_sessionid, params) {
        return axios.post(`/plan/getApprove?sso_sessionid=${sso_sessionid}&approveHeadCode=${params.approveHeadCode}&approveRequestCode=${params.approveRequestCode}&approveType=${params.approveType}&approveContent=${params.approveContent}&approveTitle=${params.approveTitle}`, params);
    },
    // 招标项初审、终审
    getApproveLook(sso_sessionid, params) {
        return axios.post(`/approve/showApproveFlow?sso_sessionid=${sso_sessionid}&approveCode=${params.approveCode}`, params);
    },
    //  审定回调
    updateApproveStatusBycode(sso_sessionid, params) {
        return axios.post(`/plan/updateApproveStatusBycode?sso_sessionid=${sso_sessionid}&headCode=${params.headCode}&status=${params.status}`, params);
    },
    // 招标进展导出
    tenderScheduleReportExcel(sso_sessionid, params) {
        return axios.get(`/tenderReport/tenderScheduleReportExcel?sso_sessionid=${sso_sessionid}&tenderName=${params.tenderName}&segment=${params.segment}&tenderType=${params.tenderType}&personName=${params.personName}&companyName=${params.companyName}`, params.exportExcel, { headers: { 'Content-Type': 'application/json' } }, { responseType: 'blob' });
    },
    // 导出
    exportExcel(sso_sessionid, params) {
        return axios.get(`/tender/exportExcelByBook?sso_sessionid=${sso_sessionid}&projectCode=${params.projectCode}`, params.exportExcel, { headers: { 'Content-Type': 'application/json' } }, { responseType: 'blob' });
    },
    //  修改查询信息
    getTenderByCode(sso_sessionid, params) {
        return axios.post(`/tender/getTenderByCode?sso_sessionid=${sso_sessionid}&tenderCode=${params.tenderCode}`, params);
    },
    //  评分项查询
    getItemScore(sso_sessionid, params) {
        return axios.post(`/itemScore/getItemScore?sso_sessionid=${sso_sessionid}`, params);
    },
    //  评分项查询2
    getItemScoreLook(params) {
        return axios.post(`/outerRequest/getItemScore`, params);
    },

    //  执行单作废
    invalidByTender(sso_sessionid, params) {
        return axios.post(`/tender/invalidByTender?sso_sessionid=${sso_sessionid}&tenderCode=${params.tenderCode}`, params);
    },

    // 招标文件相关接口


    // 查询招标文件关联招标信息
    getTenderFileByInfo(sso_sessionid, params) {
        return axios.post(`/tenderFile/getTenderFileByInfo?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&projectName=${params.projectName}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 添加、修改招标文件
    tenderFileSave(sso_sessionid, data) {
        return axios.post(`/tenderFile/save?sso_sessionid=${sso_sessionid}`, data);
    },
    // 查询招标文件详细信息
    getTenderFileByCodeOne(sso_sessionid, params) {
        return axios.post(`/tenderFile/getTenderFileByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 查询招标文件
    getTenderFileList(sso_sessionid, params) {
        return axios.post(`/tenderFile/getTenderFileList?sso_sessionid=${sso_sessionid}`, params);
    },
    // 查询招标项
    getTenderByPage(sso_sessionid, params) {
        return axios.post(`/tender/getTenderByPage?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderNumber=${params.tenderNumber}&tenderName=${params.tenderName}&contractDemand=${params.contractDemand}`, params);
    },
    // 删除招标文件
    tenderFileDelByCode(sso_sessionid, params) {
        return axios.post(`/tenderFile/delByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 招标文件审定
    tenderFileApproveByCode(sso_sessionid, params) {
        return axios.post(`/tenderFile/tenderFileApproveByCode?sso_sessionid=${sso_sessionid}&headCode=${params.headCode}&approveRequestCode=${params.approveRequestCode}&approveTitle=${params.approveTitle}&approveContent=${params.approveContent}`, params);
    },
    // 发布招标文件
    tenderFileRelease(sso_sessionid, params) {
        return axios.post(`/tenderFile/release?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 撤回发布招标文件
    tenderFileOnReturn(sso_sessionid, params) {
        return axios.post(`/tenderFileRelease/tenderFileOnReturn?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 撤回招标文件发布
    returnTenderFile(sso_sessionid, params) {
        return axios.post(`/tenderFile/returnTenderFile?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 招标文件变更
    tenderFileChangeByCode(sso_sessionid, params) {
        return axios.post(`/tenderFile/changeByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 候选人关联的招标信息
    getTenderByCandidateList(sso_sessionid, params) {
        return axios.post(`/tenderCandidateHead/getTenderByCandidateList?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderNumber=${params.tenderNumber}&tenderName=${params.tenderName}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 查询候选人列表
    getCandidateLineList(sso_sessionid, params) {
        return axios.post(`/tenderCandidateHead/getCandidateLineList?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 候选人发起审定
    approveByTenderCandidate(sso_sessionid, params) {
        return axios.post(`/tenderCandidateHead/approveByTenderCandidate?sso_sessionid=${sso_sessionid}`, params);
    },
    // 删除候选人
    delByLineCode(sso_sessionid, params) {
        return axios.post(`/tenderCandidateHead/delByLineCode?sso_sessionid=${sso_sessionid}&candidateLineCode=${params.candidateLineCode}`, params);
    },
    // 候选人维护（详细信息）
    getLine(sso_sessionid, params) {
        params = {
            candidateHeadCode: '',
            henderFileCode: ''
        }
        return axios.post(`/candidate/getLine?sso_sessionid=${sso_sessionid}`, params);
    },
    // 查询供应商信息
    getSupplierByMaterialCateGory(sso_sessionid, params) {
        return axios.post(`/tenderRequest/getSupplierByMaterialCateGory?sso_sessionid=${sso_sessionid}&pageNum=${params.pageNum}&pageSize=${params.pageSize}&supplierName=${params.supplierName}&servecategoryNames=${params.servecategoryNames}&categoryName=${params.categoryName}`, params);
    },
    // 添加供应商
    tenderCandidateHeadSave(sso_sessionid, params) {
        // var params ={
        //     supplierCode:'',供应商code(多个code用；隔开)
        //     tenderFileCode: '',招投标文件Code
        // }
        return axios.post(`/tenderCandidateHead/save?sso_sessionid=${sso_sessionid}&supplierCode=${params.supplierCode}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 保证金缴纳—查询需要缴纳保证金的候选人信息
    getCandidateByTenderFileCode(sso_sessionid, params) {
        return axios.post(`/tenderBail/getCandidateByTenderFileCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 查询招标项列表（关联保证金）
    getTenderByBail(sso_sessionid, params) {
        return axios.post(`/tenderBail/getTenderByBail?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderNumber=${params.tenderNumber}&tenderName=${params.tenderName}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 保证金退回
    tenderBailBack(sso_sessionid, params) {
        return axios.post(`/tenderBail/tenderBailBack?sso_sessionid=${sso_sessionid}&tenderBailCode=${params.tenderBailCode}&tenderBailBackDateStr=${params.tenderBailBackDateStr}&tenderBailBackAmount=${params.tenderBailBackAmount}`, params);
    },
    // 保证金退回查看
    getTenderBailBack(sso_sessionid, params) {
        return axios.post(`/tenderBail/getTenderBailBack?sso_sessionid=${sso_sessionid}&tenderBailCode=${params.tenderBailCode}`, params);
    },
    // 保证金添加
    tenderBailAdd(sso_sessionid, params) {
        return axios.post(`/bail/add?sso_sessionid=${sso_sessionid}`, params);
    },
    // 保证金修改
    bailUpdateByObj(sso_sessionid, type, params) {
        return axios.post(`/tenderBail/saveAll?sso_sessionid=${sso_sessionid}&operationStatus=${type}`, params);
    },




    // 答疑关联招标信息查询
    getTenderByAnswer(sso_sessionid, params) {
        return axios.post(`/tenderFileAnswer/getTenderByAnswer?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderNumber=${params.tenderNumber}&tenderName=${params.tenderName}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 完成答疑
    overAnswer(sso_sessionid, params) {
        return axios.post(`/tenderFileAnswer/overAnswer?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 查询当前招标文件下的答疑文件信息
    getTenderFileAnswer(sso_sessionid, params) {
        return axios.post(`/tenderFileAnswer/getTenderFileAnswer?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 删除文件信息
    delByCodeAnswer(sso_sessionid, params) {
        return axios.post(`/tenderFileAnswer/delByCode?sso_sessionid=${sso_sessionid}&fileCode=${params.fileCode}`, params);
    },
    // 上传文件信息
    uploadAnswerFile(sso_sessionid, params) {
        return axios.post(`/tenderFileAnswer/uploadAnswerFile?sso_sessionid=${sso_sessionid}&fileCode=${params.fileCode}`, params);
    },

    // 查询招标文件（关联）信息
    getTenderFileRelease(sso_sessionid, params) {
        return axios.post(`/tenderFileRelease/getTenderFileRelease?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    getReleaseByCode(sso_sessionid, params){
        return axios.post(`/tenderFileRelease/getTenderFileReleaseByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 招标文件发布
    getTenderFileByRelease(sso_sessionid, params) {
        return axios.post(`/tenderFileRelease/getTenderFileByRelease?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    tenderFileOnReport(sso_sessionid, params) {
        return axios.post(`/tenderFileRelease/tenderFileOnReport?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },


    // 回标
    // 回标关联招标信息查询
    getTenderReturn(sso_sessionid, params) {
        return axios.post(`/tenderReturn/getTenderReturn?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 查询回标信息
    getReturnList(sso_sessionid, params) {
        return axios.post(`/tenderReturn/getReturnList?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 完成回标
    overReturn(sso_sessionid, params) {
        return axios.post(`/tenderReturn/overReturn?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderCandidateLineCodeS=${params.tenderCandidateLineCodeS}`, params);
    },
    // 在回标中流标
    tenderLoseByReturn(sso_sessionid, params) {
        return axios.post(`/tenderReturn/tenderLoseByReturn?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 开评标

    // 查询招标文件（关联）信息-首页-招标文件查询
    getTenderOpenTechnicalList(sso_sessionid, params) {
        return axios.post(`/tenderOpenTechnical/getTenderOpenTechnicalList?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 获取开技术标
    openTechnical(sso_sessionid, params) {
        return axios.post(`/tenderOpenTechnical/openTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 完成开技术标
    completeOpenTechnical(sso_sessionid, params) {
        return axios.post(`/tenderOpenTechnical/completeOpenTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 在开标环节中进行流标
    tenderLoseByOpenTechnical(sso_sessionid, params) {
        return axios.post(`/tenderOpenTechnical/tenderLoseByOpenTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 查询已开技术标，待评技术标的招标信息
    getTenderEvaluation(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/getTenderEvaluation?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 启动评技术标
    openEvaluationTechnical(sso_sessionid, params) {
        return axios.post(`/tenderRequest/openEvaluationTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 保存技术标评标信息
    saveEvaluationTechnical(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/saveEvaluationTechnical?sso_sessionid=${sso_sessionid}&fileCode=${params.fileCode}&tenderFileCode=${params.tenderFileCode}`, params.array);
    },
    // 技术组评技术标（查询评标信息
    evaluationTechnical(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/evaluationTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 保存技术标评标报告
    saveTenderEvaluationTechnical(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/saveTenderEvaluationTechnical?sso_sessionid=${sso_sessionid}&linScoreS=${params.linScoreS}&evaluationReportCode=${params.evaluationReportCode}`, params);
    },
    // 技术综合评标报告 - 查询
    technicalReport(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/technicalReport?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 技术综合评标报告 - 流标
    jsbLoseBid(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/tenderLoseByEvaluationTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 完成评技术标
    jsbOverBid(sso_sessionid, params) {
        return axios.post(`/tenderEvaluation/completeEvaluationTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    

    // 查询招标文件（关联）信息-首页-开商务标查询
    getOpenBusinessList(sso_sessionid, params) {
        return axios.post(`/tenderOpenBusiness/getOpenBusinessList?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 开商务标-查询
    openBusiness(sso_sessionid, params) {
        return axios.post(`/tenderOpenBusiness/openBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 完成开商务标
    completeOpenBusiness(sso_sessionid, params) {
        return axios.post(`/tenderOpenBusiness/completeOpenBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 开商务标-流标
    tenderLoseByOpenTechnical(sso_sessionid, params) {
        return axios.post(`/tenderOpenBusiness/tenderLoseByOpenTechnical?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    //查询招标文件（关联）信息-首页-查询已开商务标，待评商务标的招标信息
    getTenderEvaluationBusiness(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/getTenderEvaluationBusiness?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 查询商务谈判
    getTenderBusinessList(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/getTenderBusinessList?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 完成商务谈判
    completeTenderBusiness(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/completeTenderBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 商务组评商务标—-查询
    evaluationBusiness(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/evaluationBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 启动评商务标，并发送代办
    openEvaluationBusiness(sso_sessionid, params) {
        return axios.post(`/tenderRequest/openEvaluationBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 保存商务谈判信息
    saveTenderBusiness(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/saveTenderBusiness?sso_sessionid=${sso_sessionid}`, params);
    },
    // 评商务标 流标
    swbLoseBid(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/tenderLoseByEvaluationBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 评商务标 完成
    swbOverBid(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/completeEvaluationBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&linCodeScoreS=${params.linCodeScoreS}`, params);
    },
    // 评商务标 完成——查询
    getEvaluationBusiness(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/getEvaluationBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 保存商务标评标信息
    saveEvaluationBusiness(sso_sessionid, params) {
        return axios.post(`/tenderEvaluationBusiness/saveEvaluationBusiness?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&fileCode=${params.fileCode}`, params.array);
    },


    // 投标https://devtender.firstcare.com.cn/tenderSubmit/getTenderSubmitList
    getTenderSubmitList(params) {
        return axios.post(`/tenderSubmit/getTenderSubmitList?tenderName=${params.tenderName}&supplierCode=${params.supplierCode}`, params);
    },
    // // 投标https://devtender.firstcare.com.cn/tenderSubmit/getTenderSubmitList
    // getTenderSubmitList(sso_sessionid, params) {
    //     return axios.post(`/tenderSubmit/getTenderSubmitList?sso_sessionid=${sso_sessionid}&tenderName=${params.tenderName}`, params);
    // },
    //添加投标信息
    tenderSubmitSave(sso_sessionid, params) {
        return axios.post(`/tenderSubmit/save?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderCandidateLineCode=${params.tenderCandidateLineCode}&tenderQuotation=${params.tenderQuotation}&quoteInputTax=${params.quoteInputTax}&technologyFileCode=${params.technologyFileCode}&businessFileCode=${params.businessFileCode}&tenderDate=${params.tenderDate}&tenderSubmitCode=${params.tenderSubmitCode}`, params);
    },
    //根据Code查询投标信息
    selSubmitByCode(sso_sessionid, params) {
        return axios.post(`/tenderSubmit/selSubmitByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderSubmitCode=${params.tenderSubmitCode}&tenderCandidateLineCode=${params.tenderCandidateLineCode}`, params);
    },
    //根据投标code删除信息
    delByCode(sso_sessionid, params) {
        return axios.post(`/submissionTender/delByCode?sso_sessionid=${sso_sessionid}&tenderName=${params.tenderName}`, params);
    },





    // 中标审定
    bidWinningApprove(sso_sessionid, params) {
        return axios.post(`/bidWinning/approve?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 发布中标信息，根据中标code将中标时间写入到中标表
    bidWinningPublishe(sso_sessionid, params) {
        return axios.post(`/bidWinning/publish?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 保存中标时间
    updateWinDate(sso_sessionid, params) {
        return axios.post(`/tenderWin/updateWinDate?sso_sessionid=${sso_sessionid}&tenderWinDate=${params.tenderWinDate}&tenderWinCode=${params.tenderWinCode}`, params);
    },
    // 查询中标报告信息
    bidWinningGetReport(sso_sessionid, params) {
        return axios.post(`/bidWinning/getReport?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 添加招标进度记录
    tenderScheduleadd(sso_sessionid, params) {
        return axios.post(`/tenderSchedule/add?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },


    // 查询招标文件（关联）信息-首页-招标文件查询
    getTenderByCompiledReport(sso_sessionid, params) {
        return axios.post(`/tenderCompiledReport/getTenderByCompiledReport?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 评标报告--获取推荐中标人
    getWinBider(sso_sessionid, params) {
        return axios.post(`/tenderCompiledReport/getCompiledReportByTenderFileCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 推荐中标人-根据得分倒序
    getLineByScore(sso_sessionid, params) {
        return axios.post(`/tenderCompiledReport/getLineByScore?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 中标审定 - 招标项目列表
    getWinByTender(sso_sessionid, params) {
        return axios.post(`/tenderWin/getWinByTender?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&tenderNumber=${params.tenderNumber}&tenderType=${params.tenderType}&commCode=${params.commCode}`, params);
    },
    // 中标审定信息-查询
    getWinByTenderFileCode(sso_sessionid, params) {
        return axios.post(`/tenderWin/getWinByTenderFileCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 非/战略直委查看中标信息-查询
    getWinIsUnusualByCode(sso_sessionid, params) {
        return axios.post(`/tenderWin/getWinIsUnusualByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 保存中标信息
    saveTenderWin(sso_sessionid, params) {
        return axios.post(`/tenderWin/saveTenderWin?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderWinEndDate=${params.tenderWinEndDate}&tenderWinFileCode=${params.tenderWinFileCode}&tenderWinStartDate=${params.tenderWinStartDate}&contractSignDate=${params.contractSignDate}&strategicAgreementFileCode=${params.strategicAgreementFileCode}&targetCode=${params.targetCode}&tenderWinCode=${params.tenderWinCode}`, params.target);
    },
    // 保存战略直委流程的中标信息
    saveCandidateLinByIsUnusual(sso_sessionid, params) {
        return axios.post(`/tenderWin/saveCandidateLinByIsUnusual?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&supplierCode=${params.supplierCode}`, params);
    },
    // 中标审定 发起审定
    tenderWinApproveByCode(sso_sessionid, params) {
        return axios.post(`/tenderFile/tenderWinApproveByCode?sso_sessionid=${sso_sessionid}&approveHeadCode=${params.approveHeadCode}&approveRequestCode=${params.approveRequestCode}&approveTitle=${params.approveTitle}&approveContent=${params.approveContent}`, params);
    },
    // 中标审定 发起审定
    tenderWinApproveByCodeWin(sso_sessionid, params) {
        return axios.post(`/tenderWin/tenderWinApproveByCode?sso_sessionid=${sso_sessionid}&approveHeadCode=${params.approveHeadCode}&approveRequestCode=${params.approveRequestCode}&approveTitle=${params.approveTitle}&approveContent=${params.approveContent}`, params);
    },
    // 中标信息-流标
    tenderLoseByWin(sso_sessionid, params) {
        return axios.post(`/tenderWin/tenderLoseByWin?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 查询中标报告信息
    getTenderWinPublish(sso_sessionid, params) {
        return axios.post(`/tenderWin/getTenderWinPublish?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderWinCode=${params.tenderWinCode}`, params);
    },
    // 发布中标信息，根据中标code将中标时间写入到中标表中
    submitTenderWinPublish(sso_sessionid, params) {
        return axios.post(`/tenderWin/submitTenderWinPublish?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderWinCode=${params.tenderWinCode}&tenderWinDate=${params.tenderWinDate}`, params);
    },
    // 发布中标公示-撤销
    cancelTenderWinPublish(sso_sessionid, params) {
        return axios.post(`/tenderWin/cancelTenderWinPublish?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderWinCode=${params.tenderWinCode}`, params);
    },
    // 发送未中标感谢信
    saveNoticeAll(sso_sessionid, params) {
        return axios.post(`/tenderWin/saveNoticeAll?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderName=${params.tenderName}&noticeContent=${params.noticeContent}&tenderCandidateLineCodeWin=${params.tenderCandidateLineCodeWin}`, params);
    },
    getWinByCode(params){
        return axios.post(`/outerRequest/getWinByCode?headCode=${params.headCode}`, params);
    },
    //  修改查询信息
    getTenderByCodeOut(params) {
        return axios.post(`/outerRequest/getTenderByCode?tenderCode=${params.tenderCode}`, params);
    },


    // 查询关联综合报表的招标信息
    // getTenderByCompiledReport(sso_sessionid, params) {
    //     return axios.post(`/tenderCompiledReport/getTenderByCompiledReport?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    // },
    // 提交综合评标报告-
    subCompiledReport(sso_sessionid, params) {
        return axios.post(`/tenderCompiledReport/subCompiledReport?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderCandidateLineCode=${params.tenderCandidateLineCode}`, params);
    },

    // 其他接口…………
    // 流程轴
    getScheduleMax(sso_sessionid, params) {
        return axios.post(`/tenderReport/getScheduleMax?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 招标项进展情况
    tenderScheduleReport(sso_sessionid, params) {
        return axios.post(`/tenderReport/tenderScheduleReport?sso_sessionid=${sso_sessionid}&page=${params.page}&size=${params.size}&tenderName=${params.tenderName}&segment=${params.segment}&tenderType=${params.tenderType}&personName=${params.personName}`, params);
    },

    // 流标系列
    // 保证金缴纳
    tenderLoseByBail(sso_sessionid, params) {
        return axios.post(`/tenderBail/tenderLoseByBail?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 文件发布
    tenderLoseByRelease(sso_sessionid, params) {
        return axios.post(`/tenderFileRelease/tenderLoseByRelease?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 综合评标报告
    tenderLoseByCompiled(sso_sessionid, params) {
        return axios.post(`/tenderCompiledReport/tenderLoseByCompiled?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 候选人
    tenderLoseByCandidate(sso_sessionid, params) {
        return axios.post(`/tenderCandidateHead/tenderLoseByCandidate?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 答疑
    tenderLoseByAnswer(sso_sessionid, params) {
        return axios.post(`/tenderFileAnswer/tenderLoseByAnswer?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 中标审定业务数据
    
    // 中标审定-查看招标文件信息
    getWinByTenderFile(params) {
        return axios.post(`/outerRequest/getWinByTenderFile?headCode=${params.headCode}`, params);
    },
    // 中标审定—候选人信息
    getWinByCandidate(params) {
        return axios.post(`/outerRequest/getWinByCandidate?headCode=${params.headCode}`, params);
    },
    // 保证金信息
    getWinByBail(params) {
        return axios.post(`/outerRequest/getWinByBail?headCode=${params.headCode}`, params);
    },
    // 中标审定—-招标文件答疑
    getWinByAnswer(params) {
        return axios.post(`/outerRequest/getWinByAnswer?headCode=${params.headCode}`, params);
    },
    // 中标审定—回标
    getWinByReturn(params) {
        return axios.post(`/outerRequest/getWinByReturn?headCode=${params.headCode}`, params);
    },
    // 中标信息—开技术标
    getWinByOpenTechnical(params) {
        return axios.post(`/outerRequest/getWinByOpenTechnical?headCode=${params.headCode}`, params);
    },
    // 中标信息—ping技术标
    getWinByEvaluationTechnical(params) {
        return axios.post(`/outerRequest/getWinByEvaluationTechnical?headCode=${params.headCode}`, params);
    },
    // 中标信息—开商务标
    getWinByOpenBusiness(params) {
        return axios.post(`/outerRequest/getWinByOpenBusiness?headCode=${params.headCode}`, params);
    },
    // 中标信息—评商务标
    getWinByEvaluationBusiness(params) {
        return axios.post(`/outerRequest/getWinByEvaluationBusiness?headCode=${params.headCode}`, params);
    },
    // 综合评标报告
    getWinByCompiledReport(params) {
        return axios.post(`/outerRequest/getWinByCompiledReport?headCode=${params.headCode}`, params);
    },


    // 供应商系列
    // 供应商登录
    getSupLogin(params) {
        return axios.post(`/supplierLogin/getSupLogin?supName=${params.name}&supPass=${params.pass}`, params);
    },
    // 获取招标文件信息
    tenderFileList(params) {
        return axios.post(`/supplierLogin/tenderFileList?pageNum=${params.pageNum}&pageSize=${params.pageSize}&tenderFileCode=${params.tenderFileCode}`, params);
    },
    // 中标信息
    tenderWinList(params) {
        return axios.post(`/supplierLogin/tenderWinList?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, params);
    },
    // 获取招标公告详情
    getTenderFileByCode(params) {
        return axios.post(`/supplierLogin/getTenderFileByCode?tenderFileCode=${params.tenderFileCode}`, params);
    },

    // 投标https://devtender.firstcare.com.cn/tenderSubmit/getTenderSubmitList
    getTenderSubmitList(params) {
        return axios.post(`/tenderSubmit/getTenderSubmitList?tenderName=${params.tenderName}&supplierCode=${params.supplierCode}`, params);
    },
    //添加投标信息
    // tenderSubmitSave(sso_sessionid, params) {
    //     return axios.post(`/tenderSubmit/save?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderCandidateLineCode=${params.tenderCandidateLineCode}&tenderQuotation=${params.tenderQuotation}&quoteInputTax=${params.quoteInputTax}&technologyFileCode=${params.technologyFileCode}&businessFileCode=${params.businessFileCode}&tenderDate=${params.tenderDate}&tenderSubmitCode=${params.tenderSubmitCode}`, params);
    // },
    // //根据Code查询投标信息
    // selSubmitByCode(sso_sessionid, params) {
    //     return axios.post(`/tenderSubmit/selSubmitByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}&tenderSubmitCode=${params.tenderSubmitCode}&tenderCandidateLineCode=${params.tenderCandidateLineCode}`, params);
    // },
    // //根据投标code删除信息
    // delByCode(sso_sessionid, params) {
    //     return axios.post(`/submissionTender/delByCode?sso_sessionid=${sso_sessionid}&tenderName=${params.tenderName}`, params);
    // },
    // // 获取招标公告信息
    // getReleaseByCode(sso_sessionid, params){
    //     return axios.post(`/tenderFileRelease/getTenderFileReleaseByCode?sso_sessionid=${sso_sessionid}&tenderFileCode=${params.tenderFileCode}`, params);
    // },
}


export default article;
