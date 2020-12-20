export default {
    formatDate(value, other) {
        if (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? "0" + MM : MM;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            let h = date.getHours();
            h = h < 10 ? "0" + h : h;
            let m = date.getMinutes();
            m = m < 10 ? "0" + m : m;
            let s = date.getSeconds();
            s = s < 10 ? "0" + s : s;
            if(!other){
                return y + "-" + MM + "-" + d;
            } else {
                return y + "-" + MM + "-" + d + " " + h + ":" + m;
            }
            
        } else {
            return ''
        }

    },
    routerProcess(arr, index, vm, type, ifProcess, ifOpen, num, status) {
        if (arr.length != 1) {
            vm.$message.error('请选择项目')
            return false;
        }
        var ifProcessVal = '';
        if (!ifProcess) {
            ifProcessVal = '';
        } else if(ifProcess == 'process'){
            ifProcessVal = '';
        } else {
            ifProcessVal = true;
        }
        if (index == 11) {
            if (arr[0].tenderWinCode) {
                var other = arr[0].tenderWinCode;
            } else {
                var other = '';
            }
        } else {
            var other = '';
        }
        if (arr[0].tenderFileStatus) {
            if (arr[0].tenderFileStatus == 'lost') {
                arr[0].tenderScheduleStatus = 'tenderLost';
            }
        }
        if (type != 'jz') {
            var { href } = vm.$router.resolve({
                path: "process",
                query: {
                    active: index,
                    tenderFileCode: arr[0].tenderFileCode,
                    type: type,
                    other: other,
                    num: num,
                    approveStatus: arr[0].approveStatus,
                    ifProcess: ifProcessVal,
                    status: status,
                    already: arr[0].tenderScheduleStatus,
                    tenderName: arr[0].tenderName,
                    tenderNumber: arr[0].tenderNumber,
                    obj: JSON.stringify(arr)
                }
            });
        } else {
            var { href } = vm.$router.resolve({
                path: "process",
                query: {
                    active: index,
                    tenderFileCode: arr[0].tenderFileCode,
                    type: '2',
                    other: other,
                    num: num,
                    approveStatus: arr[0].approveStatus,
                    ifProcess: ifProcessVal,
                    status: status,
                    already: arr[0].tenderScheduleStatus,
                    tenderName: arr[0].tenderName,
                    tenderNumber: arr[0].tenderNumber,
                    obj: JSON.stringify(arr)
                }
            });
        }

        if (ifProcess) {
            if (type != 'jz') {
                window.location.href = href;
                setTimeout(() => {
                    window.location.reload();
                }, 100)
            } else {
                return href;
            }

        } else {
            if (!ifOpen) {
                return href;
            } else {
                window.location.href = href;
                // setTimeout(() => {
                //     window.location.reload();
                // }, 100)
            }
        }
    },
    zwRouterProcess(arr, index, vm, type, ifProcess, ifOpen, num, status) {
        if (arr.length != 1) {
            vm.$message.error('请选择项目')
            return false;
        }
        if (!ifProcess) {
            ifProcess = '';
        }
        if (index == 11) {
            if (arr[0].tenderWinCode) {
                var other = arr[0].tenderWinCode;
            } else {
                var other = '';
            }
        } else {
            var other = '';
        }
        if (index == 11) {
            index = 1;
            // if (arr[0].approveStatus) {
            //     var approveStatus = 'true';
            // } else {
            //     var approveStatus = '';
            // }
        } else {
            // var approveStatus = '';
        }
        const { href } = vm.$router.resolve({
            path: 'zwWinBidApprove',
            query: {
                active: index,
                tenderFileCode: arr[0].tenderFileCode,
                type: type,
                other: other,
                num: num,
                approveStatus: arr[0].approveStatus,
                ifProcess: ifProcess,
                status: status,
                already: arr[0].tenderScheduleStatus,
                tenderName: arr[0].tenderName,
                tenderNumber: arr[0].tenderNumber,
                obj: JSON.stringify(arr)
            }
        });
        if (ifProcess) {
            if (type != 'jz') {
                window.location.href = href;
                setTimeout(() => {
                    window.location.reload();
                }, 100)
            } else {
                return href;
            }
        } else {
            if (!ifOpen) {
                return href;
                // window.open(href, "_blank")

            } else {
                window.location.href = href;
                window.location.reload()
            }
        }
    },
    beforeUpload(file, vm) {
        const fileSize = file.size / 1024 / 1024 / 1024;
        if (fileSize > 1) {
            vm.$message.error('文件大小最多1G');
            return false;
        } else {
            return true;
        }
    },

    hasQx(value, vm) {
        if(!vm.$store.state.userInfo) return false;
        var userInfo = JSON.parse(vm.$store.state.userInfo);
        var a = 0;
        for (var i = 0; i < userInfo.permissionList.length; i++) {
            if (value == userInfo.permissionList[i]) {
                a++;
            }
        }
        if (a > 0) {
            return true;
        } else {
            return false;
        }
    },
}