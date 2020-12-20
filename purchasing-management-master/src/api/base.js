/**
  * 接口域名的管理
  */
 const base = {
    defaultUrl: 'https://tender.firstcare.com.cn',
    approveUrl: 'https://devapprove.firstcare.com.cn/approve/showApproveFlow.action?approve.approveCode=',
    logoutUrlCas: 'https://devcas.firstcare.com.cn/logout',
    downLoadUrlT: 'https://devtender.firstcare.com.cn/tenderFileRelease/downTenderFileModel',
    downLoadUrlTender: 'https://devtender.firstcare.com.cn/tenderFile/downTenderFileModel',
    uploadUrl: 'https://devtender.firstcare.com.cn/fileInfo/uploadFileReturnInfo',
    uploadUrlBail: 'https://devtender.firstcare.com.cn/fileInfo/uploadFileAllReturnInfo',
    downLoadUrl: 'https://devtender.firstcare.com.cn/tenderCompiledReport/downloadCompiledReport',

    // 开发环境
    // tologinUrl: 'https://devsso.firstcare.com.cn/login?redirect_url=https://devtender.firstcare.com.cn/td/',
    // logoutUrl: 'https://devcas.firstcare.com.cn/firstcare/casLogout.jsp?service=https://devtender.firstcare.com.cn/td/',
    
    
    // 本地环境
    tologinUrl: 'https://sso.firstcare.com.cn/login?redirect_url=http://10.200.19.71:8080/td/',
    logoutUrl: 'https://devcas.firstcare.com.cn/firstcare/casLogout.jsp?service=http://10.200.19.71:8080/',

    // 生产环境
    // tologinUrl: 'https://sso.firstcare.com.cn/login?redirect_url=https://tender.firstcare.com.cn/td/',
    // logoutUrlCas: 'https://cas.firstcare.com.cn/logout',
    // // logoutUrl: 'https://cas.firstcare.com.cn/firstcare/casLogout.jsp?service=https://tender.firstcare.com.cn/td/',
    // logoutUrl: 'https://sso.firstcare.com.cn/logout?redirect_url=https://tender.firstcare.com.cn/td/',
    // defaultUrl: 'https://tender.firstcare.com.cn',
    // approveUrl: 'https://approve.firstcare.com.cn/approve/showApproveFlow.action?approve.approveCode=',
    // downLoadUrlTender: 'https://tender.firstcare.com.cn/tenderFile/downTenderFileModel',
    // downLoadUrlT: 'https://tender.firstcare.com.cn/tenderFileRelease/downTenderFileModel',
    // uploadUrlBail: 'https://tender.firstcare.com.cn/fileInfo/uploadFileAllReturnInfo',
    // uploadUrl: 'https://tender.firstcare.com.cn/fileInfo/uploadFileReturnInfo',
    // downLoadUrl: 'https://tender.firstcare.com.cn/tenderCompiledReport/downloadCompiledReport',

    // 测试环境
    // tologinUrl: 'https://testsso.firstcare.com.cn/login?redirect_url=https://testtender.firstcare.com.cn',
    // logoutUrl: 'https://testsso.firstcare.com.cn/logout?redirect_url=https://testtender.firstcare.com.cn',
}

export default base;
